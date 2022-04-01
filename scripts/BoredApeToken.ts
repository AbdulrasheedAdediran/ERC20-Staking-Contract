import { ethers } from "hardhat";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

async function deployContract() {
  // const BoredApeToken = await ethers.getContractFactory("BoredApeToken");
  // const bored_ape_token = await BoredApeToken.deploy("Bored Ape Token", "BAT");
  // await bored_ape_token.deployed();
  // console.log("Staking Contract Address:", bored_ape_token.address);

  // console.log("BAT Contract Address:", bored_ape_token.address);
  // BAT Contract Address Rinkeby: 0x234d11e2382C47283FBBBE42835676058009BF18
  // Forked Mainnet Address: 0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const staking_contract = await StakingContract.deploy();
  await staking_contract.deployed();

  console.log("Staking Contract Address:", staking_contract.address);
}

deployContract().catch((error) => {
  console.error(error);
  process.exit(1);
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
