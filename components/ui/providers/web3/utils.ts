import {MetaMaskInpageProvider} from "@metamask/providers";
import {Contract, ethers, providers} from "ethers";


declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export type Web3Params  = {
    ethereum: MetaMaskInpageProvider | null;
    provider: providers.Web3Provider | null;
    contract: Contract | null;
}

export type Web3State = {
    isLoading: boolean;
} & Web3Params

export function createDefaultState() {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true
    }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export async function loadContract( name: string, provider: providers.Web3Provider):Promise<Contract>{
    if ( !NETWORK_ID ) {
        return Promise.reject("Network ID не найдено")
    }

    const response = await fetch(`/contracts/${name}.json`)
    const Artifact = await response.json();

    if ( Artifact.networks[NETWORK_ID].address ) {
        const contract = new ethers.Contract(
            Artifact.networks[NETWORK_ID].address,
            Artifact.abi,
            provider
        )

        return contract
    } else {
        return Promise.reject(`Контракт ${name} не был загружен`)
    }
}