export const ERC20abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "alllowToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			}
		],
		"name": "allowWeth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "basketID",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "tokens",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "balances",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "weights",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "basketOwner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "pool",
						"type": "address"
					},
					{
						"internalType": "enum Baskets.BasketType",
						"name": "basketType",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct Baskets.Basket",
				"name": "basket",
				"type": "tuple"
			}
		],
		"name": "BasketCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "tokens",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "weights",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "poolAddress",
				"type": "address"
			},
			{
				"internalType": "enum Baskets.BasketType",
				"name": "basketType",
				"type": "uint8"
			}
		],
		"name": "createBasket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			}
		],
		"name": "depositAndSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "GetToken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "basketOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"name": "TokenDeposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			}
		],
		"name": "transferToContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "basketToOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "creators",
		"outputs": [
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "basketID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "basketOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pool",
				"type": "address"
			},
			{
				"internalType": "enum Baskets.BasketType",
				"name": "basketType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			}
		],
		"name": "getBasketById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "basketID",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "tokens",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "balances",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "weights",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "basketOwner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "pool",
						"type": "address"
					},
					{
						"internalType": "enum Baskets.BasketType",
						"name": "basketType",
						"type": "uint8"
					}
				],
				"internalType": "struct Baskets.Basket",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getBasketsByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "basketID",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "tokens",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "balances",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "weights",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "basketOwner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "pool",
						"type": "address"
					},
					{
						"internalType": "enum Baskets.BasketType",
						"name": "basketType",
						"type": "uint8"
					}
				],
				"internalType": "struct Baskets.Basket[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getDashboardData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "basketId",
						"type": "string"
					},
					{
						"internalType": "enum Baskets.BasketType",
						"name": "basketType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "totalWethInvested",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "tokens",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "amounts",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "weights",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "lastInvestmentTime",
						"type": "uint256"
					}
				],
				"internalType": "struct Baskets.DashboardView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "basketId",
				"type": "string"
			}
		],
		"name": "getOwnerOfBasket",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTotalWethInvested",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "uniqueBasketMapping",
		"outputs": [
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "basketID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "basketOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pool",
				"type": "address"
			},
			{
				"internalType": "enum Baskets.BasketType",
				"name": "basketType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userInvestedBaskets",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "userInvestments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalWethInvested",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastInvestmentTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hasInvested",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

