/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

async function deployContract() {
  const adminAccount = "0xF12D6a7c7BB3C39E948449eBD64C0AD6361bb268";
  // Bored Ape Token Address
  const batAddress = "0xc6E76A765Ef879Be9550ca4bDD3f82FF161FABfD";

  // Bored Apes NFT Address
  const baycAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  // const adminAccount = "0xF12D6a7c7BB3C39E948449eBD64C0AD6361bb268";
  const [deployer] = await ethers.getSigners();

  // Account to impersonate: 0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39
  // const baycHolder = "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39";
  console.log("Deployer address: ", deployer.address);

  const stakingContractFactory = await ethers.getContractFactory(
    "StakingContract"
  );
  // Staking contract address: 0xb03093b1e073A2ad0B4fd494c2e2356370df2820
  const stakingContract = await stakingContractFactory.deploy(
    batAddress,
    baycAddress
  );
  await stakingContract.deployed();

  const batContractInstance = await ethers.getContractAt(
    "BoredApeToken",
    batAddress
  );

  console.log("Deployer's Address:", deployer.address);
  console.log("Staking Contract Address:", stakingContract.address);

  console.log(
    "Deployer's BAT Balance: ",
    await batContractInstance.balanceOf(deployer.address)
  );
  console.log(
    `Deployer's BAT mainnet balance is ${await ethers.provider.getBalance(
      deployer.address
    )}`
  );
  console.log(
    `Admin's BAT mainnet balance is ${await ethers.provider.getBalance(
      adminAccount
    )}`
  );
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
