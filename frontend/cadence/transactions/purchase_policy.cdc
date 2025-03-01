import InsurancePolicy from "../contracts/InsurancePolicy.cdc"

transaction(
    policyID: String, 
    coverage: UFix64, 
    duration: UInt64
) {
    prepare(signer: AuthAccount) {
        let policy = getAccount(policyID)
            .getCapability(InsurancePolicy.PolicyPublicPath)
            .borrow<&InsurancePolicy.Policy>()
            ?? panic("Could not borrow Policy")
            
        policy.purchase(
            buyer: signer.address,
            coverage: coverage,
            duration: duration
        )
    }
} 