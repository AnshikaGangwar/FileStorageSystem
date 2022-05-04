import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
// const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
const address = '0x88c6B46B70455a196921a87CA966A74FfB6C4d9b';
//use the ABI from your contract
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi, address);