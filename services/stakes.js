const web3contract  = require('./web3Intancer')
const abi = require('../contracts/abis/autopool.json')
const lottoAbi = require('../contracts/abis/lottopool.json')
const {addresses} = require('../contracts/addresses')

const chainId = process.env.CHAIN_ID;


 
 const stakesData = async (abi, address,web3) => {

    const contract = await web3contract.getContract(abi, address, web3)
    const pendingReward = await stakeContract?.methods.pendingReward(account).call();
    const userInfo = await stakeContract.methods.userInfo(account).call();


    return {

    }

}


const stakesDatas = async (web3) => {


    const response = await Promise.all(
        [
        stakesData(abi,addresses.stakes.continuosStakeEth[chainId],web3),
        stakesData(abi,addresses.stakes.continuosStakeJuice[chainId],web3),
        stakesData(abi,addresses.stakes.ContinuousStake20ETH[chainId],web3),

    ])
    return {
        continuosStakeEth:response[0],
        continuosStakeJuice:response[1],
        ContinuousStake20ETH:response[2],
    }

}

module.exports = {
    stakesDatas
}