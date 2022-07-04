import { ethers, network } from "hardhat";

async function deployContract() {
  const adminAccount = process.env.ADMIN;
  const [deployer] = await ethers.getSigners();
  // Account to impersonate: 0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39
  const baycHolder = "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39";
  console.log("Deployer address: ", deployer.address);
  // Bored Ape Token Address
  const batAddress = "0xB2b580ce436E6F77A5713D80887e14788Ef49c9A";
  // Bored Apes NFT Address
  const baycAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const batContractInstance = await ethers.getContractAt(
    "batContractInstance",
    batAddress
  );
  const BoredApeYachtClub = await ethers.getContractAt(
    "contracts/IERC721.sol:IERC721",
    baycAddress
  );
  const StakingContractAddress = "0x70bDA08DBe07363968e9EE53d899dFE48560605B";
  const amountIn = 100000;
  const amountInContract = 1000000;

  console.log("BAT Contract Address:", batContractInstance.address);
  // Forked Mainnet Address: 0xB2b580ce436E6F77A5713D80887e14788Ef49c9A

  const StakingContract = await ethers.getContractAt(
    "StakingContract",
    StakingContractAddress
  );
  // const StakingContract = await ethers.getContractFactory("StakingContract");
  // const staking_contract = await StakingContract.deploy(interestInPercent);
  // await staking_contract.deployed();

  console.log("Deployer's Address:", deployer.address);
  console.log("Staking Contract Address:", StakingContract.address);
  // Staking Contract Address: 0x70bDA08DBe07363968e9EE53d899dFE48560605B

  // console.log(
  //   "Deployer's BAT Balance: ",
  //   await batContractInstance.balanceOf(deployer.address)
  // );
  console.log(
    `Deployer's BAT mainnet balance is ${await ethers.provider.getBalance(
      deployer.address
    )}`
  );
  // console.log(
  //   `Admin's BAT mainnet balance is ${await ethers.provider.getBalance(
  //     adminAccount
  //   )}`
  // );

  // @ts-ignore
  // eslint-disable-next-line no-undef
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [baycHolder],
  });

  const signer = await ethers.getSigner(
    "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39"
  );
  // await network.provider.send("hardhat_setBalance", [
  //   "0xe66904a5318f27880bf1d20D77Ffa8FBdaC5E5E7",
  //   "0x1000000000000000000000",
  // ]);
  // console.log(`Pranked user's BAT Balance Before Drop: ${await batContractInstance.balanceOf(baycHolder)}`)
  console.log("Signer after impersonation: ", signer.address);
  console.log(
    `Pranked user's BAYC Balance: ${await BoredApeYachtClub.balanceOf(
      baycHolder
    )}`
  );

  // console.log(
  //   `Transferring ${amountIn} BAT to pranked user${await batContractInstance.transfer(
  //     baycHolder,
  //     amountIn
  //   )}`
  // );
  console.log(
    `Transferring ${amountInContract} BAT to Staking Contract ${await batContractInstance.transfer(
      StakingContract.address,
      amountInContract
    )}`
  );

  console.log(
    "Deployer's BAT Balance After Drop: ",
    await batContractInstance.balanceOf(deployer.address)
  );

  // console.log(
  //   `Pranked user's BAT Balance After Drop: ${await batContractInstance.balanceOf(
  //     baycHolder
  //   )}`
  // );

  console.log(
    `Pranked user's BAT Balance Before Stake: ${await batContractInstance.balanceOf(
      baycHolder
    )}`
  );

  console.log(
    `Pranked User Granting Approval to stake 100000... ${await batContractInstance
      .connect(signer)
      .approve(StakingContractAddress, 100000)}`
  );
  console.log(
    `Pranked User Staking 100000 ${await StakingContract.connect(signer).stake(
      100000
    )}`
  );

  console.log(
    `Pranked User's BAT Balance After Stake: ${await batContractInstance.balanceOf(
      baycHolder
    )}`
  );

  console.log(
    `Pranked User's Stake Balance Before Jumping Time: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );

  await network.provider.send("evm_increaseTime", [259200000]);
  await network.provider.send("evm_mine");

  console.log(
    `Pranked User's Stake Balance After Jumping Time: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );

  console.log(
    `Withdrawing 100020: ${await StakingContract.connect(signer).withdraw(
      1000
    )}`
  );

  console.log(
    `Pranked User's Stake Balance After Withdrawal: ${await StakingContract.connect(
      signer
    ).viewStakeBalance()}`
  );
  console.log(
    `Pranked User's BAT Balance After Withdrawal: ${await batContractInstance.balanceOf(
      baycHolder
    )}`
  );
}

deployContract()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
