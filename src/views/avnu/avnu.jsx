import React, { useState } from 'react';
import {
  Button,
  Text,
  Card,
  CardBody,
  Stack,
  Link,
  useToast,
  Container,
} from '@chakra-ui/react';
import { getStarknetAddress } from '../../utils/starknetUtils';
import { useAccount } from 'wagmi';
import { sendTransaction } from '@wagmi/core';
import { prepareMulticallCalldata } from '../../utils/multicall';
import { config } from '../..';
import { parseEther } from 'ethers';

export default function Avnu() {
  const { address, chainId } = useAccount();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleClick() {
    setLoading(true);

    if (!address) {
      toast({
        title: 'Please Connect Your Wallet.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (chainId !== 1381192787) {
      toast({
        title: 'Please connect with RosettaNet Chain.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // sell eth get strk
      const snAddress = await getStarknetAddress(address);
      const getQuotes = await fetch(
        `https://sepolia.api.avnu.fi/swap/v1/quotes?sellTokenAddress=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7&buyTokenAddress=0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d&sellAmount=0x38d7ea4c68000&takerAddress=0x${snAddress.toString(16)}&excludeSources=10KSwap&size=1`
      );
      const getQuotesResponse = await getQuotes.json();
      const quoteId = getQuotesResponse[0].quoteId;

      console.log(getQuotesResponse);

      console.log(snAddress.toString(16));
      console.log(address)

      const postBody = {
        quoteId: quoteId,
        takerAddress: '0x' + snAddress.toString(16),
        slippage: '0.05',
        includeApprove: true,
      };

      const buildSwapData = await fetch(
        'https://sepolia.api.avnu.fi/swap/v2/build',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        }
      );

      const buildSwapDataResponse = await buildSwapData.json();

      console.log(buildSwapDataResponse);

      const calldata = [
        //send ethereum ile iletişim
        {
          to: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          entrypoint:
            '0x0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c',
          calldata: buildSwapDataResponse.calls[0].calldata,
        },
        {
          to: '0x2c56e8b00dbe2a71e57472685378fc8988bba947e9a99b26a00fade2b4fe7c2',
          entrypoint:
            '0x01171593aa5bdadda4d6b0efde6cc94ee7649c3163d5efeb19da6c16d63a2a63',
          calldata: buildSwapDataResponse.calls[1].calldata,
        },
      ];

      const response = await sendTransaction(config, {
        chainId: 1381192787,
        account: address,
        to: address,
        value: parseEther('0'),
        data: prepareMulticallCalldata(calldata),
        gasLimit: 70000,
      });
      console.log('Transaction sent:', response);
      setTransactions(prevData => [...prevData, response]);
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error',
        description: JSON.stringify(e.cause.shortMessage),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxW="3xl" overflow={'hidden'}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        Avnu Exchange ETH to STRK
      </Text>
      <Text as="cite" fontSize={'sm'}>
        This part using Avnu to exchange 0,001 ETH to STRK. After successfully
        exchange we can see our increased STRK amount in Wallet.
      </Text>
      <Text as="cite" fontSize={'sm'} display={'block'} mt={2}>
        Wallet needs to be in{' '}
        <Text as="mark" bgColor={'#BCCCDC'} px={2}>
          RosettaNet
        </Text>
        Chain.
      </Text>
      {loading ? (
        <Button mt={2} isLoading loadingText="Exchange">
          Exchange
        </Button>
      ) : (
        <Button mt={2} onClick={handleClick}>
          Exchange
        </Button>
      )}
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
    </Container>
  );
}
