-- CreateEnum
CREATE TYPE "TableNames" AS ENUM ('History', 'Todo', 'TodoList', 'User', 'Permission');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Employee', 'Customer', 'Visitor');

-- CreateEnum
CREATE TYPE "Group" AS ENUM ('Developer', 'Member');

-- CreateEnum
CREATE TYPE "Operation" AS ENUM ('createOne', 'updateOne', 'duplicateOne', 'multiplyOne', 'createMany', 'updateMany');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "personId" TEXT;

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "friendId" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "phone" INTEGER,
    "photoUrl" TEXT NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "groups" "Group"[],

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "tableName" "TableNames" NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operation" "Operation" NOT NULL,
    "newState" JSONB NOT NULL,
    "previousState" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_userId_key" ON "Permission"("userId");

-- CreateIndex
CREATE INDEX "Permission_role_idx" ON "Permission"("role");

-- CreateIndex
CREATE INDEX "Permission_userId_idx" ON "Permission" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "History_id_idx" ON "History" USING HASH ("id");

-- CreateIndex
CREATE INDEX "History_createdAt_idx" ON "History"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
