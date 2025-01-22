import {
    Button,
  Container,
    Text,
    useToast
} from '@chakra-ui/react';
import { sendTransaction } from '@wagmi/core';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { config } from '../..';
import { prepareMulticallCalldata } from '../../utils/multicall';
import { parseEther } from 'viem';

export default function Unruggable() {
  const { address, chainId } = useAccount();
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const toast = useToast();

      const handleCreate = async () => {
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
    
        const createMemecoinCalldata = [
            //send ethereum ile iletişim
            {
              to: '0x00494a72a742b7880725a965ee487d937fa6d08a94ba4eb9e29dd0663bc653a2',
              entrypoint:
                '0x014b9c006653b96dd1312a62b5921c465d08352de1546550f0ed804fcc0ef9e9',
              calldata: [
                '0x061D2D0E093B92116632A5068Ce683d051E2Ada4ACddf948bA77ec2Fed9786d6',
                '0x455454',
                '0x11',
                '0x123',
                '0x0',
                '0x123456'
              ],
            }
          ];
        try {
          const response = await sendTransaction(config, {
            chainId: 1381192787,
            account: address,
            to: address,
            value: parseEther('0'),
            data: prepareMulticallCalldata(createMemecoinCalldata),
            gasLimit: 90000,
          });
          console.log('Transaction sent:', response.transaction_hash);
          setTransactions(prevData => [...prevData, response.transaction_hash]);
        } catch (error) {
          console.error('Error during contract call:', error);
        }
      };
  return (
    <Container maxW="3xl" overflow={'hidden'}>
        <Text>Create a memecoin</Text>
        <Button onClick={handleCreate}>Create Memecoin</Button>
    </Container>
  );
}
