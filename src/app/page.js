'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
export default function Home() {
  const account = useAccount()
  console.log(account)
  return (
    <>
    <Flex direction={'row'} height={'100px'} justifyContent={'space-evenly'} alignItems={'center'}>
      <Flex direction={'row'}>
        <Text>Starknet Address: </Text>
        <Text>TBD</Text>
      </Flex>
      <ConnectButton />
      <Flex direction={'row'}>
        <Text>EVM Address: </Text>
        <Text>{account.address}</Text>
      </Flex>
    </Flex>
    </>
  );
}

function connectWallet() {

}