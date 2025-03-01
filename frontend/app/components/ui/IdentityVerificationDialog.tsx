import { useState, useEffect } from 'react';
import { Loader2, Shield, Check, XCircle } from 'lucide-react';

interface IdentityVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  action: 'insurance' | 'staking';
}

export function IdentityVerificationDialog({ 
  isOpen, 
  onClose, 
  onVerified,
  action 
}: IdentityVerificationDialogProps) {
  const [stage, setStage] = useState<'verifying' | 'success' | 'failed'>('verifying');

  useEffect(() => {
    if (isOpen) {
      // Simulate verification process
      const timer = setTimeout(() => {
        setStage('success');
        // Auto proceed after success
        setTimeout(() => {
          onVerified();
          onClose();
        }, 1500);
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, onClose, onVerified]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        {stage === 'verifying' && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verifying Identity
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Please wait while we verify your identity for {action === 'insurance' ? 'insurance purchase' : 'staking'}
            </p>
            <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-gray-400" />
              Powered by Humanity Protocol
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Identity Verified
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Your identity has been successfully verified
            </p>
          </div>
        )}

        {stage === 'failed' && (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verification Failed
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Unable to verify your identity. Please try again.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 