// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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
   address batAddress;
   // Bored Apes Yatch Club NFT Address

    constructor(address _batAddress){
        batAddress = _batAddress; 
    }
   struct Stake{
       uint[] stakes;
       uint stakeTime;
       uint stakedBalance;
       bool stakeMaturity;
       uint stakeProfit;
   }
uint stakeIndex = 0;
uint maturityPeriod = 3 minutes;
uint interestRate = 10;
address baycAddress = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;
IERC721 boredApeYatchToken = IERC721(baycAddress);
mapping(address => mapping(uint => Stake)) public addressStakesToIndex;
modifier OnlyBoredApeOwners(){
    require(boredApeYatchToken.balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

    _;
}

function stake(uint _amount) public OnlyBoredApeOwners{
    Stake storage s = addressStakesToIndex[msg.sender][stakeIndex];
    s.stakeTime = block.timestamp;
    s.stakes = s.stakes.push(_amount);
    for(uint i = 0, i < s.stakes.length, i++){
        s.stakedBalance += s.stakes[i];
    }
    if(s.stakeTime == s.stakeTime + maturityPeriod){
        s.stakeMaturity = true;
    }
    if(s.stakeMaturity){
    s.stakeProfit = (s.stakedBalance/100) * interestRate; 
    s.stakedBalance += s.stakeProfit;
    }
stakeIndex++;
}

}