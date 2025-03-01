import InsurancePool from "../contracts/InsurancePool.cdc"

transaction(poolID: UInt64, amount: UFix64) {
    prepare(signer: AuthAccount) {
        let pool = getAccount(poolID)
            .getCapability(InsurancePool.PoolPublicPath)
            .borrow<&InsurancePool.Pool>()
            ?? panic("Could not borrow Pool")
            
        pool.deposit(amount: amount, staker: signer.address)
    }
} 