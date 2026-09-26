import type { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { authenticate } from '../auth/authenticate.js'
import { ensureUser } from '../auth/user.js'
import { prisma } from '../db/prisma.js'

const accountTypes = ['BANK', 'CASH', 'CARD', 'SAVINGS'] as const
const movementKinds = ['INCOME', 'EXPENSE'] as const

const getAuthenticatedUser = async (request: FastifyRequest) => {
  if (!request.authUser) throw new Error('No hay un usuario autenticado.')
  return ensureUser(request.authUser)
}

const parseDate = (value: string | undefined) => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const getNextMonthlyOccurrence = (date: Date) => {
  const next = new Date(date)
  const originalDay = next.getDate()

  next.setDate(1)
  next.setMonth(next.getMonth() + 1)
  const lastDayOfMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
  next.setDate(Math.min(originalDay, lastDayOfMonth))

  return next
}

export async function apiRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)

  app.get('/me', async (request) => {
    return getAuthenticatedUser(request)
  })

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

    const account = await prisma.account.create({
      data: { ...body, userId: user.id },
    })
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

    const category = await prisma.category.create({
      data: { ...body, userId: user.id },
    })

    return reply.code(201).send(category)
  })

  app.delete('/categories/:id', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const { id } = request.params as { id: string }
    const category = await prisma.category.findFirst({
      where: { id, userId: user.id },
    })

    if (!category) return reply.code(404).send({ message: 'Categoría no encontrada.' })

    await prisma.category.update({ where: { id }, data: { archived: true } })
    return reply.code(204).send()
  })

  app.get('/movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const query = request.query as {
      from?: string
      to?: string
      accountId?: string
    }
    const from = parseDate(query.from)
    const to = parseDate(query.to)

    if (from === null || to === null) {
      return reply.code(400).send({ message: 'Las fechas del filtro no son válidas.' })
    }

    return prisma.movement.findMany({
      where: {
        userId: user.id,
        accountId: query.accountId,
        occurredAt: { gte: from, lte: to },
      },
      include: { account: true, category: true },
      orderBy: { occurredAt: 'desc' },
    })
  })

  app.post('/movements', async (request, reply) => {
    const user = await getAuthenticatedUser(request)
    const body = z
      .object({
        accountId: z.string().cuid().optional(),
        categoryId: z.string().cuid().optional(),
        description: z.string().trim().min(1).max(160),
        amountCents: z.number().int().positive(),
        kind: z.enum(movementKinds),
        occurredAt: z.coerce.date(),
        notes: z.string().max(500).optional(),
        isRecurring: z.boolean().default(false),
      })
      .parse(request.body)

    if (body.accountId) {
      const account = await prisma.account.findFirst({
        where: { id: body.accountId, userId: user.id },
      })
      if (!account) return reply.code(400).send({ message: 'La cuenta no pertenece al usuario.' })
    }

    if (body.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: body.categoryId, userId: user.id, archived: false },
      })
      if (!category)
        return reply.code(400).send({ message: 'La categoría no pertenece al usuario.' })
    }

    const { isRecurring, ...movementData } = body
    const result = await prisma.$transaction(async (transaction) => {
      const movement = await transaction.movement.create({
        data: { ...movementData, userId: user.id },
        include: { account: true, category: true },
      })

      if (!isRecurring) return { movement, recurringMovement: null }

      const recurringMovement = await transaction.recurringMovement.create({
        data: {
          userId: user.id,
          accountId: movementData.accountId,
          categoryId: movementData.categoryId,
          description: movementData.description,
          amountCents: movementData.amountCents,
          kind: 'EXPENSE',
          frequency: 'MONTHLY',
          nextOccurrenceAt: getNextMonthlyOccurrence(movementData.occurredAt),
        },
        include: { account: true, category: true },
      })

      return { movement, recurringMovement }
    })

    return reply.code(201).send(result)
  })
}
