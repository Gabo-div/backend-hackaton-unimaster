-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "value" INTEGER NOT NULL,
    "points" INTEGER,
    "date" DATETIME,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "subjectId" INTEGER,
    CONSTRAINT "Assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("date", "description", "done", "id", "name", "points", "subjectId", "type", "value") SELECT "date", "description", "done", "id", "name", "points", "subjectId", "type", "value" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
