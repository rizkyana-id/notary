import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.1/ethers.min.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI, RPC_URL, SEPOLIA_CHAIN_ID } from './config.js';

// State Blockchain
export const walletState = {
    provider: null,
    signer: null,
    contract: null,
    address: null,
    isConnected: false
};

// Provider Read-Only (Publik)
const readOnlyProvider = new ethers.JsonRpcProvider(RPC_URL);
const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readOnlyProvider);

// --- Fungsi Write (Admin) ---

export async function connectWallet() {
    if (typeof window.ethereum === 'undefined') throw new Error("MetaMask tidak terdeteksi!");

    walletState.provider = new ethers.BrowserProvider(window.ethereum);
    
    // Cek Network
    const network = await walletState.provider.getNetwork();
    if (String(network.chainId) !== String(11155111)) {
        try {
            await walletState.provider.send('wallet_switchEthereumChain', [{ chainId: SEPOLIA_CHAIN_ID }]);
            // Refresh provider setelah switch
            walletState.provider = new ethers.BrowserProvider(window.ethereum); 
        } catch (err) {
            throw new Error("Gagal mengganti jaringan ke Sepolia.");
        }
    }

    // Request Account
    await walletState.provider.send("eth_requestAccounts", []);
    walletState.signer = await walletState.provider.getSigner();
    walletState.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, walletState.signer);
    walletState.address = await walletState.signer.getAddress();
    walletState.isConnected = true;

    return walletState.address;
}

export async function registerDocumentOnChain(hash, owner, nim, status, catatan) {
    if (!walletState.contract) throw new Error("Wallet belum terkoneksi.");
    
    const tx = await walletState.contract.registerDocument(hash, owner, nim, status, catatan);
    const receipt = await tx.wait(); // Tunggu konfirmasi block
    return receipt;
}

// --- Fungsi Read (Publik) ---

export async function fetchDocument(hash) {
    // Menggunakan readOnlyContract agar tidak butuh wallet user
    return await readOnlyContract.documents(hash);
}