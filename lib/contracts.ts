import { ethers } from 'ethers'
import CRATE_CONTRACT from './abi/Crate.json'
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, baseSepolia, base } from '@wagmi/core/chains'

export const config = createConfig({
    chains: [ sepolia, baseSepolia, base ],
    transports: {
        [sepolia.id]: http(),
        [baseSepolia.id]: http(),
        [base.id]: http(),
    },
})

export const CRATE_CONTRACT_ADDRESS = '0x5C4c504CCFF2ad3c8EB24C916f22A96353625228';
export const SEPOLIA_USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

export function getCrateContract(provider: ethers.providers.Web3Provider) {
    return new ethers.Contract(CRATE_CONTRACT_ADDRESS, CRATE_CONTRACT.abi, provider.getSigner());
}