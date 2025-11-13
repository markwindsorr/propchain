import { useState, useCallback } from 'react';
import { WalletState, WalletError, WalletErrorCode } from '../types/wallet.types';
import { isMetaMaskInstalled, getWalletErrorMessage } from '../utils/wallet';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
  });
  const [error, setError] = useState<WalletError | null>(null);

  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError({
        code: WalletErrorCode.NO_METAMASK,
        message: 'MetaMask is not installed. Please install it to continue.',
      });
      return;
    }

    if (walletState.isConnecting) return;

    setWalletState(prev => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      }) as string[];

      if (accounts.length > 0) {
        setWalletState({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
        });
      }
    } catch (err) {
      const walletError = getWalletErrorMessage(err);
      setError(walletError);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [walletState.isConnecting]);

  const disconnect = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
    });
    setError(null);
  }, []);

  return {
    ...walletState,
    error,
    connect,
    disconnect,
  };
};
