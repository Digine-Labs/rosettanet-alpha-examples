import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { FullOpenDrawer } from './components/drawer';
import Starkgate from './views/starkgate/Starkgate';
import Home from './views/Home/Home';
import Avnu from './views/avnu/avnu';
import Ekubo from './views/ekubo/ekubo';
import Nostra from './views/nostra/nostra';
import Unruggable from './views/unruggable/Unruggable';
import CurrStatus from './views/currStatus/currStatus';

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
      {
        path: 'avnu',
        element: <Avnu />,
      },
      // {
      //   path: 'ekubo',
      //   element: <Ekubo />,
      // },
      // {
      //   path: 'nostra',
      //   element: <Nostra />,
      // },
      {
        path: 'unruggable',
        element: <Unruggable />,
      },
      {
        path: 'currentStatus',
        element: <CurrStatus />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
