-- CreateEnum
CREATE TYPE "CollectionState" AS ENUM ('PENDING', 'FAILED', 'MINED');

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "social" JSONB,
    "bio" TEXT,
    "profile_image" TEXT,
    "banner_image" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Nonce" (
    "nonce" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nonce_pkey" PRIMARY KEY ("nonce")
);

-- CreateTable
CREATE TABLE "Collection" (
    "address" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "image" TEXT,
    "banner" TEXT,
    "type" TEXT,
    "chain" INTEGER NOT NULL,
    "network" TEXT,
    "royalty_base_points" INTEGER,
    "royalty_denominator" INTEGER NOT NULL DEFAULT 10000,
    "royalty_address" TEXT,
    "total_supply" INTEGER NOT NULL DEFAULT 0,
    "transaction_hash" TEXT,
    "transaction_state" "CollectionState" NOT NULL DEFAULT 'PENDING',
    "creator" TEXT,
    "owner" TEXT,
    "is_dcentral" BOOLEAN NOT NULL DEFAULT true,
    "is_official" BOOLEAN NOT NULL DEFAULT false,
    "lazymint" BOOLEAN DEFAULT false,
    "nsfw" BOOLEAN DEFAULT false,
    "social_links" JSONB,
    "license" JSONB,
    "nonce" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("address","chain")
);

-- CreateTable
CREATE TABLE "Nft" (
    "chain" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "transaction_hash" TEXT,
    "description" TEXT,
    "media" JSONB,
    "attributes" JSONB,
    "creator" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("chain","address","identifier")
);

-- CreateTable
CREATE TABLE "NftOwners" (
    "chain" INTEGER NOT NULL,
    "token_address" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "NftOwners_pkey" PRIMARY KEY ("chain","token_address","identifier","user_address")
);

-- CreateTable
CREATE TABLE "SparseNft" (
    "id" SERIAL NOT NULL,
    "chain" INTEGER,
    "address" TEXT,
    "identifier" TEXT,
    "name" TEXT,
    "image" TEXT,
    "transaction_hash" TEXT,
    "supply" INTEGER,
    "description" TEXT,
    "media" JSONB,
    "attributes" JSONB,
    "creator" TEXT,

    CONSTRAINT "SparseNft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LazymintVoucher" (
    "id" SERIAL NOT NULL,
    "chain" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "voucher_data" JSONB NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LazymintVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_address_chain_fkey" FOREIGN KEY ("address", "chain") REFERENCES "Collection"("address", "chain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftOwners" ADD CONSTRAINT "NftOwners_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftOwners" ADD CONSTRAINT "NftOwners_chain_token_address_identifier_fkey" FOREIGN KEY ("chain", "token_address", "identifier") REFERENCES "Nft"("chain", "address", "identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
