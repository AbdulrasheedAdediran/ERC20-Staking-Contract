import { ethers, network } from "hardhat";

async function deployContract() {
const interestInPercent = 10;
  const [deployer] = await ethers.getSigners();
  // Account to impersonate: 0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39
  const BAYC_Holder = "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39"
  console.log("Deployer address: ", deployer.address);
  // Bored Ape Token Address
  const BAT_Address = "0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc";
  // Bored Apes NFT Address
  const BAYC_Address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const BoredApeToken = await ethers.getContractAt("BoredApeToken", BAT_Address);
  const BoredApeYachtClub = await ethers.getContractAt("contracts/IERC721.sol:IERC721", BAYC_Address);
  const StakingContractAddress = "0x66F625B8c4c635af8b74ECe2d7eD0D58b4af3C3d"
  const amountIn = 50000000;
  
  console.log("BAT Contract Address:", BoredApeToken.address);
  // Forked Mainnet Address: 0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc
  
  const StakingContract = await ethers.getContractAt("StakingContract", StakingContractAddress);
  // const StakingContract = await ethers.getContractFactory("StakingContract");
  // const staking_contract = await StakingContract.deploy(interestInPercent);
  // await staking_contract.deployed();
  
  console.log("Staking Contract Address:", StakingContract.address);
  // Staking Contract Address: 0x66F625B8c4c635af8b74ECe2d7eD0D58b4af3C3d
  
  console.log("Deployer's BAT Balance: ", await BoredApeToken.balanceOf(deployer.address));
  // console.log(`My BAT mainnet balance is ${await ethers.provider.getBalance(deployer.address)}`);
  
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [BAYC_Holder],
  });
  
  const signer = await ethers.getSigner("0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39");
  
  // console.log(`Pranked user's BAT Balance Before Drop: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)
  console.log(`Pranked user's BAYC Balance: ${await BoredApeYachtClub.balanceOf(BAYC_Holder)}`)
  
  // console.log(`Transferring ${amountIn} BAT to pranked user${await BoredApeToken.transfer(BAYC_Holder, amountIn)}`)
  
  // console.log("Deployer's BAT Balance After Drop: ", await BoredApeToken.balanceOf(deployer.address));
  
  // console.log(`Pranked user's BAT Balance After Drop: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)
  
  // console.log(`Pranked user's BAT Balance Before Stake: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)
  
  // console.log(`Pranked User Granting Approval to stake 10000000... ${await BoredApeToken.connect(signer).approve(StakingContractAddress, 10000000)}`);
  // console.log(`Pranked User Staking 10000000 ${await StakingContract.connect(signer).stake(10000000)}`);
  
  
  // console.log(`Pranked User's BAT Balance After Stake: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)
  // console.log(`Pranked User's Stakes: ${await StakingContract.connect(signer).viewStakes()}`);
  
  console.log(`Pranked user's Stake Balance: ${await StakingContract.connect(signer).viewStakeBalance()}`)
  
  await network.provider.send("evm_increaseTime", [180]);
  
  // console.log(`Withdrawing 10000000: ${await StakingContract.connect(signer).withdraw(10000000)}`);
  
  // console.log(`Pranked user's Stake Balance After Withdrawal: ${await StakingContract.connect(signer).viewStakeBalance()}`)
  // console.log(`Pranked User's BAT Balance After Withdrawal: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)

}

deployContract().catch((error) => {
      console.error(error);
      process.exit(1);
    });