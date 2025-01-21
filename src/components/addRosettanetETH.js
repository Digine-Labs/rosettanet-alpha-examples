import React from 'react';
import { Button, useToast } from '@chakra-ui/react';

export default function AddRosettanetETH() {
  const toast = useToast();
  const addETH = async () => {
    if (window.ethereum) {
      try {
        const tokenAddress = '0xB5E1278663de249F8580Ec51b6B61739bd906215'; // Replace with your token's contract address
        const tokenSymbol = 'ETH'; // Replace with your token's symbol
        const tokenDecimals = 18; // Replace with your token's decimals

        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
            },
          },
        });

        if (wasAdded) {
          toast({
            title: 'Token successfully added to MetaMask.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Token addition declined.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error adding token:', error);
        toast({
          title: 'Error.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Metamask is not available.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={addETH} minW={'100%'}>
      Add Rosettanet ETH
    </Button>
  );
}
