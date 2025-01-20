import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import { Box, Button, Container, Flex, Text, Input } from '@chakra-ui/react';
import { getStarknetAddress } from '../../utils/starknetUtils';
import { parseEther } from 'ethers';

const starkgateSepoliaAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'l2Recipient',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const { address, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  if (address) {
    return <Button onClick={() => disconnect()}>Disconnect</Button>;
  } else {
    return connectors.map(connector => (
      <Button key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
      </Button>
    ));
  }
}

export default function Starkgate() {
  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract({
    abi: starkgateSepoliaAbi,
  });
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (address) {
      if (chainId !== 11155111) {
        alert('Please connect with ethereum sepolia');
      }
    }
  }, [address, chainId]);

  const handleDeposit = async () => {
    if (!address) {
      alert('Please connect your wallet.');
      return;
    }

    if (!amount) {
      alert('Please enter amount.');
      return;
    }

    const snAddress = await getStarknetAddress(address);

    try {
      const response = await writeContractAsync({
        abi: starkgateSepoliaAbi,
        address: '0x8453fc6cd1bcfe8d4dfc069c400b433054d47bdc',
        functionName: 'deposit',
        args: [
          '0x0000000000000000000000000000000000455448', // token address
          parseEther(amount), // amount (in wei)
          snAddress, // L2 recipient
        ],
        value: parseEther(amount) + parseEther('0.01'), // ETH value to send (in wei)
      });
      console.log('Transaction sent:', response);
    } catch (error) {
      console.error('Error during contract call:', error);
    }
  };

  return (
    <Container maxW="3xl">
      <Flex flexDirection={'column'} alignItems={'flex-start'}>
        <Flex alignItems={'center'} flexDirection={'column'}>
          <Text>Wallet Options</Text>
          <WalletOptions />
        </Flex>
        <Flex>
          <Text>Connected to: {address ? address : 'not available'}</Text>
        </Flex>
        <Flex>
          <Text>
            Your ChainId: {chainId}, Your chain id needs to be 11155111 (ETH
            Sepolia)
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Text>Starkgate Deposit Eth -{'>'} Starknet</Text>
        <Input
          placeholder="Enter Amount"
          mt={3}
          mb={3}
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <Button onClick={handleDeposit}>Deposit ETH</Button>
      </Box>
    </Container>
  );
}
