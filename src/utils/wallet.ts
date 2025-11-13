import { WalletError, WalletErrorCode } from "../types/wallet.types"

export const truncateAddress = (address: string): string => {
	if (!address) return ""
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const isMetaMaskInstalled = (): boolean => {
	return (
		typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask === true
	)
}

export const getWalletErrorMessage = (error: unknown): WalletError => {
	if (typeof error === "object" && error !== null && "code" in error) {
		const errorCode = (error as { code: number }).code
		if (errorCode === 4001) {
			return {
				code: WalletErrorCode.USER_REJECTED,
				message: "Connection request was rejected. Please try again."
			}
		}
		if (errorCode === -32002) {
			return {
				code: WalletErrorCode.ALREADY_PROCESSING,
				message: "Connection request already pending. Please check MetaMask."
			}
		}
	}

	return {
		code: WalletErrorCode.UNKNOWN_ERROR,
		message: "An unexpected error occurred. Please try again."
	}
}
