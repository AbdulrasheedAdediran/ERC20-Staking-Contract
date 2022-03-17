import { ethers } from "hardhat";

async function deployContract() {

    const BoredApeToken = await ethers.getContractFactory("BoredApeToken");
    const bored_ape_token = await BoredApeToken.deploy("Bored Ape Token", "BAT");
    await bored_ape_token.deployed();

    console.log("BAT Contract Address:", bored_ape_token.address);
    // BAT Contract Address: 0x40a42Baf86Fc821f972Ad2aC878729063CeEF403
    


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });