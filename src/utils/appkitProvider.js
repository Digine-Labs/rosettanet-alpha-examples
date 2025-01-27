import { createAppKit } from '@reown/appkit/react';

import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  mainnet,
  defineChain,
  sepolia,
} from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = '7e0b8c7d55dd9cad555623bf3c34da1c';

// 2. Create a metadata object - optional
const metadata = {
  name: 'Rosy',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

const rosettanetSepolia = defineChain({
  id: 1381192787,
  caipNetworkId: 'eip155:1381192787',
  chainNamespace: 'eip155',
  name: 'Rosettanet',
  nativeCurrency: {
    decimals: 18,
    name: 'Starknet Token',
    symbol: 'STRK',
  },
  rpcUrls: {
    default: {
      http: ['https://alpha-deployment.rosettanet.io/'],
    },
  },
  blockExplorers: {
    default: { name: 'Voyager', url: 'https://sepolia.voyager.io' },
  },
  contracts: {
    // Add the contracts here
  },
});

// 3. Set the networks
const networks = [sepolia, rosettanetSepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
