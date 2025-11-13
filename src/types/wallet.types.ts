export interface WalletState {
	address: string | null
	isConnected: boolean
	isConnecting: boolean
}

export interface WalletError {
	code: string
	message: string
}

export enum WalletErrorCode {
	NO_METAMASK = "NO_METAMASK",
	USER_REJECTED = "USER_REJECTED",
	ALREADY_PROCESSING = "ALREADY_PROCESSING",
	UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

declare global {
	interface Window {
		ethereum?: {
			isMetaMask?: boolean
			request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
		}
	}
}

export {}
