import React from 'react';
import { useChainId } from 'wagmi';
import { Text } from '@chakra-ui/react';

export default function ActiveChain() {
  const chainId = useChainId();
  const [chain, setChain] = React.useState('');

  React.useEffect(() => {
    if (chainId === 1) {
      setChain('Ethereum');
    } else if (chainId === 11155111) {
      setChain('Sepolia');
    } else if (chainId === 1381192787) {
      setChain('Rosettanet');
    } else {
      setChain('Unknown');
    }
  }, [chainId]);

  return (
    <Text>
      Active Chain:{' '}
      <Text as={'mark'} bgColor={'#BCCCDC'} px={2}>
        {chain}
      </Text>
    </Text>
  );
}
