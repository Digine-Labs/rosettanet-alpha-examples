import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { FullOpenDrawer } from './components/drawer';
import Starkgate from './views/starkgate/Starkgate';
import Home from './views/Home/Home';

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ChakraProvider theme={theme}>
        <FullOpenDrawer />
      </ChakraProvider>
    ),
    children: [
      {
        path: 'starkgate',
        element: <Starkgate />,
      },
      {
        index: true,
        element: <Home />, // Default page when visiting "/"
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
