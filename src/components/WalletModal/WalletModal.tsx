import { Wallet, X, ExternalLink, Loader2 } from "lucide-react"
import { truncateAddress } from "../../utils/wallet"
import { WalletError } from "../../types/wallet.types"

interface WalletModalProps {
	isOpen: boolean
	onClose: () => void
	onConnect: () => void
	address: string | null
	isConnecting: boolean
	error: WalletError | null
}

export const WalletModal = ({ isOpen, onClose, onConnect, address, isConnecting, error }: WalletModalProps) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

			<div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
				>
					<X size={24} />
				</button>

				<h2 className="text-2xl font-bold text-gray-900 mb-6">Connect Wallet</h2>

				{error && error.code === "NO_METAMASK" ? (
					<div className="space-y-4">
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<p className="text-red-800 text-sm">{error.message}</p>
						</div>
						<a
							href="https://metamask.io/download/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
						>
							Install MetaMask
							<ExternalLink size={16} />
						</a>
					</div>
				) : address ? (
					<div className="space-y-4">
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<p className="text-sm text-green-800 mb-2">Successfully connected!</p>
							<p className="text-lg font-mono text-green-900">{truncateAddress(address)}</p>
						</div>
						<button
							onClick={onClose}
							className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
						>
							Close
						</button>
					</div>
				) : (
					<div className="space-y-4">
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-red-800 text-sm">{error.message}</p>
							</div>
						)}

						<button
							onClick={onConnect}
							disabled={isConnecting}
							className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isConnecting ? (
								<>
									<Loader2 size={24} className="animate-spin" />
									<span>Connecting...</span>
								</>
							) : (
								<>
									<Wallet size={24} />
									<span>Connect with MetaMask</span>
								</>
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
