-- AlterTable
ALTER TABLE "Movement" ADD COLUMN "recurringMovementId" TEXT;

-- CreateTable
CREATE TABLE "MonthlySalary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlySalary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Movement_recurringMovementId_idx" ON "Movement"("recurringMovementId");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_recurringMovementId_occurredAt_key" ON "Movement"("recurringMovementId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlySalary_userId_month_key" ON "MonthlySalary"("userId", "month");

-- CreateIndex
CREATE INDEX "MonthlySalary_userId_month_idx" ON "MonthlySalary"("userId", "month");

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_recurringMovementId_fkey" FOREIGN KEY ("recurringMovementId") REFERENCES "RecurringMovement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlySalary" ADD CONSTRAINT "MonthlySalary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
