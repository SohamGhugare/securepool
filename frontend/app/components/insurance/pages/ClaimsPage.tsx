import { useState } from 'react';
import { FileClaimForm } from '../claims/FileClaimForm';
import { MOCK_ACTIVE_POLICIES } from '../../../constants/insurance';
import type { ClaimFormData } from '../claims/FileClaimForm';

export function ClaimsPage() {
  const [isFilingClaim, setIsFilingClaim] = useState(false);

  return (
    <div>
      {isFilingClaim && (
        <FileClaimForm
          isOpen={isFilingClaim}
          activePolicies={MOCK_ACTIVE_POLICIES}
          onSubmit={(data: ClaimFormData) => {
            console.log('Claim submitted:', data);
            setIsFilingClaim(false);
          }}
          onClose={() => setIsFilingClaim(false)}
        />
      )}
    </div>
  );
} 