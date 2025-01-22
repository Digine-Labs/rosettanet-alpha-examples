import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import {
  Box,
  Button,
  Text,
  Input,
  Card,
  CardBody,
  Stack,
  Link,
  useToast,
} from '@chakra-ui/react';
import { getStarknetAddress } from '../../utils/starknetUtils';
import { parseEther } from 'ethers';

const starkgateSepoliaAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'l1_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'l1_recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'initiate_token_withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const contractAddress = '0xbb9b894c4d7bb95fb88b979974a739577bc360a9';

export default function StarkgateWithdraw() {
  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract({
    abi: starkgateSepoliaAbi,
  });
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const toast = useToast();

  const handleWithdraw = async () => {
    if (!address) {
      toast({
        title: 'Please Connect Your Wallet.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (chainId !== 1381192787) {
      toast({
        title: 'Please connect with Rosettanet Chain.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!amount) {
      toast({
        title: 'Please enter amount.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const snAddress = await getStarknetAddress(address);

    try {
      const response = await writeContractAsync({
        abi: starkgateSepoliaAbi,
        address: contractAddress,
        functionName: 'initiate_token_withdraw',
        args: [
          '0x0000000000000000000000000000000000455448', // l1 token address
          snAddress, // amount
          parseEther(amount), // l1 recipient
        ],
        value: parseEther(amount) + parseEther('0.01'), // ETH value to send (in wei)
      });
      console.log('Transaction sent:', response);
      setTransactions(prevData => [...prevData, response]);
    } catch (error) {
      console.error('Error during contract call:', error);
    }
  };

  return (
    <Box>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        Starkgate Withdraw from Starknet to ETH
      </Text>
      <Text as="cite" fontSize={'sm'}>
        This part using Starkgate to send ETH from Starknet to Ethereum. After
        successfully sent we can see our ETH amount in Ethereum Sepolia chain in
        Metamask.
      </Text>
      <Text as="cite" fontSize={'sm'} display={'block'} mt={2}>
        Metamask needs to be in <Text as="mark" bgColor={'#BCCCDC'} px={2}>Rosettanet</Text> Chain.
      </Text>

      <Input
        placeholder="Enter Amount"
        mt={3}
        mb={3}
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button onClick={handleWithdraw}>Deposit ETH</Button>
      <Text mt={2} fontSize={'lg'} fontWeight={'bold'}>
        Transactions
      </Text>
      {transactions.map((tx, index) => (
        <Card key={tx} size={'sm'} borderRadius={'lg'} my={5}>
          <CardBody size={'sm'}>
            <Stack>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                Transaction {index + 1}
              </Text>
              <Text fontSize={'sm'}>Transaction Hash: {tx}</Text>
              <Link
                fontSize={'sm'}
                href={`https://sepolia.etherscan.io/tx/${tx}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
}
