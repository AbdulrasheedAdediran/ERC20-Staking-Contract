import { ethers } from "hardhat";

async function deployContract() {

    const BoredApeToken = await ethers.getContractFactory("BoredApeToken");
    const bored_ape_token = await BoredApeToken.deploy("Bored Ape Token", "BAT");
    await bored_ape_token.deployed();

    console.log("BAT Contract Address:", bored_ape_token.address);
    // BAT Contract Address Rinkeby: 0x234d11e2382C47283FBBBE42835676058009BF18
    


}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });