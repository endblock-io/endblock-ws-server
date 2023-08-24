




const web3contract  = require('./web3Intancer')
const abi = require('../contracts/abis/jackpool.json')

const {addresses} = require('../contracts/addresses')




 
 const jackPoolData = async ( web3 ) => {

    const contract = await web3contract.getContract(abi, addresses.jackPool[process.env.CHAIN_ID], web3)
    const current = await contract.methods.current().call();


    return {
        current
    }

}



module.exports = {
    jackPoolData
}