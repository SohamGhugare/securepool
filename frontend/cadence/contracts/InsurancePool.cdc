pub contract InsurancePool {
    // Storage paths
    pub let PoolStoragePath: StoragePath
    pub let PoolPublicPath: PublicPath
    
    // Events
    pub event PoolCreated(poolID: UInt64, name: String, minStake: UFix64, maxStake: UFix64)
    pub event StakeDeposited(poolID: UInt64, staker: Address, amount: UFix64)
    pub event RewardsClaimed(poolID: UInt64, staker: Address, amount: UFix64)
    
    // Main pool resource
    pub resource Pool {
        pub let id: UInt64
        pub let name: String
        pub var totalStaked: UFix64
        pub var minStake: UFix64
        pub var maxStake: UFix64
        pub var lockupPeriod: UInt64
        pub var apy: UFix64
        access(contract) var stakes: @{Address: Stake}
        
        init(
            id: UInt64,
            name: String,
            minStake: UFix64,
            maxStake: UFix64,
            lockupPeriod: UInt64,
            apy: UFix64
        ) {
            self.id = id
            self.name = name
            self.totalStaked = 0.0
            self.minStake = minStake
            self.maxStake = maxStake
            self.lockupPeriod = lockupPeriod
            self.apy = apy
            self.stakes <- {}
        }

        pub fun deposit(amount: UFix64, staker: Address) {
            pre {
                amount >= self.minStake: "Stake amount too low"
                amount <= self.maxStake: "Stake amount too high"
            }
            
            self.totalStaked = self.totalStaked + amount
            
            let newStake <- create Stake(
                amount: amount,
                timestamp: getCurrentBlock().timestamp,
                lockupPeriod: self.lockupPeriod
            )
            
            self.stakes[staker] <-! newStake
            
            emit StakeDeposited(poolID: self.id, staker: staker, amount: amount)
        }
    }

    pub resource Stake {
        pub let amount: UFix64
        pub let timestamp: UFix64
        pub let lockupPeriod: UInt64
        
        init(amount: UFix64, timestamp: UFix64, lockupPeriod: UInt64) {
            self.amount = amount
            self.timestamp = timestamp
            self.lockupPeriod = lockupPeriod
        }
    }

    init() {
        self.PoolStoragePath = /storage/InsurancePool
        self.PoolPublicPath = /public/InsurancePool
    }
} 