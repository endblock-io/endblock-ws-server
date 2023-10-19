




const web3contract  = require('./web3Intancer')
const abi = require('../contracts/abis/autopool.json')
const lottoAbi = require('../contracts/abis/lottopool.json')
const {addresses} = require('../contracts/addresses')

const chainId = process.env.CHAIN_ID;


 
 const poolData = async (abi, address,web3) => {

    const contract = await web3contract.getContract(abi, address, web3)
    const currentValues = await contract.methods.getCurrentValues().call()
    const current = await contract.methods.current().call();
    const previousRoundResponse = await contract.methods.getPreviousRound().call();
    const config = await contract.methods.config().call();
    const isLock = await contract.methods.isLocked().call();

    return {
        currentValues:{
            fee: currentValues.fee?.toString(),
            rewards: currentValues.rewards?.map(e => e.toString()) || [],
            status: currentValues.status?.toString(),
            lastAccount:currentValues.lastAccount?.toString(),
            blLeft:currentValues.blLeft?.toString(),
            blLeftDistr:currentValues.blLeftDistr?.toString(),
            reward:currentValues.reward?.toString(),
            nextFund:currentValues.nextFund?.toString(),
            net:currentValues.net?.toString(),
            stake:currentValues.stake?.toString(),

        },
        current:{
            last_account:current.last_account?.toString(), 
            initBlock:current.initBlock?.toString(), 
            initBlockDistr:current.initBlockDistr?.toString(), 
            last_tokenId:current.last_tokenId?.toString(), 
            first_tokenId:current.first_tokenId?.toString(), 
            currentPoolAmount:current.currentPoolAmount?.toString(),
        },
        PreviousRoundResponse: {
            net: previousRoundResponse.net?.toString() || '' ,
            nextFund: previousRoundResponse.nextFund?.toString() || '',
            rewards: previousRoundResponse.rewards?.map(e => e.toString()) || [],
            lastAccount: previousRoundResponse.lastAccount,
            reward: previousRoundResponse.reward?.toString() || '',
            winTickets: previousRoundResponse?.winTickets?.map(e => e.toString()) || [],
            winners: previousRoundResponse?.winners || []
        },
        config:{
            blockDelayQty: config.blockDelayQty?.toString() || '',
            blockDelayQtyDistr: config.blockDelayQtyDistr?.toString() || '',
            weiAmount: config.weiAmount?.toString() || '',
            baseLimit: config.baseLimit?.toString() || '',
            factor: config.factor?.toString() || '',
            nextFundRate: config.nextFundRate?.toString() || '',
            affiliateRate: config.affiliateRate?.toString() || '',
            feeRate: config.feeRate?.toString() || '',
            stakeRate: config.stakeRate?.toString() || '',
            strewRate: config.strewRate?.toString() || '',
            rateQty: config.rateQty?.toString() || '',
        },
        isLock:isLock,
    }

}


const poolDatas = async (web3) => {


    const response = await Promise.all(
        [
        poolData(abi,addresses.autoPools.autoPOOL1v5[chainId],web3),
        poolData(abi,addresses.autoPools.autoPOOL2v5[chainId],web3),
        poolData(abi,addresses.autoPools.autoPOOL3v5[chainId],web3),
        poolData(abi,addresses.autoPools.autoPOOL4v5[chainId],web3),
        poolData(abi,addresses.autoPools.autoPOOL5v5[chainId],web3),
        poolData(lottoAbi,addresses.lottoPool[chainId],web3),
    ])
    return {
        autoPOOL1v5:response[0],
        autoPOOL2v5:response[1],
        autoPOOL3v5:response[2],
        autoPOOL4v5:response[3],
        autoPOOL5v5:response[4],
        lottoPool:response[5],
    }

}

module.exports = {
    poolDatas
}