import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
// const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
const address = '0x9a6104a799235139Ab12a9a640342316553efD79';
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
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi, address);