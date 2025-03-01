'use client';

import { useState, useRef, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { AlertCircle, ChevronDown, LogOut } from 'lucide-react';

export const WalletButton = () => {
  const { isConnected, address, connect, disconnect } = useWallet();
  const [showMenu, setShowMenu] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close menu and modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowDisconnectModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
      setError('Failed to connect to wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-all font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {address.slice(0, 6)}...{address.slice(-4)}
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Wallet Menu */}
        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {/* Wallet Details Section */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500">Wallet Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Address:</span>
                  <span className="text-sm font-mono font-medium text-gray-700">{address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Network:</span>
                  <span className="text-sm font-medium text-gray-700">testnet</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status:</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span className="text-sm font-medium text-gray-700">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowDisconnectModal(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Disconnect Modal */}
        {showDisconnectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div 
              ref={modalRef}
              className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 space-y-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Disconnect Wallet</h3>
                  <p className="text-gray-600 mt-1">
                    Are you sure you want to disconnect your Ethereum wallet? You will need to reconnect it to use the app.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDisconnectModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    disconnect();
                    setShowDisconnectModal(false);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="px-4 py-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Connecting...' : 'Connect Flow Wallet'}
      </button>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}; 