import { useAccount, useBalance, useConnect } from "wagmi"
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"

export default function Starkgate() {
    const { address } = useAccount()
    const balance = useBalance({
        address
    })
    return (
        <Container maxW='3xl'>
            <Flex flexDirection={'row'} alignItems={'center'}>
                <Flex alignItems={'center'} flexDirection={'column'}>
                    <Text>Wallet Options</Text>
                    <WalletOptions /> 
                </Flex>
                <Flex>
                    <Text>Connected to: {address}</Text>
                    <Text>Balance: {balance} STRK</Text>
                </Flex>
            </Flex>
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