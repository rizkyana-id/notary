// Konfigurasi Smart Contract & Network
export const CONTRACT_ADDRESS = "0x458279E67098F21a2E5255A9fCd247d35799E6c3"; // Ganti jika deploy baru
export const SEPOLIA_CHAIN_ID = '0xaa36a7'; // 11155111
export const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/2X4vBooOYWuj03VxAQlc0"; // Ganti dengan API Key Anda

// Paste ABI Lengkap Anda di sini
export const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "fileHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newCatatan",
				"type": "string"
			}
		],
		"name": "DocumentCatatanUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "fileHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nim",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum DocumentAuthenticator.DocumentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DocumentRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "fileHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "enum DocumentAuthenticator.DocumentStatus",
				"name": "newStatus",
				"type": "uint8"
			}
		],
		"name": "DocumentStatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_docOwner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nim",
				"type": "string"
			},
			{
				"internalType": "enum DocumentAuthenticator.DocumentStatus",
				"name": "_status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_catatan",
				"type": "string"
			}
		],
		"name": "registerDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_newCatatan",
				"type": "string"
			}
		],
		"name": "updateCatatan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			},
			{
				"internalType": "enum DocumentAuthenticator.DocumentStatus",
				"name": "_newStatus",
				"type": "uint8"
			}
		],
		"name": "updateStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "documents",
		"outputs": [
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nim",
				"type": "string"
			},
			{
				"internalType": "enum DocumentAuthenticator.DocumentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "catatan",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];