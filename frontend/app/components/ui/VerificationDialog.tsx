import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VerificationDialog({ isOpen, onClose }: VerificationDialogProps) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate verification process
      const timer = setTimeout(() => {
        setIsVerified(true);
        // Auto close after showing success
        setTimeout(onClose, 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        {!isVerified ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generating Verifiable Identity...
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Powered by Humanity Protocol
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Successfully Generated
            </h3>
          </div>
        )}
      </div>
    </div>
  );
} 