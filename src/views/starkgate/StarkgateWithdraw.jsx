import { useState } from 'react';
import { useAccount } from 'wagmi';
import { sendTransaction } from '@wagmi/core';
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
import { parseEther } from 'ethers';
import { prepareMulticallCalldata } from '../../utils/multicall';
import { config } from '../..';
import { parseGwei } from 'viem';

const withdrawCalldata = [
  //send ethereum ile iletişim
  {
    to: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    entrypoint:
      '0x0083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
    calldata: [
      '7D33254052409C04510C3652BC5BE5656F1EFF1B131C7C031592E3FA73F1F70',
      '221B262DD8000',
      '0',
    ],
  },
  {
    to: '0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f',
    entrypoint:
      '0x00e5b455a836c7a254df57ed39d023d46b641b331162c6c0b369647056655409',
    calldata: [
      '455448',
      'E4306A06B19FDC04FDF98CF3C00472F29254C0E1',
      '38D7EA4C68000',
      '0',
    ],
  },
];

export default function StarkgateWithdraw() {
  const { address, chainId } = useAccount();
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

    try {
      const response = await sendTransaction(config, {
        chainId: 1381192787,
        account: address,
        to: address,
        value: parseEther('0'),
        data: prepareMulticallCalldata(withdrawCalldata),
        gasLimit: 50000,
        maxFeePerGas: parseGwei('100'),
        maxPriorityFeePerGas: parseGwei('1'),
        type: 'eip1559',
      });
      console.log('Transaction sent:', response.transaction_hash);
      setTransactions(prevData => [...prevData, response.transaction_hash]);
    } catch (error) {
      console.error('Error during contract call:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
        Wallet.
      </Text>
      <Text as="cite" fontSize={'sm'} display={'block'} mt={2}>
        Wallet needs to be in{' '}
        <Text as="mark" bgColor={'#BCCCDC'} px={2}>
          Rosettanet
        </Text>
        Chain.
      </Text>

      <Input
        placeholder="Enter Amount"
        mt={3}
        mb={3}
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button onClick={handleWithdraw}>Withdraw ETH</Button>
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
                href={`https://sepolia.voyager.online/tx/${tx}`}
                isExternal
              >
                View on Voyager
              </Link>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
}
