/* eslint-disable no-process-exit */
import { expect, assert } from "chai";
import { ethers, network } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { StakingContract, BoredApeToken } from "../typechain";
const hre = require("hardhat");

describe("Staking Contract", () => {
  let stakingContractInstance: StakingContract;
  let batContractInstance: BoredApeToken;
  beforeEach(async () => {
    const [admin] = await ethers.getSigners();
    const stakingContractAddress = "0xb03093b1e073A2ad0B4fd494c2e2356370df2820";
    const boredApeTokenAddress = "0xc6E76A765Ef879Be9550ca4bDD3f82FF161FABfD";
    /// Account to impersonate:
    const baycHolder = "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39";
    const baycAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

    /// Bored Ape Yatch Club NFT contract address
    const BoredApeYachtClub = await ethers.getContractAt(
      "contracts/IERC721.sol:IERC721",
      baycAddress
    );
    stakingContractInstance = await ethers.getContractAt(
      "StakingContract",
      stakingContractAddress
    );
    batContractInstance = await ethers.getContractAt(
      "BoredApeToken",
      boredApeTokenAddress
    );

    it("Should mint Bored Ape Tokens to admin", async () => {
      const totalSupply = ethers.utils.parseEther("10000000000");
      const adminBalance = await batContractInstance.balanceOf(
        admin.toString()
      );
      console.log(`adminBalance: ${adminBalance}`);
      // console.log(`${}`);
      assert.equal(
        ethers.utils.formatUnits(adminBalance),
        totalSupply.toString()
      );
    });
    it("Account to be impersonated should own at least one Bored Ape NFT", async () => {
      const baycHolderBalance = await BoredApeYachtClub.balanceOf(baycHolder);
      console.log(`baycHolderBalance: ${baycHolderBalance}`);
      expect(Number(baycHolderBalance)).gte(1);
    });
    it("Account to be impersonated should own no Bored Ape Tokens before impersonation", async () => {
      const baycHolderBalance = await batContractInstance.balanceOf(baycHolder);
      console.log(`baycHolderBalance(BAT)${baycHolderBalance}`);

      expect(Number(baycHolderBalance)).equal(0);
    });
    /// Impersonate Bored Ape Yatch Club holder's mainnet account
    it("should impersonate baycHolder's account", async () => {
      // eslint-disable-next-line no-undef
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [baycHolder],
      });
      const signer = await ethers.getSigner(
        "0x2F8Cb25737f469A3479Dbf3cEdf428A3D9900d39"
      );
      await network.provider.send("hardhat_setBalance", [
        "0xF12D6a7c7BB3C39E948449eBD64C0AD6361bb268",
        "0x1000000000000000000000",
      ]);
      const baycHolderBalance = await BoredApeYachtClub.balanceOf(signer);
      console.log(`baycHolderBalance(BAYC-Signer)${baycHolderBalance}`);

      expect(Number(baycHolderBalance)).gte(1);
    });

    it("signer should have no stakes", async () => {
      console.log(await stakingContractInstance.viewStakeBalance());
      await expect(
        await stakingContractInstance.viewStakeBalance()
      ).to.be.revertedWith("NoActiveStakesFound");
    });
  });
});
