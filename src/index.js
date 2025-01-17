import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { http, createConfig, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const rosettanetSepolia = {
  id: 1381192787,
  name: 'Rosettanet',
  nativeCurrency: { name: 'Starknet Token', symbol: 'STRK', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://localhost:3000'] },
  },
  blockExplorers: {
    default: { name: 'Voyager', url: 'https://sepolia.voyager.io' },
  },
}

export const config = createConfig({
  chains: [rosettanetSepolia],
  transports: {
    [rosettanetSepolia]: http(),
  },
})

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient()

root.render(
  <StrictMode>
  <WagmiProvider  config={config}>
  <QueryClientProvider client={queryClient}> 
    <ColorModeScript />
    <App />
    </QueryClientProvider>  
  </WagmiProvider>

  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

