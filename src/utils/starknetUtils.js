import { RpcProvider, Contract } from 'starknet';

export async function getStarknetAddress(address) {
  const starknetProvider = new RpcProvider({
    nodeUrl: 'https://starknet-sepolia.public.blastapi.io',
  });

  const contractAddress =
    '0x0061fb9267e9a1cec091df1bcf1d4c7a179071e4da64cbc9ca7fccd2d78f88f0';

  const { abi: testAbi } = await starknetProvider.getClassAt(contractAddress);
  if (testAbi === undefined) {
    throw new Error('no abi.');
  }
  const myTestContract = new Contract(
    testAbi,
    contractAddress,
    starknetProvider
  );

  // Interaction with the contract with call
  const addr = await myTestContract.get_starknet_address_with_fallback(address);

  return addr;
}
