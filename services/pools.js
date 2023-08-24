




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
            lastAccount:currentValues.lastAccount,
            blLeft:currentValues.blLeft,
            blLeftDistr:currentValues.blLeftDistr,
            reward:currentValues.reward,
            nextFund:currentValues.nextFund,
        },
        current:{
            last_account:current.last_account, 
            initBlock:current.initBlock, 
            initBlockDistr:current.initBlockDistr, 
            last_tokenId:current.last_tokenId, 
            first_tokenId:current.first_tokenId, 
            currentPoolAmount:current.currentPoolAmount,
        },
        PreviousRoundResponse: {
            ...previousRoundResponse
        },
        config:{
        ...config
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