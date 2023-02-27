import { BigNumber } from "@payvo/sdk-helpers";
import { DateTime } from "@payvo/sdk-intl";

const baseWallet = {
	actions: [
		{
			label: "Action 1",
			value: "1",
		},
		{
			label: "Action 2",
			value: "2",
		},
		{
			label: "Action 3",
			value: "3",
		},
	],
	address: "D8rr7B1d6TL6pf14LgMz4sKp1VBMs6YUYD",
	avatarId: "test1",
	balance: "120 ARK",
	business: {
		name: "ROBank Eco",
	},
	coinClassName: "text-theme-danger-400 border-theme-danger-200",
	coinIcon: "ARK",
	delegates: [
		{
			address: "AbuzhuDTyhnfAqepZzVcVsgd1Ym6FgETuW",
			explorerUrl: "https://dexplorer.ark.io",
			isActive: true,
			msqUrl: "https://marketsquare.ark.io",
			rank: 1,
			username: "Delegate 3",
		},
	],
	fiat: "980 USD",
	pendingTransactions: [
		{
			amount: () => 100,
			asset: () => ({ a: "b" }),
			blockId: () => "71fd1a494ded5430586f4dd1c79c3ac77bf38120e868c8f8980972b8075d67e9",
			coin: () => void 0,
			confirmations: () => BigNumber.make(10),
			convertedTotal: () => 0,
			data: () => ({ data: () => void 0 }),
			explorerLink: () => "",
			fee: () => 21,
			getMeta: () => "",
			hasFailed: () => false,
			hasPassed: () => true,
			id: () => "ee4175091d9f4dacf5fed213711c3e0e4cc371e37afa7bce0429d09bcf3ecefe",
			isConfirmed: () => false,
			isDelegateRegistration: () => false,
			isDelegateResignation: () => false,
			isHtlcClaim: () => false,
			isHtlcLock: () => false,
			isHtlcRefund: () => false,
			isIpfs: () => false,
			isMagistrate: () => false,
			isMultiPayment: () => false,
			isMultiSignatureRegistration: () => false,
			isReceived: () => false,
			isSecondSignature: () => false,
			isSent: () => true,
			isTransfer: () => true,
			isUnvote: () => false,
			isVote: () => false,
			memo: () => "Test",
			recipient: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			recipients: () => [],
			sender: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			setMeta: () => "",
			timestamp: () => DateTime.fromUnix(1_596_213_281),
			toObject: () => ({ a: "b" }),
			total: () => 121,
			type: () => "transfer",
			unvotes: () => ["10"],
			votes: () => ["10"],
			wallet: () => void 0,
		},
	],
	publicKey: "03df6cd794a7d404db4f1b25816d8976d0e72c5177d17ac9b19a92703b62cdbb",
	transactions: [
		{
			amount: () => 100,
			asset: () => ({ a: "b" }),
			blockId: () => "71fd1a494ded5430586f4dd1c79c3ac77bf38120e868c8f8980972b8075d67e9",
			coin: () => void 0,
			confirmations: () => BigNumber.make(10),
			convertedTotal: () => 0,
			data: () => ({ data: () => void 0 }),
			explorerLink: () => "",
			fee: () => 21,
			getMeta: () => "",
			hasFailed: () => false,
			hasPassed: () => true,
			id: () => "ee4175091d9f4dacf5fed213711c3e0e4cc371e37afa7bce0429d09bcf3ecefe",
			isConfirmed: () => false,
			isDelegateRegistration: () => false,
			isDelegateResignation: () => false,
			isHtlcClaim: () => false,
			isHtlcLock: () => false,
			isHtlcRefund: () => false,
			isIpfs: () => false,
			isMagistrate: () => false,
			isMultiPayment: () => false,
			isMultiSignatureRegistration: () => false,
			isReceived: () => false,
			isSecondSignature: () => false,
			isSent: () => true,
			isTransfer: () => true,
			isUnvote: () => false,
			isVote: () => false,
			memo: () => "Test",
			recipient: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			recipients: () => [],
			sender: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			setMeta: () => "",
			timestamp: () => DateTime.fromUnix(1_596_213_281),
			toObject: () => ({ a: "b" }),
			total: () => 121,
			type: () => "transfer",
			unvotes: () => ["10"],
			votes: () => ["10"],
			wallet: () => void 0,
		},
		{
			amount: () => 52,
			asset: () => ({ a: "b" }),
			blockId: () => "71fd1a494ded5430586f4dd1c79c3ac77bf38120e868c8f8980972b8075d67e9",
			coin: () => void 0,
			confirmations: () => BigNumber.make(5),
			convertedTotal: () => 0,
			data: () => ({ data: () => void 0 }),
			explorerLink: () => "",
			fee: () => 0.2,
			getMeta: () => "",
			hasFailed: () => false,
			hasPassed: () => true,
			id: () => "ee4175091d9f4dacf5fed213711c3e0e4cc371e37afa7bce0429d09bcf3ecefe",
			isConfirmed: () => false,
			isDelegateRegistration: () => false,
			isDelegateResignation: () => false,
			isHtlcClaim: () => false,
			isHtlcLock: () => false,
			isHtlcRefund: () => false,
			isIpfs: () => false,
			isMagistrate: () => false,
			isMultiPayment: () => false,
			isMultiSignatureRegistration: () => false,
			isReceived: () => false,
			isSecondSignature: () => true,
			isSent: () => true,
			isTransfer: () => true,
			isUnvote: () => false,
			isVote: () => false,
			memo: () => "Test",
			recipient: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			recipients: () => [],
			sender: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			setMeta: () => "",
			timestamp: () => DateTime.fromUnix(1_596_213_281),
			toObject: () => ({ a: "b" }),
			total: () => 121,
			type: () => "transfer",
			unvotes: () => ["10"],
			votes: () => ["10"],
			wallet: () => void 0,
		},
		{
			amount: () => 1,
			asset: () => ({ a: "b" }),
			blockId: () => "71fd1a494ded5430586f4dd1c79c3ac77bf38120e868c8f8980972b8075d67e9",
			coin: () => void 0,
			confirmations: () => BigNumber.make(5),
			convertedTotal: () => 0,
			data: () => ({ data: () => void 0 }),
			explorerLink: () => "",
			fee: () => 0.2,
			getMeta: () => "",
			hasFailed: () => false,
			hasPassed: () => true,
			id: () => "ee4175091d9f4dacf5fed213711c3e0e4cc371e37afa7bce0429d09bcf3ecefe",
			isConfirmed: () => false,
			isDelegateRegistration: () => false,
			isDelegateResignation: () => false,
			isIpfs: () => false,
			isMagistrate: () => false,
			isMultiPayment: () => false,
			isMultiSignatureRegistration: () => false,
			isReceived: () => false,
			isSecondSignature: () => true,
			isSent: () => true,
			isTransfer: () => true,
			isUnvote: () => false,
			isVote: () => true,
			memo: () => "Test",
			recipient: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			recipients: () => [],
			sender: () => "ASuusXSW9kfWnicScSgUTjttP6T9GQ3kqT",
			setMeta: () => "",
			timestamp: () => DateTime.fromUnix(1_596_213_281),
			toObject: () => ({ a: "b" }),
			total: () => 121,
			type: () => "vote",
			unvotes: () => ["10"],
			votes: () => ["10"],
			wallet: () => void 0,
		},
	],
};

export const wallets = [
	{
		...baseWallet,
		walletName: "ARK Wallet 1",
	},
	{
		...baseWallet,
		walletName: "ARK Wallet 2",
	},
];

export const wallet = wallets[0];

export const networks = [
	{
		className: "text-theme-danger-400 border-theme-danger-200",
		coin: "ARK",
		icon: "ARK",
		name: "ARK Ecosystem",
		network: "ark.devnet",
	},
	{
		className: "text-theme-danger-400 border-theme-danger-200",
		coin: "BIND",
		icon: "BIND",
		name: "Compendia",
		network: "bind.devnet",
	},
	{
		className: "text-theme-warning-400 border-theme-warning-200",
		coin: "BTC",
		icon: "BTC",
		name: "Bitcoin",
		network: "testnet",
	},
	{
		className: "text-theme-secondary-800 border-theme-secondary-600",
		coin: "ETH",
		icon: "ETH",
		name: "Ethereum",
		network: "mainnet",
	},
	{
		className: "text-theme-primary-600 border-theme-primary-400",
		coin: "LSK",
		icon: "LSK",
		name: "Lisk",
		network: "mainnet",
	},
	{
		className: "text-theme-primary-700 border-theme-primary-500",
		coin: "XRP",
		icon: "XRP",
		name: "Ripple",
		network: "mainnet",
	},
];
