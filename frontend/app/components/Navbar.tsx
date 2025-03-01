'use client';

import Link from 'next/link';
import { useState } from 'react';
import { WalletButton } from './WalletButton';
import { Shield } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Shield className="h-6 w-6 text-green-600" />
            <span><span className="text-green-600">Secure</span>Pool</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all font-bold"
            >
              About
            </Link>
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 flex flex-col items-center">
            <Link 
              href="/about" 
              className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all font-bold text-center w-full max-w-[200px]"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="w-full flex justify-center">
              <WalletButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 