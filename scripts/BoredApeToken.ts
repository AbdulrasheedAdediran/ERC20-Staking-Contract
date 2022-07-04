import { ethers } from "hardhat";

async function deployContract() {
  const totalSupply = ethers.utils.parseEther("10000000000");
  const adminAccount = process.env.ADMIN;

  const BATContractFactory = await ethers.getContractFactory("BoredApeToken");
  const BATContract = await BATContractFactory.deploy(
    adminAccount,
    totalSupply
  );
  await BATContract.deployed();
  console.log(`Bored Ape Token Contract Address: ${BATContract.address}`);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const deployedStakingContract = await StakingContract.deploy();
  await deployedStakingContract.deployed();

  console.log("Staking Contract Address:", deployedStakingContract.address);
}

deployContract().catch((error) => {
  console.error(error);
  throw new Error(error);
  // process.exit(1);
});

// const {
//   DefenderRelaySigner,
//   DefenderRelayProvider,
// } = require("defender-relay-client/lib/ethers");
// const { ethers } = require("ethers");

// const credentials = { apiKey: YOUR_API_KEY, apiSecret: YOUR_API_SECRET };
// const provider = new DefenderRelayProvider(credentials);
// const signer = new DefenderRelaySigner(credentials, provider, {
//   speed: "fast",
// });

// const erc20 = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
// const tx = await erc20.transfer(beneficiary, (1e18).toString());
// const mined = await tx.wait();
