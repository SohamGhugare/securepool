pub contract InsurancePolicy {
    pub let PolicyStoragePath: StoragePath
    pub let PolicyPublicPath: PublicPath
    
    pub event PolicyCreated(id: String, name: String, premium: UFix64)
    pub event PolicyPurchased(id: String, buyer: Address, coverage: UFix64)
    pub event ClaimFiled(policyID: String, claimID: String, amount: UFix64)
    pub event ClaimProcessed(claimID: String, approved: Bool)
    
    pub resource Policy {
        pub let id: String
        pub let name: String
        pub var premium: UFix64
        pub var totalCoverage: UFix64
        pub var activePolicies: {Address: Coverage}
        pub var claims: {String: Claim}
        
        init(id: String, name: String, premium: UFix64) {
            self.id = id
            self.name = name
            self.premium = premium
            self.totalCoverage = 0.0
            self.activePolicies = {}
            self.claims = {}
        }
        
        pub fun purchase(buyer: Address, coverage: UFix64, duration: UInt64) {
            let newCoverage = Coverage(
                amount: coverage,
                startTime: getCurrentBlock().timestamp,
                duration: duration
            )
            
            self.activePolicies[buyer] = newCoverage
            self.totalCoverage = self.totalCoverage + coverage
            
            emit PolicyPurchased(id: self.id, buyer: buyer, coverage: coverage)
        }
        
        pub fun fileClaim(claimID: String, amount: UFix64, evidence: String) {
            let newClaim = Claim(
                id: claimID,
                amount: amount,
                evidence: evidence,
                timestamp: getCurrentBlock().timestamp
            )
            
            self.claims[claimID] = newClaim
            emit ClaimFiled(policyID: self.id, claimID: claimID, amount: amount)
        }
    }
    
    pub struct Coverage {
        pub let amount: UFix64
        pub let startTime: UFix64
        pub let duration: UInt64
        
        init(amount: UFix64, startTime: UFix64, duration: UInt64) {
            self.amount = amount
            self.startTime = startTime
            self.duration = duration
        }
    }
    
    pub struct Claim {
        pub let id: String
        pub let amount: UFix64
        pub let evidence: String
        pub let timestamp: UFix64
        pub var status: String
        
        init(id: String, amount: UFix64, evidence: String, timestamp: UFix64) {
            self.id = id
            self.amount = amount
            self.evidence = evidence
            self.timestamp = timestamp
            self.status = "Pending"
        }
    }

    init() {
        self.PolicyStoragePath = /storage/InsurancePolicy
        self.PolicyPublicPath = /public/InsurancePolicy
    }
} 