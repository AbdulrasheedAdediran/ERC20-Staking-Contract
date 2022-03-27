import { ethers, network } from "hardhat";

async function deployContract() {
  const [deployer] = await ethers.getSigners();
  // Account to impersonate: 0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39
  const BAYC_Holder = "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39";
  console.log("Deployer address: ", deployer.address);
  // Bored Ape Token Address
  const BAT_Address = "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE";
  // Bored Apes NFT Address
  const BAYC_Address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const BoredApeToken = await ethers.getContractAt(
    "BoredApeToken",
    BAT_Address
  );
  const BoredApeYachtClub = await ethers.getContractAt(
    "contracts/IERC721.sol:IERC721",
    BAYC_Address
  );
  const StakingContractAddress = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";
  const amountIn = 50000000;

  console.log("BAT Contract Address:", BoredApeToken.address);
  // Forked Mainnet Address: 0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE

  const StakingContract = await ethers.getContractAt(
    "StakingContract",
    StakingContractAddress
  );
  // const StakingContract = await ethers.getContractFactory("StakingContract");
  // const staking_contract = await StakingContract.deploy(interestInPercent);
  // await staking_contract.deployed();

  console.log("Staking Contract Address:", StakingContract.address);
  // Staking Contract Address: 0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE

  // console.log(
  //   "Deployer's BAT Balance: ",
  //   await BoredApeToken.balanceOf(deployer.address)
  // );
  // console.log(`My BAT mainnet balance is ${await ethers.provider.getBalance(deployer.address)}`);

  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [BAYC_Holder],
  });

  const signer = await ethers.getSigner(
    "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39"
  );
  await network.provider.send("hardhat_setBalance", [
    "0xe66904a5318f27880bf1d20D77Ffa8FBdaC5E5E7",
    "0x1000000000000000000000",
  ]);
  // console.log(`Pranked user's BAT Balance Before Drop: ${await BoredApeToken.balanceOf(BAYC_Holder)}`)
  console.log(
    `Pranked user's BAYC Balance: ${await BoredApeYachtClub.balanceOf(
      BAYC_Holder
    )}`
  );

  console.log(
    `Transferring ${amountIn} BAT to pranked user${await BoredApeToken.transfer(
      BAYC_Holder,
      amountIn
    )}`
  );

  // console.log("Deployer's BAT Balance After Drop: ", await BoredApeToken.balanceOf(deployer.address));

  console.log(
    `Pranked user's BAT Balance After Drop: ${await BoredApeToken.balanceOf(
      BAYC_Holder
    )}`
  );

  console.log(
    `Pranked user's BAT Balance Before Stake: ${await BoredApeToken.balanceOf(
      BAYC_Holder
    )}`
  );

  console.log(
    `Pranked User Granting Approval to stake 10000000... ${await BoredApeToken.connect(
      signer
    ).approve(StakingContractAddress, 10000000)}`
  );
  console.log(
    `Pranked User Staking 10000000 ${await StakingContract.connect(
      signer
    ).stake(10000000)}`
  );

  console.log(
    `Pranked User's BAT Balance After Stake: ${await BoredApeToken.balanceOf(
      BAYC_Holder
    )}`
  );

  console.log(
    `Pranked user's Stake Balance: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );

  await ethers.provider.send("evm_increaseTime", [259500]);
  await network.provider.send("evm_mine");
  console.log(
    `Pranked User's BAT Balance After Jumping Time: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );

  console.log(
    `Withdrawing 280000: ${await StakingContract.connect(signer).withdraw(
      1000000
    )}`
  );

  console.log(
    `Pranked user's Stake Balance After Withdrawal: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );
  console.log(
    `Pranked User's BAT Balance After Withdrawal: ${await BoredApeToken.balanceOf(
      BAYC_Holder
    )}`
  );
}

deployContract().catch((error) => {
  console.error(error);
  process.exit(1);
});
