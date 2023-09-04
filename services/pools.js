




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
            st: {
                net: previousRoundResponse.st.net?.toString() || '' ,
                nextFund: previousRoundResponse.st.nextFund?.toString() || '',
                rewards: previousRoundResponse.st.rewards?.map(e => e.toString()) || [],
                lastAccount: previousRoundResponse.st.lastAccount,
                reward: previousRoundResponse.st.reward?.toString() || '',
            },
            winTickets: previousRoundResponse?.winTickets || [],
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
        poolData(abi,addresses.autoPools.autoPool1[chainId],web3),
        poolData(abi,addresses.autoPools.autoPool2[chainId],web3),
        poolData(abi,addresses.autoPools.autoPool3[chainId],web3),
        poolData(lottoAbi,addresses.lottoPool[chainId],web3),
    ])
    return {
        pool1:response[0],
        pool2:response[1],
        pool3:response[2],
        lottoPool:response[3],
    }

}

module.exports = {
    poolDatas
}