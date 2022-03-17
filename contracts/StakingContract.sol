// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;



contract StakingContract{

// Staking contract that allows Bored Ape NFT owners to stake BAT(ERC20) for 10% profit monthly
    // Must own Bored Ape NFT to qualify for staking
    // Must have BAT to qualify for staking
    // Get 10% profit if staking conditions are satisfied 
    // Must have staked for at least 3 days to get 10% profit 
    // Can only get 10% profit once in a month (30 days)


    // map each address to stake index to staked amount
    // increament profit daily for each stake/index
    // collect each stake and pull together at month end and restake profit and stakes if amount is not withdrawn
    // withdrawal should be from first stakes (first in first out approach)


   // Bored Apes Token Address
   address internal batAddress;
   // Bored Apes Yatch Club NFT Address
   address internal baycAddress;
    constructor(address _batAddress, address _baycAddress){
        batAddress = _batAddress;
        baycAddress = _baycAddress; 
    }
   struct Stake{
       uint stakedAmount;
       uint stakeTime;
       uint stakeProfit;
       bool stakeMaturity;
   }
   uint internal stakeIndex = 1;

mapping(address => mapping(uint => Stake)) public stakes;
modifier OnlyBoredApeOwners(){
    require(baycAddress.balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

    _;
}

function stake(uint _amount) public OnlyBoredApeOwners{
    Stake storage s = stakes[msg.sender][stakeIndex];
    s.stakedAmount = _amount;
    s.stakeTime = block.timestamp;
    if(s.stakeTime == block.timestamp + 3 minutes){
        s.stakeMaturity = true;
    }
    if(s.stakeMaturity){
    s.stakeProfit = (s.stakedAmount/100) * 10; 
    }
stakeIndex++;
}

}