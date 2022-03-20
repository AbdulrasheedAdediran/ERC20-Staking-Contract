// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract StakingContract{
    
   struct Stake{
       uint[] stakes;
       uint stakeTime;
       uint stakedBalance;
       uint stakeProfit;
       bool stakeMaturity;
   }
uint stakeIndex = 1;
// Interest user gains after stake has matured
uint interestInPercent;
// Time before user can gain interest 
uint maturityPeriod; 

constructor(uint _maturityPeriod, uint _interestInPercent){
    maturityPeriod = _maturityPeriod;
    interestInPercent = _interestInPercent
}

// Bored Apes Token Address
IERC20 boredApeToken = IERC20(batAddress);
address batAddress = 0x40a42Baf86Fc821f972Ad2aC878729063CeEF403;

// Bored Apes Yatch Club NFT Address
IERC721 boredApeYatchToken = IERC721(baycAddress);
address baycAddress = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;

mapping(address => Stake) public addressStakes;

modifier OnlyBoredApeOwners(){
    require(boredApeYatchToken.balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

    _;
}

function stake(uint _amount) public OnlyBoredApeOwners{
    require(boredApeToken.balanceOf(msg.sender) >= _amount, "Amount exceeds balance");
    Stake storage s = addressStakes[msg.sender];
    boredApeToken.transferFrom(msg.sender, address(this), _amount);
    boredApeToken.balance(msg.sender) -= _amount;
    s.stakes.push(_amount);
    
    if(s.stakeTime > 0 && block.timestamp >= s.stakeTime + maturityPeriod){
        s.stakeMaturity = true;
    }
    if(s.stakeMaturity){
        uint timeAfterMaturity = block.timestamp - (s.stakeTime + maturityPeriod);
        uint cycles = timeAfterMaturity / maturityPeriod;
        s.stakeProfit = (s.stakedBalance + (interestInPercent * cycles)) / 100; 
        s.stakedBalance += s.stakeProfit;
    }
        s.stakedBalance += _amount;


stakeIndex++;
s.stakeTime = block.timestamp;
s.stakeMaturity = false;
}
}

function viewStakes() public view returns(uint[] _stakes){
    Stake storage s = addressStakes[msg.sender];
    require(s.stakes.length > 0, "No stakes found");
        _stakes = s.stakes;
}

function withdraw(uint _amount) public returns(bool success){
    require(boredApeToken.balanceOf(msg.sender) >= _amount, "Amount exceeds balance");
    msg.sender.balance += _amount;
    boredApeToken.transferFrom(address(this), msg.sender, _amount);
    success = true;
}
}