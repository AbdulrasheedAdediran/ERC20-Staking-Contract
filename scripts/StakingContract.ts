import { ethers } from "hardhat";

async function deployContract() {
  const maturityPeriod = await ethers.provider.send("evm_increaseTime", [180]);
  const interestInPercent = 10;
  // Bored Apes NFT Address
  const BAYC_Address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  // Bored Ape Token Address
  const BoredApeToken = await ethers.getContractAt("BoredApeToken", "0x234d11e2382C47283FBBBE42835676058009BF18");
    
  console.log("BAT Contract Address:", BoredApeToken.address);
  // BAT Contract Address Rinkeby: 0x234d11e2382C47283FBBBE42835676058009BF18
  
  const StakingContract = await ethers.getContractFactory("StakingContract");
  const staking_contract = await StakingContract.deploy(maturityPeriod, interestInPercent);
  await staking_contract.deployed();
  
  console.log("Staking Contract Address:", staking_contract.address);
  // Staking Contract Address: 
 


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });