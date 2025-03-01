# DeFi Insurance Platform

## Overview
A decentralized insurance platform built on Flow blockchain, offering protection against crypto-related risks like exchange hacks, smart contract failures, and wallet compromises. The platform integrates with Flow for wallet management and Humanity Protocol for identity verification.

## Technical Stack
- Next.js + TypeScript
- Flow Blockchain + Cadence Smart Contracts
- Humanity Protocol for Identity Verification
- TailwindCSS for styling

## Smart Contracts
The platform uses two main Cadence smart contracts:

### InsurancePool.cdc
Manages staking pools where users can provide liquidity:
- Stake management
- APY calculations
- Lockup periods
- Rewards distribution

### InsurancePolicy.cdc
Handles insurance policies and claims:
- Policy creation and management
- Claims processing
- Coverage tracking
- Premium calculations

## Flow Integration

### Wallet Connection
```typescript
import { fcl } from "@onflow/fcl";

// Configure FCL
fcl.config({
  "app.detail.title": "DeFi Insurance",
  "app.detail.icon": "https://your-insurance-app.com/icon.png",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
})

// Connect wallet
const connectWallet = async () => {
  const user = await fcl.authenticate();
  return user.addr;
}

// Disconnect wallet
const disconnectWallet = () => {
  fcl.unauthenticate();
}
```

### Transaction Execution
```typescript
// Purchase insurance policy
const purchasePolicy = async (policyId: string, coverage: number, duration: number) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import InsurancePolicy from 0xInsurance
      
      transaction(policyId: String, coverage: UFix64, duration: UInt64) {
        prepare(signer: AuthAccount) {
          let policy = getAccount(policyId)
            .getCapability(/public/InsurancePolicy)
            .borrow<&InsurancePolicy.Policy>()
            ?? panic("Could not borrow Policy")
            
          policy.purchase(
            buyer: signer.address,
            coverage: coverage,
            duration: duration
          )
        }
      }
    `,
    args: (arg, t) => [
      arg(policyId, t.String),
      arg(coverage.toFixed(8), t.UFix64),
      arg(duration, t.UInt64)
    ],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz]
  });
  
  return fcl.tx(transactionId).onceSealed();
}
```

## Humanity Protocol Integration

### Identity Verification
```typescript
import { HumanityProtocol } from "@humanity-protocol/sdk";

const humanityProtocol = new HumanityProtocol({
  network: "testnet",
  apiKey: process.env.HUMANITY_API_KEY
});

// Verify user identity
const verifyIdentity = async (address: string) => {
  try {
    const verification = await humanityProtocol.verify({
      address: address,
      requiredCredentials: ["KYC", "PROOF_OF_HUMANITY"]
    });
    
    return verification.status === "VERIFIED";
  } catch (error) {
    console.error("Identity verification failed:", error);
    return false;
  }
}

// Check verification status
const checkVerificationStatus = async (address: string) => {
  const status = await humanityProtocol.getVerificationStatus(address);
  return status;
}
```

## Setup & Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```env
NEXT_PUBLIC_FLOW_NETWORK=testnet
NEXT_PUBLIC_INSURANCE_CONTRACT_ADDRESS=0xYourContractAddress
HUMANITY_API_KEY=your_api_key
```

3. Deploy Cadence contracts:
```bash
flow project deploy --network=testnet
```

4. Run development server:
```bash
npm run dev
```

## Smart Contract Deployment

1. Deploy InsurancePool contract:
```bash
flow accounts add-contract InsurancePool ./cadence/contracts/InsurancePool.cdc
```

2. Deploy InsurancePolicy contract:
```bash
flow accounts add-contract InsurancePolicy ./cadence/contracts/InsurancePolicy.cdc
```

## Security Considerations
- All smart contracts should be audited before mainnet deployment
- Implement rate limiting for claims
- Use secure random number generation for policy IDs
- Implement proper access control in smart contracts
- Regular security updates and monitoring

## Testing
Run contract tests:
```bash
flow test ./cadence/tests
```
