-- AlterTable
ALTER TABLE "user" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "image_project" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "prompt" TEXT NOT NULL,
    "negativePrompt" TEXT,
    "imageUrl" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "numInferenceSteps" INTEGER NOT NULL,
    "guidanceScale" DOUBLE PRECISION NOT NULL,
    "seed" BIGINT NOT NULL,
    "modelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image_project" ADD CONSTRAINT "image_project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
