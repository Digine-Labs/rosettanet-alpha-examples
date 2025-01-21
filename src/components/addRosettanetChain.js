import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useChainId } from 'wagmi';

export default function AddRosettanetChain() {
  const toast = useToast();
  const chainId = useChainId();
  const [loading, setLoading] = useState(false);

  async function addRosettanet() {
    if (window.ethereum) {
      setLoading(true);
      try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x52535453',
              blockExplorerUrls: ['https://starkscan.co'],
              chainName: 'RosettaNet',
              nativeCurrency: {
                decimals: 18,
                name: 'STRK',
                symbol: 'STRK',
              },
              rpcUrls: ['http://localhost:3000'],
            },
          ],
        });

        if (wasAdded === null) {
          toast({
            title:
              'Rosettanet successfully added to MetaMask. or changed to Rosettanet Chain.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          // burda bi bokluk var, rosettanet varsa metamaskta chain değişiyor oraya geçiyor alttaki if düzgün çalışmıyor
          if (chainId === 1381192787) {
            toast({
              title: 'Rosettanet already added, changed to Rosettanet Chain.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Rosettanet addition declined.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast({
        title: 'Metamask is not available.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (loading) {
    return (
      <Button isLoading minW={'100%'}>
        Adding Rosettanet Chain
      </Button>
    );
  }

  return (
    <Button onClick={addRosettanet} minW={'100%'}>
      Add Rosettanet Chain
    </Button>
  );
}
