import type { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { authenticate } from '../auth/authenticate.js'
import { ensureUser } from '../auth/user.js'
import { prisma } from '../db/prisma.js'
import { materializeDueRecurringMovements } from '../services/index.js'
import {
  addDaysUtc,
  createDateInMonth,
  getNextMonthlyOccurrence,
  getStartOfMonthUtc,
  getTodayUtc,
  parseDateOnly,
  parseMonthKey,
  toMonthKey,
} from '../tools/index.js'

const accountTypes = ['BANK', 'CASH', 'CARD', 'SAVINGS'] as const
const movementKinds = ['INCOME', 'EXPENSE'] as const

const movementInputSchema = z.object({
  accountId: z.string().cuid().optional(),
  categoryId: z.string().cuid().optional(),
  description: z.string().trim().min(1).max(160),
  amountCents: z.number().int().positive(),
  kind: z.enum(movementKinds),
  occurredAt: z.string().min(1),
  notes: z.string().trim().max(500).optional(),
  isRecurring: z.boolean().default(false),
})

const recurringMovementInputSchema = z
  .object({
    accountId: z.string().cuid().optional(),
    categoryId: z.string().cuid(),
    description: z.string().trim().min(1).max(160),
    amountCents: z.number().int().positive(),
    startAt: z.string().min(1),
    notes: z.string().trim().max(500).optional(),
    includeCurrentMonth: z.boolean().default(false),
    currentMonthDay: z.number().int().min(1).max(31).optional(),
  })
  .superRefine((body, context) => {
    if (body.includeCurrentMonth && body.currentMonthDay === undefined) {
      context.addIssue({
        code: 'custom',
        path: ['currentMonthDay'],
        message: 'Indica el día del pago del mes corriente.',
      })
    }
  })

const getAuthenticatedUser = async (request: FastifyRequest) => {
  if (!request.authUser) throw new Error('No hay un usuario autenticado.')
  return ensureUser(request.authUser)
}

const validateAccount = async (accountId: string | undefined, userId: string) => {
  if (!accountId) return true
  return Boolean(await prisma.account.findFirst({ where: { id: accountId, userId } }))
}

const validateCategory = async (categoryId: string | undefined, userId: string) => {
  if (!categoryId) return true
  return Boolean(
    await prisma.category.findFirst({
      where: { id: categoryId, userId, archived: false },
    }),
  )
}

export async function apiRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)

  app.get('/me', async (request) => getAuthenticatedUser(request))

  app.get('/accounts', async (request) => {
    const user = await getAuthenticatedUser(request)

    return prisma.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'asc' },
    })
  })

  app.post('/accounts', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const body = z
      .object({
        name: z.string().trim().min(1).max(80),
        type: z.enum(accountTypes).default('BANK'),
        currency: z.string().length(3).default('EUR'),
        initialBalanceCents: z.number().int().default(0),
      })
      .parse(request.body)

    const account = await prisma.account.create({ data: { ...body, userId: user.id } })
    return reply.code(201).send(account)
  })

  app.get('/categories', async (request) => {
    const user = await getAuthenticatedUser(request)

    return prisma.category.findMany({
      where: { userId: user.id, archived: false },
      orderBy: { name: 'asc' },
    })
  })

  app.post('/categories', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const body = z
      .object({
        name: z.string().trim().min(1).max(50),
        color: z.string().max(20).optional(),
        icon: z.string().max(40).optional(),
      })
      .parse(request.body)

    const existingCategory = await prisma.category.findFirst({
      where: {
        userId: user.id,
        name: { equals: body.name, mode: 'insensitive' },
      },
    })

    if (existingCategory && !existingCategory.archived) {
      return reply.code(409).send({ message: 'La categoría ya existe.' })
    }

    const category = existingCategory
      ? await prisma.category.update({
          where: { id: existingCategory.id },
          data: { ...body, archived: false },
        })
      : await prisma.category.create({ data: { ...body, userId: user.id } })

    return reply.code(201).send(category)
  })

  app.patch('/categories/:id', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { id } = request.params as { id: string }
    const body = z.object({ name: z.string().trim().min(1).max(50) }).parse(request.body)
    const category = await prisma.category.findFirst({
      where: { id, userId: user.id, archived: false },
    })

    if (!category) return reply.code(404).send({ message: 'Categoría no encontrada.' })

    const duplicatedCategory = await prisma.category.findFirst({
      where: {
        id: { not: id },
        userId: user.id,
        name: { equals: body.name, mode: 'insensitive' },
      },
    })

    if (duplicatedCategory) {
      return reply.code(409).send({ message: 'Ya existe una categoría con ese nombre.' })
    }

    return prisma.category.update({ where: { id }, data: { name: body.name } })
  })

  app.delete('/categories/:id', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { id } = request.params as { id: string }
    const category = await prisma.category.findFirst({ where: { id, userId: user.id } })

    if (!category) return reply.code(404).send({ message: 'Categoría no encontrada.' })

    await prisma.category.update({ where: { id }, data: { archived: true } })
    return reply.code(204).send()
  })

  app.get('/movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const query = request.query as { from?: string; to?: string; accountId?: string }
    const from = parseDateOnly(query.from)
    const to = parseDateOnly(query.to)

    if (from === null || to === null || (from && to && from > to)) {
      return reply.code(400).send({ message: 'Las fechas del filtro no son válidas.' })
    }

    await materializeDueRecurringMovements(user.id)

    return prisma.movement.findMany({
      where: {
        userId: user.id,
        accountId: query.accountId,
        occurredAt: {
          gte: from ?? undefined,
          lt: to ? addDaysUtc(to, 1) : undefined,
        },
      },
      include: { account: true, category: true },
      orderBy: { occurredAt: 'desc' },
    })
  })

  app.delete('/movements/:id', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { id } = request.params as { id: string }
    const movement = await prisma.movement.findFirst({ where: { id, userId: user.id } })

    if (!movement) return reply.code(404).send({ message: 'Movimiento no encontrado.' })

    await prisma.movement.delete({ where: { id: movement.id } })
    return reply.code(204).send()
  })

  app.post('/movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const body = movementInputSchema.parse(request.body)
    const occurredAt = parseDateOnly(body.occurredAt)

    if (!occurredAt) return reply.code(400).send({ message: 'La fecha no es válida.' })
    if (!(await validateAccount(body.accountId, user.id))) {
      return reply.code(400).send({ message: 'La cuenta no pertenece al usuario.' })
    }
    if (!(await validateCategory(body.categoryId, user.id))) {
      return reply.code(400).send({ message: 'La categoría no pertenece al usuario.' })
    }

    const { isRecurring, occurredAt: _occurredAt, ...movementData } = body
    const result = await prisma.$transaction(async (transaction) => {
      const recurringMovement = isRecurring
        ? await transaction.recurringMovement.create({
            data: {
              userId: user.id,
              accountId: movementData.accountId,
              categoryId: movementData.categoryId,
              description: movementData.description,
              amountCents: movementData.amountCents,
              kind: movementData.kind,
              frequency: 'MONTHLY',
              nextOccurrenceAt: getNextMonthlyOccurrence(occurredAt),
            },
            include: { account: true, category: true },
          })
        : null

      const movement = await transaction.movement.create({
        data: {
          ...movementData,
          userId: user.id,
          occurredAt,
          recurringMovementId: recurringMovement?.id,
        },
        include: { account: true, category: true },
      })

      return { movement, recurringMovement }
    })

    return reply.code(201).send(result)
  })

  app.get('/recurring-movements', async (request) => {
    const user = await getAuthenticatedUser(request)
    const query = request.query as { active?: string }
    const active = query.active === undefined ? true : query.active !== 'false'

    await materializeDueRecurringMovements(user.id)

    return prisma.recurringMovement.findMany({
      where: { userId: user.id, active },
      include: { account: true, category: true },
      orderBy: { nextOccurrenceAt: 'asc' },
    })
  })

  app.post('/recurring-movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const body = recurringMovementInputSchema.parse(request.body)
    const startAt = parseDateOnly(body.startAt)
    const today = getTodayUtc()
    const firstDayOfNextMonth = getStartOfMonthUtc(getNextMonthlyOccurrence(today))

    if (!startAt || startAt < firstDayOfNextMonth) {
      return reply.code(400).send({
        message: 'La fecha habitual debe pertenecer al mes siguiente o a uno posterior.',
      })
    }
    if (!(await validateAccount(body.accountId, user.id))) {
      return reply.code(400).send({ message: 'La cuenta no pertenece al usuario.' })
    }
    if (!(await validateCategory(body.categoryId, user.id))) {
      return reply.code(400).send({ message: 'La categoría no pertenece al usuario.' })
    }

    const result = await prisma.$transaction(async (transaction) => {
      const recurringMovement = await transaction.recurringMovement.create({
        data: {
          userId: user.id,
          accountId: body.accountId,
          categoryId: body.categoryId,
          description: body.description,
          amountCents: body.amountCents,
          kind: 'EXPENSE',
          frequency: 'MONTHLY',
          nextOccurrenceAt: startAt,
        },
        include: { account: true, category: true },
      })

      const currentMovement = body.includeCurrentMonth
        ? await transaction.movement.create({
            data: {
              userId: user.id,
              accountId: body.accountId,
              categoryId: body.categoryId,
              recurringMovementId: recurringMovement.id,
              description: body.description,
              amountCents: body.amountCents,
              kind: 'EXPENSE',
              occurredAt: createDateInMonth(today, body.currentMonthDay!),
              notes: body.notes,
            },
            include: { account: true, category: true },
          })
        : null

      return { recurringMovement, currentMovement }
    })

    return reply.code(201).send(result)
  })

  app.patch('/recurring-movements/:id', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { id } = request.params as { id: string }
    const body = z.object({ active: z.boolean() }).parse(request.body)
    const recurringMovement = await prisma.recurringMovement.findFirst({
      where: { id, userId: user.id },
    })

    if (!recurringMovement) {
      return reply.code(404).send({ message: 'Movimiento recurrente no encontrado.' })
    }

    return prisma.recurringMovement.update({
      where: { id: recurringMovement.id },
      data: { active: body.active },
      include: { account: true, category: true },
    })
  })

  app.get('/salaries', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { month: monthValue } = request.query as { month?: string }
    const month = parseMonthKey(monthValue)

    if (!month) return reply.code(400).send({ message: 'El mes no es válido.' })

    return prisma.monthlySalary.findUnique({
      where: { userId_month: { userId: user.id, month } },
    })
  })

  app.put('/salaries/:month', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { month: monthValue } = request.params as { month: string }
    const month = parseMonthKey(monthValue)
    const body = z.object({ amountCents: z.number().int().positive() }).parse(request.body)

    if (!month) return reply.code(400).send({ message: 'El mes no es válido.' })

    return prisma.monthlySalary.upsert({
      where: { userId_month: { userId: user.id, month } },
      create: { userId: user.id, month, amountCents: body.amountCents },
      update: { amountCents: body.amountCents },
    })
  })

  app.get('/dashboard', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const query = request.query as { month?: string }
    const month = query.month ? parseMonthKey(query.month) : getStartOfMonthUtc(getTodayUtc())

    if (!month) return reply.code(400).send({ message: 'El mes no es válido.' })

    await materializeDueRecurringMovements(user.id)
    const nextMonth = getStartOfMonthUtc(getNextMonthlyOccurrence(month))
    const [salary, movements] = await Promise.all([
      prisma.monthlySalary.findUnique({
        where: { userId_month: { userId: user.id, month } },
      }),
      prisma.movement.findMany({
        where: { userId: user.id, occurredAt: { gte: month, lt: nextMonth } },
        include: { account: true, category: true },
        orderBy: { occurredAt: 'desc' },
      }),
    ])

    return { month: toMonthKey(month), salary, movements }
  })

  app.get('/reports/movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const query = request.query as { from?: string; to?: string }
    const from = parseDateOnly(query.from)
    const to = parseDateOnly(query.to)

    if (!from || !to || from > to) {
      return reply.code(400).send({ message: 'El rango de fechas no es válido.' })
    }

    await materializeDueRecurringMovements(user.id)
    const firstReportMonth = getStartOfMonthUtc(from)
    const lastReportMonth = getStartOfMonthUtc(to)
    const [movements, salaries] = await Promise.all([
      prisma.movement.findMany({
        where: { userId: user.id, occurredAt: { gte: from, lt: addDaysUtc(to, 1) } },
        include: { account: true, category: true },
        orderBy: { occurredAt: 'asc' },
      }),
      prisma.monthlySalary.findMany({
        where: { userId: user.id, month: { gte: firstReportMonth, lte: lastReportMonth } },
        orderBy: { month: 'asc' },
      }),
    ])

    const rows = [
      ...movements.map((movement) => ({
        id: movement.id,
        source: 'MOVEMENT' as const,
        date: movement.occurredAt,
        kind: movement.kind,
        description: movement.description,
        category: movement.category?.name ?? 'Sin categoría',
        account: movement.account?.name ?? null,
        amountCents: movement.amountCents,
        notes: movement.notes,
        recurring: movement.recurringMovementId !== null,
      })),
      ...salaries.map((salary) => ({
        id: salary.id,
        source: 'SALARY' as const,
        date: salary.month,
        kind: 'INCOME' as const,
        description: 'Nómina',
        category: 'Nómina',
        account: null,
        amountCents: salary.amountCents,
        notes: null,
        recurring: false,
      })),
    ].sort((left, right) => left.date.getTime() - right.date.getTime())

    return rows
  })
}
