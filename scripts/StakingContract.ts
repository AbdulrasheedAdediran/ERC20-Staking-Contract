import { ethers } from "hardhat";

async function deployContract() {

    const BoredApeToken = await ethers.getContractFactory("BoredApeToken");
    const bored_ape_token = await BoredApeToken.deploy("Bored Ape Token", "BAT");
    await bored_ape_token.deployed();

    console.log("Contract deployed to:", bored_ape_token.address);
    


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });