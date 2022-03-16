import { ethers } from "hardhat";

async function deployContract() {

    const ETH_USD = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
    const TokenMarket = await ethers.getContractFactory("TokenMarket");
    const token_market = await TokenMarket.deploy(ETH_USD);
    await token_market.deployed();

    console.log("Contract deployed to ", token_market.address);
    

    const latestPrice = await token_market.getLatestPrice();
    const precision = 8;
    const amountUSDT = 7500;
    const amountETH = 2;
    const EthToUsd = await token_market.swapEthToUsd(amountETH, precision);
    const UsdToEth = await token_market.swapUsdToEth(amountUSDT, precision)
      
    
    // Get latest price
    console.log(`Latest Price for ETH/USD pair is ${latestPrice}`);
    // Value of ETH in USD
    console.log(`Current value of ${amountETH}ETH in USD is ${parseInt(EthToUsd.toString()) / 10 ** precision}USD`);
    // Value of USD in ETH
    console.log(`Current value of ${amountUSDT}USD to ETH is ${parseInt(UsdToEth.toString())/10**precision}ETH`);


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });