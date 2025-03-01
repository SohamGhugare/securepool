import { useState } from 'react';
import { AlertCircle, Upload, X } from 'lucide-react';
import { SuccessDialog } from '../../ui/SuccessDialog';
import { ActivePolicy } from '@/app/types/insurance';

interface FileClaimFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClaimFormData) => void;
  activePolicies: ActivePolicy[];
}

export interface ClaimFormData {
  policyId: number;
  amount: number;
  description: string;
  evidenceFiles: File[];
  incidentDate: string;
}

export function FileClaimForm({ isOpen, onClose, onSubmit, activePolicies = [] }: FileClaimFormProps) {
  const [formData, setFormData] = useState<ClaimFormData>({
    policyId: 0,
    amount: 0,
    description: '',
    evidenceFiles: [],
    incidentDate: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
      setShowSuccess(true);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File a New Claim</h2>
            <p className="text-sm text-gray-600 mt-1">Please provide details about your claim</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form 
          className="p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Policy Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Select Policy
            </label>
            <select 
              className="w-full px-3 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin"
              value={formData.policyId}
              onChange={(e) => setFormData(prev => ({ ...prev, policyId: Number(e.target.value) }))}
              required
            >
              <option value="">Select a policy</option>
              {activePolicies.map(policy => (
                <option key={policy.id} value={policy.id}>
                  {policy.title} - Coverage: {policy.currentCoverage} ETH
                </option>
              ))}
            </select>
          </div>

          {/* Claim Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Claim Amount (ETH)
            </label>
            <input 
              type="number"
              step="0.000001"
              className="w-full px-3 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
              required
            />
          </div>

          {/* Incident Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Incident Date
            </label>
            <input 
              type="date"
              className="w-full px-3 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin"
              value={formData.incidentDate}
              onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Incident Description
            </label>
            <textarea 
              className="w-full px-3 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin h-32"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              placeholder="Please provide detailed information about the incident..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Evidence Files
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Drag and drop files here, or</p>
                <label className="text-sm text-bitcoin hover:text-bitcoin-hover cursor-pointer">
                  Browse files
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            {/* File List */}
            {formData.evidenceFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.evidenceFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning Note */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              Please ensure all provided information is accurate. False claims may result in policy termination.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-bitcoin to-bitcoin-hover text-white rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Submit Claim'}
            </button>
          </div>
        </form>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Claim Submitted!"
        message="Your claim has been successfully submitted."
      />
    </div>
  );
} 