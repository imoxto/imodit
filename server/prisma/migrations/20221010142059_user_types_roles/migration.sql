/*
  Warnings:

  - A unique constraint covering the columns `[id,type]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('local', 'twitter', 'google', 'facebook');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user',
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'local';

-- CreateIndex
CREATE UNIQUE INDEX "User_id_type_key" ON "User"("id", "type");
