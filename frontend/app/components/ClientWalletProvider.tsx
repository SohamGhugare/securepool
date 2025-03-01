'use client';

import { WalletProvider } from './WalletContext';
import { ReactNode } from 'react';

export function ClientWalletProvider({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
} 