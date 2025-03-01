'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '../components/WalletContext';
import { Marketplace } from '../components/Marketplace';

export default function InsuranceBuyerPage() {
  const router = useRouter();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) {
      router.push('/connect');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return <Marketplace />;
} 