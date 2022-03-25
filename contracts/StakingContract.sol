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
// Interest rate of gains after stake has matured
uint interestInPercent;
// Time before user can gain interest on stakes 
uint maturityPeriod = 5 minutes; 
// Bored Apes Yatch Club NFT Address
address baycAddress = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;
// Bored Apes Token Address
address batAddress = 0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc;
IERC20 boredApeToken;
IERC721 BoredApeYachtClub;
mapping(address => Stake) public addressStakes;
event tokenTransfer(address _from, address _to, uint _amount);

constructor(uint _interestInPercent){
    interestInPercent = _interestInPercent;
    boredApeToken = IERC20(batAddress);
    BoredApeYachtClub = IERC721(baycAddress);
}

modifier onlyBoredApeOwners(){
    require(BoredApeYachtClub.balanceOf(msg.sender) > 0, "Sorry, you must own Bored Ape NFT to stake");
    _;
}
modifier onlyStakers(){
    Stake storage s = addressStakes[msg.sender];
    require(s.stakes.length > 0, "You have no stakes in this pool");
    _;
}

function stake(uint _amount) public onlyBoredApeOwners{
    require(boredApeToken.balanceOf(msg.sender) >= _amount, "Amount exceeds BAT balance");
    Stake storage s = addressStakes[msg.sender];
    boredApeToken.transferFrom(msg.sender, address(this), _amount);
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

    emit tokenTransfer(msg.sender, address(this), _amount);
        stakeIndex++;
        s.stakeTime = block.timestamp;
        s.stakeMaturity = false;
        }


function viewStakeHistory() public view onlyStakers returns(uint[] memory _stakes){
    Stake storage s = addressStakes[msg.sender];
        _stakes = s.stakes;
}

function viewStakeBalance() public view onlyStakers returns(uint _balance){
    Stake storage s = addressStakes[msg.sender];
    _balance = s.stakedBalance + s.stakeProfit;
} 

function withdraw(uint _amount) public onlyStakers returns(bool success){
    Stake storage s = addressStakes[msg.sender];
    // require(s.stakeMaturity = true, "Stake is not mature for withdrawal");
     if(s.stakeTime > 0 && block.timestamp >= s.stakeTime + maturityPeriod){
        s.stakeMaturity = true;
    }
    if(s.stakeMaturity){
        uint timeAfterMaturity = block.timestamp - (s.stakeTime + maturityPeriod);
        uint cycles = timeAfterMaturity / maturityPeriod;
        s.stakeProfit = (s.stakedBalance + (interestInPercent * cycles)) / 100; 
        s.stakedBalance += s.stakeProfit;
    }
        // s.stakedBalance += _amount;
    require(s.stakedBalance >= _amount, "Amount exceeds BAT balance");
    s.stakedBalance -= _amount;
    boredApeToken.transfer(msg.sender, _amount);
    success = true;
    emit tokenTransfer(address(this), msg.sender, _amount);
}
}