import { describe, it, expect } from 'vitest';
import { truncateAddress, getWalletErrorMessage } from './wallet';
import { WalletErrorCode } from '../types/wallet.types';

describe('truncateAddress', () => {
  it('truncates valid Ethereum address', () => {
    const address = '0x742d35cc6634C0532925a3b8D6aD8a7e15b2a9d1';
    expect(truncateAddress(address)).toBe('0x742d...a9d1');
  });

  it('returns empty string for empty address', () => {
    expect(truncateAddress('')).toBe('');
  });
});

describe('getWalletErrorMessage', () => {
  it('returns user rejected error for code 4001', () => {
    const error = { code: 4001 };
    const result = getWalletErrorMessage(error);
    expect(result.code).toBe(WalletErrorCode.USER_REJECTED);
    expect(result.message).toContain('rejected');
  });

  it('returns already processing error for code -32002', () => {
    const error = { code: -32002 };
    const result = getWalletErrorMessage(error);
    expect(result.code).toBe(WalletErrorCode.ALREADY_PROCESSING);
    expect(result.message).toContain('pending');
  });

  it('returns unknown error for unrecognized error', () => {
    const error = { code: 9999 };
    const result = getWalletErrorMessage(error);
    expect(result.code).toBe(WalletErrorCode.UNKNOWN_ERROR);
  });
});
