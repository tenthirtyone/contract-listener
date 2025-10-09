/*
  Warnings:

  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LazymintVoucher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NftOwners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SparseNft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_address_chain_fkey";

-- DropForeignKey
ALTER TABLE "NftOwners" DROP CONSTRAINT "NftOwners_chain_token_address_identifier_fkey";

-- DropForeignKey
ALTER TABLE "NftOwners" DROP CONSTRAINT "NftOwners_user_address_fkey";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "LazymintVoucher";

-- DropTable
DROP TABLE "Nft";

-- DropTable
DROP TABLE "NftOwners";

-- DropTable
DROP TABLE "SparseNft";

-- DropEnum
DROP TYPE "CollectionState";

-- CreateTable
CREATE TABLE "Contract" (
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "chain" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("address","chain")
);
