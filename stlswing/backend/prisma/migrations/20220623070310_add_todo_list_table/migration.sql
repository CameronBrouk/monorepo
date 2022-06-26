-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todoListId" TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "updatedBy" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL,
    "deadline" TIMETZ,
    "title" TEXT NOT NULL,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
