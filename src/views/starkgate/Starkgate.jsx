import { http, createConfig, useAccount, useConnect, useWriteContract, useConnectors } from "wagmi"
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import { sepolia } from "wagmi/chains"

const starkgateSepoliaAbi = [ {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "l2Recipient",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }]

export const depositConfig = createConfig({
chains: [sepolia],
transports: {
    [sepolia.id]: http(),
},
})
export default function Starkgate() {
    const { address } = useAccount()
    const connectors = useConnectors()
    const { data: hash, writeContract } = useWriteContract({config: depositConfig})
    return (
        <Container maxW='3xl'>
            <Flex flexDirection={'row'} alignItems={'center'}>
                <Flex alignItems={'center'} flexDirection={'column'}>
                    <Text>Wallet Options</Text>
                    <WalletOptions /> 
                </Flex>
                <Flex>
                <Text>Connected to: {address}</Text>
                </Flex>
            </Flex>
            <Box>
                <Text>Starkgate Deposit Eth -{">"} Starknet</Text>
                <Button onClick={() => {
                    console.log('wallet call')
                    if(address) {
                        writeContract({
                            abi: starkgateSepoliaAbi,
                            address: '0x8453fc6cd1bcfe8d4dfc069c400b433054d47bdc',
                            functionName: 'deposit',
                            args: [
                                '0x9149065A59503B92DD7CC65f10688a277A03A649',
                                456n,
                                123n
                            ],
                            value: 456n
                        })
                    console.log(hash)
                    }
                }}>Deposit 0.1 ETH</Button>
            </Box>
        </Container>
    )
}

export function WalletOptions() {
    const { connectors, connect } = useConnect()
  
    return connectors.map((connector) => (
      <Button key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
      </Button>
    ))
  }