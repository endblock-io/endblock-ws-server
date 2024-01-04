const web3contract = require("./web3Intancer");
// const abi = require("../contracts/v4/abis/AutoPOOLEND.json");
// const abi = require("../contracts/v4/abis/AutoPOOLENDRND.json");
const abi = require("../contracts/v4/abis/AutoPOOLENDCL.json");


const { addresses } = require("../contracts/v4/addresses");

const chainId = process.env.CHAIN_ID;

const autoPoolData = async (abi, address, web3) => {

  const contract = await web3contract.getContract(abi, address, web3);
  const currentValues = await contract.methods.getCurrentValues().call();
  const current = await contract.methods.current().call();
  const previousRoundResponse = await contract.methods
    .getPreviousRound()
    .call();
  const config = await contract.methods.config().call();
  const isLock = await contract.methods.isLocked().call();

  return {
    currentValues: {
      fee: currentValues.fee?.toString(),
      rewards: currentValues.rewards?.map((e) => e.toString()) || [],
      status: currentValues.status?.toString(),
      lastAccount: currentValues.lastAccount?.toString(),
      blLeft: currentValues.blLeft?.toString(),
      blLeftDistr: currentValues.blLeftDistr?.toString(),
      reward: currentValues.reward?.toString(),
      nextFund: currentValues.nextFund?.toString(),
      net: currentValues.net?.toString(),
      stake: currentValues.stake?.toString(),
    },
    current: {
      last_account: current.last_account?.toString(),
      initBlock: current.initBlock?.toString(),
      initBlockDistr: current.initBlockDistr?.toString(),
      last_tokenId: current.last_tokenId?.toString(),
      first_tokenId: current.first_tokenId?.toString(),
      currentPoolAmount: current.currentPoolAmount?.toString(),
    },
    PreviousRoundResponse: {
      net: previousRoundResponse.net?.toString() || "",
      nextFund: previousRoundResponse.nextFund?.toString() || "",
      rewards: previousRoundResponse.rewards?.map((e) => e.toString()) || [],
      lastAccount: previousRoundResponse.lastAccount,
      reward: previousRoundResponse.reward?.toString() || "",
      winTickets:
        previousRoundResponse?.winTickets?.map((e) => e.toString()) || [],
      winners: previousRoundResponse?.winners || [],
    },
    config: {
      blockDelayQty: config.blockDelayQty?.toString() || "",
      blockDelayQtyDistr: config.blockDelayQtyDistr?.toString() || "",
      weiAmount: config.weiAmount?.toString() || "",
      baseLimit: config.baseLimit?.toString() || "",
      factor: config.factor?.toString() || "",
      nextFundRate: config.nextFundRate?.toString() || "",
      affiliateRate: config.affiliateRate?.toString() || "",
      feeRate: config.feeRate?.toString() || "",
      stakeRate: config.stakeRate?.toString() || "",
      strewRate: config.strewRate?.toString() || "",
      rateQty: config.rateQty?.toString() || "",
    },
    isLock: isLock,
  };
};
const jackpoolData = async (abi, address, web3) => {

  const contract = await web3contract.getContract(abi, address, web3);

const current = await contract.methods.current().call()


return {
    currentPaAmount: current.currentPaAmount.toString(),
    currentPbAmount: current.currentPbAmount.toString(),
    currentPcAmount: current.currentPcAmount.toString()
}
};

const calcJackPOOLData = async (abi, address, web3) => {

    const contract = await web3contract.getContract(abi, address, web3);
// const config = await contract.methods.config().call()
    const pooles = await contract.methods.getPOOLES().call()
// const getProbRates = await contract.methods.getProbRates().call()
// console.log(getProbRates)

    return {
        pa: pooles.pa.toString(),
        pb: pooles.pb.toString(),
        pc: pooles.pc.toString(),
        pd: pooles.pd.toString()
    }
};



const autoPoolsAllData = async (web3) => {
  const response = await Promise.all([
    // autoPoolData(abi, addresses.autoPools.AutoPOOL1[chainId], web3),
    autoPoolData(abi, addresses.autoPools.AutoPOOL2[chainId], web3),
    autoPoolData(abi, addresses.autoPools.AutoPOOL3[chainId], web3),
    autoPoolData(abi, addresses.autoPools.AutoPOOL4[chainId], web3),
    autoPoolData(abi, addresses.autoPools.AutoPOOL5[chainId], web3),
  ]);

  return {
    // AutoPOOL1: response[0],
    AutoPOOL2: response[0],
    AutoPOOL3: response[1],
    AutoPOOL4: response[2],
    AutoPOOL5: response[3],
  };
};

module.exports = {
  autoPoolsAllData,
};
