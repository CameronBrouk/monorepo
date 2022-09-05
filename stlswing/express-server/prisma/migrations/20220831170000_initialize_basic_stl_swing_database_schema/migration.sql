/*
  Warnings:

  - The primary key for the `Permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `draft` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firebaseId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Group" ADD VALUE 'CoreTeacher';
ALTER TYPE "Group" ADD VALUE 'Volunteer';

-- AlterTable
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdBy",
DROP COLUMN "draft",
DROP COLUMN "updatedBy",
ADD COLUMN     "firebaseId" INTEGER NOT NULL,
ADD COLUMN     "stripeCustomerId" INTEGER;

-- DropTable
DROP TABLE "History";

-- DropEnum
DROP TYPE "Operation";

-- DropEnum
DROP TYPE "TableNames";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "stripeProductId" INTEGER NOT NULL,
    "stripePriceIds" INTEGER[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "stripeCustomerId" INTEGER,
    "stripePriceId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "discounts" TEXT[],
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Ticket" (
    "orderId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL DEFAULT 'STL Swing Ticket',
    "purchaserName" TEXT NOT NULL DEFAULT 'STL Swing Customer',
    "purchaserEmail" TEXT NOT NULL,
    "creditsRemaining" INTEGER NOT NULL DEFAULT 1,
    "validUntil" TIMESTAMPTZ NOT NULL,
    "shared" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "PrivateLesson" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "googleCalendarId" TEXT,
    "googleEventId" TEXT,
    "facebookEventId" TEXT,
    "meetupEventId" TEXT,
    "start" TIMESTAMPTZ NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "recurrence" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "SocialDance" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "googleCalendarId" TEXT,
    "googleEventId" TEXT,
    "facebookEventId" TEXT,
    "meetupEventId" TEXT,
    "start" TIMESTAMPTZ NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "recurrence" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "GroupClass" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "googleCalendarId" TEXT,
    "googleEventId" TEXT,
    "facebookEventId" TEXT,
    "meetupEventId" TEXT,
    "start" TIMESTAMPTZ NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "recurrence" TEXT,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficultyLevel" TEXT NOT NULL,
    "danceType" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "speciality" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DanceMove" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "name" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficultyLevel" TEXT NOT NULL,
    "danceForm" TEXT NOT NULL,
    "groupClassId" INTEGER,

    CONSTRAINT "DanceMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinTeachersAndGroupClasses" (
    "teacherId" INTEGER NOT NULL,
    "groupClassId" INTEGER NOT NULL,

    CONSTRAINT "JoinTeachersAndGroupClasses_pkey" PRIMARY KEY ("teacherId","groupClassId")
);

-- CreateTable
CREATE TABLE "JoinTeachersAndPrivateLessons" (
    "teacherId" INTEGER NOT NULL,
    "privateLessonId" INTEGER NOT NULL,

    CONSTRAINT "JoinTeachersAndPrivateLessons_pkey" PRIMARY KEY ("teacherId","privateLessonId")
);

-- CreateTable
CREATE TABLE "JoinUsersAndGroupClasses" (
    "userId" INTEGER NOT NULL,
    "groupClassId" INTEGER NOT NULL,

    CONSTRAINT "JoinUsersAndGroupClasses_pkey" PRIMARY KEY ("userId","groupClassId")
);

-- CreateTable
CREATE TABLE "JoinUsersAndPrivateLessons" (
    "userId" INTEGER NOT NULL,
    "privateLessonId" INTEGER NOT NULL,

    CONSTRAINT "JoinUsersAndPrivateLessons_pkey" PRIMARY KEY ("userId","privateLessonId")
);

-- CreateTable
CREATE TABLE "JoinUsersAndSocialDances" (
    "userId" INTEGER NOT NULL,
    "socialDanceId" INTEGER NOT NULL,

    CONSTRAINT "JoinUsersAndSocialDances_pkey" PRIMARY KEY ("userId","socialDanceId")
);

-- CreateTable
CREATE TABLE "JoinGroupClassAndDanceMoves" (
    "type" TEXT NOT NULL,
    "groupClassId" INTEGER NOT NULL,
    "danceMoveId" INTEGER NOT NULL,

    CONSTRAINT "JoinGroupClassAndDanceMoves_pkey" PRIMARY KEY ("groupClassId","danceMoveId")
);

-- CreateTable
CREATE TABLE "JoinUsersAndDanceMoves" (
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "danceMoveId" INTEGER NOT NULL,

    CONSTRAINT "JoinUsersAndDanceMoves_pkey" PRIMARY KEY ("danceMoveId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_userId_productId_key" ON "Order"("id", "userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_orderId_key" ON "Ticket"("orderId");

-- CreateIndex
CREATE INDEX "Ticket_orderId_idx" ON "Ticket" USING HASH ("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateLesson_id_key" ON "PrivateLesson"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SocialDance_id_key" ON "SocialDance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupClass_id_key" ON "GroupClass"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DanceMove_id_key" ON "DanceMove"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_fkey" FOREIGN KEY ("id") REFERENCES "Ticket"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateLesson" ADD CONSTRAINT "PrivateLesson_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateLesson" ADD CONSTRAINT "PrivateLesson_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateLesson" ADD CONSTRAINT "PrivateLesson_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialDance" ADD CONSTRAINT "SocialDance_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialDance" ADD CONSTRAINT "SocialDance_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialDance" ADD CONSTRAINT "SocialDance_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupClass" ADD CONSTRAINT "GroupClass_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupClass" ADD CONSTRAINT "GroupClass_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupClass" ADD CONSTRAINT "GroupClass_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceMove" ADD CONSTRAINT "DanceMove_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DanceMove" ADD CONSTRAINT "DanceMove_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTeachersAndGroupClasses" ADD CONSTRAINT "JoinTeachersAndGroupClasses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTeachersAndGroupClasses" ADD CONSTRAINT "JoinTeachersAndGroupClasses_groupClassId_fkey" FOREIGN KEY ("groupClassId") REFERENCES "GroupClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTeachersAndPrivateLessons" ADD CONSTRAINT "JoinTeachersAndPrivateLessons_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTeachersAndPrivateLessons" ADD CONSTRAINT "JoinTeachersAndPrivateLessons_privateLessonId_fkey" FOREIGN KEY ("privateLessonId") REFERENCES "PrivateLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndGroupClasses" ADD CONSTRAINT "JoinUsersAndGroupClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndGroupClasses" ADD CONSTRAINT "JoinUsersAndGroupClasses_groupClassId_fkey" FOREIGN KEY ("groupClassId") REFERENCES "GroupClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndPrivateLessons" ADD CONSTRAINT "JoinUsersAndPrivateLessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndPrivateLessons" ADD CONSTRAINT "JoinUsersAndPrivateLessons_privateLessonId_fkey" FOREIGN KEY ("privateLessonId") REFERENCES "PrivateLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndSocialDances" ADD CONSTRAINT "JoinUsersAndSocialDances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndSocialDances" ADD CONSTRAINT "JoinUsersAndSocialDances_socialDanceId_fkey" FOREIGN KEY ("socialDanceId") REFERENCES "SocialDance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinGroupClassAndDanceMoves" ADD CONSTRAINT "JoinGroupClassAndDanceMoves_danceMoveId_fkey" FOREIGN KEY ("danceMoveId") REFERENCES "DanceMove"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinGroupClassAndDanceMoves" ADD CONSTRAINT "JoinGroupClassAndDanceMoves_groupClassId_fkey" FOREIGN KEY ("groupClassId") REFERENCES "GroupClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndDanceMoves" ADD CONSTRAINT "JoinUsersAndDanceMoves_danceMoveId_fkey" FOREIGN KEY ("danceMoveId") REFERENCES "DanceMove"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUsersAndDanceMoves" ADD CONSTRAINT "JoinUsersAndDanceMoves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
