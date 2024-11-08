"use client";
import { gqlClient } from "@/lib/gql/client";
import reactQueryClient from "@/lib/react-query/client";
import {
    initiateKeplr,
} from "@/src/zustand/wallet";
import { ApolloProvider } from "@apollo/client";
import React, { FC, ReactNode, useLayoutEffect } from "react";

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
    connectorsForWallets,
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import 'dotenv/config'

import {
    sepolia,
    baseSepolia,
    base
} from 'wagmi/chains';

const config = getDefaultConfig({
    appName: 'BaseCrate',
    projectId: 'YOUR_PROJECT_ID',
    chains: [sepolia,
        baseSepolia,
        base],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const projectId = '9811958bd307518b364ff7178034c435';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
});

const demoAppInfo = {
    appName: 'My Wallet Demo',
};

const queryClient = new QueryClient();


interface Props {
    children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
    const { children } = props;
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    useLayoutEffect(() => {
        initiateKeplr();
    }, []);

    return (
        <ApolloProvider client={gqlClient}>
            <QueryClientProvider client={reactQueryClient}>
            <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider appInfo={demoAppInfo}>
                    {mounted && children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>            </QueryClientProvider>
        </ApolloProvider>
    );
};

export default Providers;
