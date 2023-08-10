-- CreateTable
CREATE TABLE "Contract" (
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "abi" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("address")
);
