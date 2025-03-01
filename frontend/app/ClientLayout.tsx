'use client';

import { Connect } from '@stacks/connect-react';
import { Navbar } from './components/Navbar';
import { WalletProvider } from './components/WalletContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'SecurePool Insurance',
          icon: '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
      }}
    >
      <WalletProvider>
        <Navbar />
        {children}
      </WalletProvider>
    </Connect>
  );
} 