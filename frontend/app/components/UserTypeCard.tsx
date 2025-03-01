'use client';

import { useRouter } from 'next/navigation';
import { useWallet } from './WalletContext';

interface UserTypeCardProps {
  title: string;
  description: string;
  buttonText: string;
  redirectPath: string;
}

export const UserTypeCard = ({ title, description, buttonText, redirectPath }: UserTypeCardProps) => {
  const router = useRouter();
  const { isConnected } = useWallet();

  const handleClick = () => {
    if (!isConnected) {
      router.push('/connect');
    } else {
      router.push(redirectPath);
    }
  };

  return (
    <div 
      className="h-full flex flex-col bg-white p-10 rounded-2xl border border-gray-200 hover:border-green-600 cursor-pointer shadow-lg hover:shadow-xl transition-all text-center group"
      onClick={handleClick}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-green-600 transition-colors">{title}</h2>
      <p className="text-gray-600 text-lg mb-8 flex-grow">{description}</p>
      <div className="flex justify-center">
        <button className="bg-green-50 text-green-700 hover:bg-green-100 px-8 py-4 rounded-xl font-bold transition-all transform group-hover:scale-105 text-lg w-full sm:w-auto">
          {buttonText}
        </button>
      </div>
    </div>
  );
}; 