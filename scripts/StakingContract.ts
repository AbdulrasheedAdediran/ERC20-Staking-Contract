import { ethers } from "hardhat";

async function deployContract() {
  // Bored Apes NFT Address
    const BAYC_Address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  // Bored Ape Token Address
    const BAT_Address = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";
    const StakingContract = await ethers.getContractFactory("StakingContract");
    const staking_contract = await StakingContract.deploy("Bored Ape Token", "BAT");
    await staking_contract.deployed();
    
    console.log("Contract deployed to:", staking_contract.address);
 


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });