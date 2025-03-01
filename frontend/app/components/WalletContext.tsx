'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as fcl from '@onflow/fcl';
import { VerificationDialog } from './ui/VerificationDialog';

interface FlowService {
  f_type: string;
  f_vsn: string;
  type: string;
  uid: string;
  endpoint: string;
  provider?: {
    address: string;
    name: string;
  };
  identity?: {
    address: string;
  };
}

interface FlowUser {
  f_type: string;
  f_vsn: string;
  addr: string | null;
  cid: string;
  loggedIn: boolean;
  services: FlowService[];
}

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  // Initialize FCL configuration only on client side
  useEffect(() => {
    fcl.config({
      'app.detail.title': 'SecurePool Insurance',
      'flow.network': 'testnet',
      'accessNode.api': 'https://rest-testnet.onflow.org',
      'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
      'discovery.authn.endpoint': 'https://fcl-discovery.onflow.org/api/testnet/authn',
    });

    // Clean up any existing session on mount
    fcl.unauthenticate();

    // Subscribe to user authentication changes
    const unsubscribe = fcl.currentUser.subscribe((user: FlowUser) => {
      console.log('User auth changed:', user);
      // Only consider user connected if both loggedIn is true AND we have an address
      if (user.loggedIn && user.addr) {
        setAddress(user.addr);
        setIsConnected(true);
      } else {
        // If either condition is false, consider the user disconnected
        setAddress(null);
        setIsConnected(false);
        // Force disconnect if we're in an invalid state
        if (user.loggedIn && !user.addr) {
          fcl.unauthenticate();
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect...');
      // Disconnect any existing user first
      await fcl.unauthenticate();
      await fcl.authenticate();
      
      // Wait for the user data to be updated
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000); // 10 second timeout

        const unsubscribe = fcl.currentUser.subscribe((user: FlowUser) => {
          if (user.loggedIn && user.addr) {
            clearTimeout(timeout);
            unsubscribe();
            setIsConnected(true);
            setShowVerification(true);
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    fcl.unauthenticate();
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ isConnected, address, connect: connectWallet, disconnect }}>
      {children}
      <VerificationDialog 
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
      />
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 