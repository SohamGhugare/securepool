import InsurancePolicy from "../contracts/InsurancePolicy.cdc"

transaction(
    policyID: String,
    claimID: String,
    amount: UFix64,
    evidence: String
) {
    prepare(signer: AuthAccount) {
        let policy = getAccount(policyID)
            .getCapability(InsurancePolicy.PolicyPublicPath)
            .borrow<&InsurancePolicy.Policy>()
            ?? panic("Could not borrow Policy")
            
        policy.fileClaim(
            claimID: claimID,
            amount: amount,
            evidence: evidence
        )
    }
} 