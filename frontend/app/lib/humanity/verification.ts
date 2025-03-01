import { ethers } from 'ethers';

type VerificationLevel = 'BASIC' | 'ADVANCED' | 'PREMIUM';

interface VerificationStatus {
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
  level: VerificationLevel;
  confidence: number;
  expiresAt: string;
  verificationId: string;
}

export class HumanityVerification {
  private readonly apiEndpoint: string;
  private readonly apiKey: string;
  private readonly VERIFICATION_THRESHOLD = 0.85;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiEndpoint = 'https://api.humanity.protocol/v1';
  }

  async generateProof(address: string): Promise<string> {
    const message = `Verify identity for ${address} at ${Date.now()}`;
    const signature = await this.signMessage(message);
    return ethers.keccak256(ethers.toUtf8Bytes(message + signature));
  }

  async verifyIdentity(address: string): Promise<VerificationStatus> {
    try {
      const proof = await this.generateProof(address);
      
      const response = await fetch(`${this.apiEndpoint}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          address,
          proof,
          requiredCredentials: [
            'PROOF_OF_HUMANITY',
            'SYBIL_RESISTANCE',
            'UNIQUE_IDENTITY'
          ],
          minConfidence: this.VERIFICATION_THRESHOLD
        })
      });

      if (!response.ok) {
        throw new Error('Verification request failed');
      }

      const verification = await response.json();
      return {
        status: verification.status,
        level: verification.level,
        confidence: verification.confidence,
        expiresAt: verification.expiresAt,
        verificationId: verification.id
      };
    } catch (error) {
      console.error('Humanity verification failed:', error);
      throw new Error('Identity verification failed');
    }
  }

  async checkVerificationStatus(verificationId: string): Promise<{
    isValid: boolean;
    level: VerificationLevel;
    lastVerified: Date;
  }> {
    const response = await fetch(
      `${this.apiEndpoint}/verifications/${verificationId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to check verification status');
    }

    const status = await response.json();
    return {
      isValid: status.isValid,
      level: status.level,
      lastVerified: new Date(status.lastVerified)
    };
  }

  private async signMessage(message: string): Promise<string> {
    return ethers.keccak256(ethers.toUtf8Bytes(message + Date.now().toString()));
  }
}

export const createHumanityClient = (apiKey: string) => {
  return new HumanityVerification(apiKey);
};

