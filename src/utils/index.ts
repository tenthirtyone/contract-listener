import { ethers } from 'ethers';

export async function getTransactionData(transactionHash: string) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);

  try {
    const [transaction, receipt]: [transaction: any, receipt: any] = await Promise.all([
      provider.getTransaction(transactionHash),
      provider.getTransactionReceipt(transactionHash),
    ]);

    transaction.value = transaction.value.toNumber();
    transaction.gasLimit = transaction.gasLimit.toNumber();
    transaction.gasPrice = transaction.gasPrice.toNumber();

    receipt.gasUsed = receipt.gasUsed.toNumber();
    receipt.cumulativeGasUsed = receipt.cumulativeGasUsed.toNumber();

    return { transaction, receipt };
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null;
  }
}
