'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, PartyPopper } from 'lucide-react';

interface SuccessDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessDialog({ title, message, isOpen, onClose }: SuccessDialogProps) {
  useEffect(() => {
    if (isOpen) {
      const fireConfetti = () => {
        const count = 200;
        const defaults = {
          origin: { y: 0.2 },
          gravity: 0.7,
          spread: 60,
          ticks: 300,
          startVelocity: 30,
          colors: ['#FFD700', '#FFA500', '#32CD32', '#4169E1', '#9370DB']
        };

        Promise.all([
          confetti({
            ...defaults,
            origin: { x: 0.3, y: 0.2 },
            particleCount: count / 2,
          }),
          confetti({
            ...defaults,
            origin: { x: 0.7, y: 0.2 },
            particleCount: count / 2,
          })
        ]);
      };

      fireConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 space-y-6 shadow-xl animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1.5">{message}</p>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors font-medium"
          >
            <PartyPopper className="h-4 w-4" />
            Great!
          </button>
        </div>
      </div>
    </div>
  );
} 