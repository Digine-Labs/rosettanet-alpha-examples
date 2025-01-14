import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Starkgate from './views/starkgate/Starkgate';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <Starkgate />
    </ChakraProvider>
  );
}

export default App;
