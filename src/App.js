import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Starkgate from './views/starkgate/Starkgate';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Starkgate />
    </ChakraProvider>
  );
}

export default App;
