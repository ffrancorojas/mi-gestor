import { prisma } from '../db/prisma.js'
import { getNextMonthlyOccurrence, getTodayUtc } from '../tools/index.js'

export async function materializeDueRecurringMovements(userId: string, through = getTodayUtc()) {
  const recurringMovements = await prisma.recurringMovement.findMany({
    where: {
      userId,
      active: true,
      nextOccurrenceAt: { lte: through },
    },
  })

  for (const recurringMovement of recurringMovements) {
    await prisma.$transaction(async (transaction) => {
      let occurrenceDate = recurringMovement.nextOccurrenceAt

      while (occurrenceDate <= through) {
        await transaction.movement.upsert({
          where: {
            recurringMovementId_occurredAt: {
              recurringMovementId: recurringMovement.id,
              occurredAt: occurrenceDate,
            },
          },
          create: {
            userId: recurringMovement.userId,
            accountId: recurringMovement.accountId,
            categoryId: recurringMovement.categoryId,
            recurringMovementId: recurringMovement.id,
            description: recurringMovement.description,
            amountCents: recurringMovement.amountCents,
            kind: recurringMovement.kind,
            occurredAt: occurrenceDate,
          },
          update: {},
        })

        occurrenceDate = getNextMonthlyOccurrence(occurrenceDate)
      }

      await transaction.recurringMovement.update({
        where: { id: recurringMovement.id },
        data: { nextOccurrenceAt: occurrenceDate },
      })
    })
  }
}
