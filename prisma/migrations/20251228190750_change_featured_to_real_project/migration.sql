/*
  Warnings:

  - You are about to drop the column `featured` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDesc" TEXT,
    "category" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "images" TEXT,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "isRealProject" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("category", "createdAt", "description", "githubUrl", "id", "image", "images", "liveUrl", "longDesc", "order", "technologies", "title") SELECT "category", "createdAt", "description", "githubUrl", "id", "image", "images", "liveUrl", "longDesc", "order", "technologies", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
