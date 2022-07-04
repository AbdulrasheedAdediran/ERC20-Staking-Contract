/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

async function deployContract() {
  const totalSupply = ethers.utils.parseEther("10000000000");
  const batContractFactory = await ethers.getContractFactory("BoredApeToken");
  const batContract = await batContractFactory.deploy(totalSupply);
  await batContract.deployed();
  console.log(`Bored Ape Token Contract Address: ${batContract.address}`);
}

deployContract()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
