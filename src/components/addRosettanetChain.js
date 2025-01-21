import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useChainId } from 'wagmi';

export default function AddRosettanetChain() {
  const toast = useToast();
  const chainId = useChainId();
  async function addRosettanet() {
    if (window.ethereum) {
      try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x52535453',
              chainName: 'Rosettanet',
              rpcUrls: ['http://localhost:3000'],
              nativeCurrency: {
                name: 'STRK',
                symbol: 'STRK',
                decimals: 18,
              },
              blockExplorerUrls: ['https://starkscan.co/'],
            },
          ],
        });

        if (wasAdded) {
          toast({
            title: 'Rosettanet successfully added to MetaMask.',
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
        console.log(err);
        toast({
          title: 'Error.',
          description: err.message,
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
  }

  return (
    <Button onClick={addRosettanet} minW={'100%'}>
      Add Rosettanet Chain
    </Button>
  );
}
