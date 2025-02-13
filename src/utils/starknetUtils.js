import { RpcProvider, Contract } from 'starknet';

export async function getStarknetAddress(address) {
  const starknetProvider = new RpcProvider({
    nodeUrl: 'https://starknet-sepolia.public.blastapi.io',
  });

  const contractAddress =
    '0x036a4f60ea2e8b318d96f5d3935583df1d520324a4901192e470da01d700cf87';

  const { abi: testAbi } = await starknetProvider.getClassAt(contractAddress);
  if (testAbi === undefined) {
    throw new Error('no abi.');
  }
  const rosettaContract = new Contract(
    testAbi,
    contractAddress,
    starknetProvider
  );

  // Interaction with the contract with call
  const addr = await rosettaContract.get_starknet_address_with_fallback(
    address
  );

  return addr;
}
