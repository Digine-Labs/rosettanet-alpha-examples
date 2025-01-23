import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { http, createConfig, WagmiProvider, injected } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import {
  sepolia as WalletConnectSepolia,
  mainnet,
} from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { walletConnect, metaMask } from 'wagmi/connectors';
import { defineChain } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createAppKit } from '@reown/appkit/react';

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
};

// const rosettanetSepoliaWalletConnect = defineChain({
//   id: 1381192787,
//   name: 'Rosettanet',
//   chainNamespace: 'rosettanet',
//   caipNetworkId: '1381192787',
//   nativeCurrency: { name: 'Starknet Token', symbol: 'STRK', decimals: 18 },
//   rpcUrls: {
//     default: { http: 'http://localhost:3000' },
//   },
//   blockExplorers: {
//     default: { name: 'Voyager', url: 'https://sepolia.voyager.io' },
//   },
// });

// const walletConnectNetworks = [
//   WalletConnectSepolia,
//   rosettanetSepoliaWalletConnect,
// ];

// const walletConnectMetadata = {
//   name: 'Rosy',
//   description: 'AppKit Example',
//   url: 'https://reown.com/appkit', // origin must match your domain & subdomain
//   icons: ['https://assets.reown.com/reown-profile-pic.png'],
// };

// const wagmiAdapter = new WagmiAdapter({
//   networks: walletConnectNetworks,
//   projectId: '7e0b8c7d55dd9cad555623bf3c34da1c',
// });

// createAppKit({
//   adapters: [wagmiAdapter],
//   metadata: walletConnectMetadata,
//   networks: walletConnectNetworks,
//   projectId: '7e0b8c7d55dd9cad555623bf3c34da1c',
// });

export const config = createConfig({
  chains: [rosettanetSepolia, sepolia],
  connectors: [
    walletConnect({
      projectId: '7e0b8c7d55dd9cad555623bf3c34da1c',
      isNewChainsStale: true,
      showQrModal: true,
      metadata: {
        name: 'Rosy',
        description: 'AppKit Example',
        url: 'https://reown.com/appkit', // origin must match your domain & subdomain
        icons: ['https://assets.reown.com/reown-profile-pic.png'],
      },
    }),
  ],
  transports: {
    [rosettanetSepolia]: http('http://localhost:3000'),
    [mainnet.id]: http(),
    [sepolia.id]: http('https://eth-sepolia.public.blastapi.io'),
  },
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <WagmiProvider config={config}>
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
