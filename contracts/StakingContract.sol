// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract StakingContract{
    
   struct Stake{
       uint248 stakeTime;
       bool stakeMaturity;
       uint256 stakeBalance;
   }

IERC20 boredApeToken = IERC20(0xB2b580ce436E6F77A5713D80887e14788Ef49c9A);
IERC721 boredApeYachtClub = IERC721(0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D);
uint256 constant calcDecimals = 1e10;
uint256 stakeIndex = 1;
mapping(address => Stake) public stakes;
event tokenTransfer(address _from, address _to, uint256 _amount);
modifier onlyBoredApeOwners(){
    require(boredApeYachtClub.balanceOf(msg.sender) >= 1, "Sorry, only Bored Ape NFT owners can stake");
    _;
}

// staked amount to begin compounding from stake time
// staked amount should only be withdrawable after 3 days
// stake should compound per second
// to add stake: calculate total stake + profit accrued, update balance, add to new stake and restart stake time 
// withdraw: calculate total stake + profit and update to balance, withdraw, reset staketime and stake maturity



function stakeProfit() internal returns (uint256 _profit) {
    Stake storage s = stakes[msg.sender];
    if(s.stakeTime > 0 && block.timestamp >= s.stakeTime + 3 minutes){
        s.stakeMaturity = true;
    }
    if(s.stakeMaturity){
        uint256 timeBeforeMaturity = block.timestamp - s.stakeTime;
        uint256 cycles = timeBeforeMaturity / 1 seconds;
        // interest per second 
        // _profit = (10 * calcDecimals * cycles)/(60*60*24*30*100 or 259200000); 
        _profit = (10 * calcDecimals * cycles)/(30000); 
    }
}
function stake(uint256 _amount) external onlyBoredApeOwners{
    require(boredApeToken.balanceOf(msg.sender) >= _amount, "Amount exceeds BAT balance");
    Stake storage s = stakes[msg.sender];
    boredApeToken.transferFrom(msg.sender, address(this), _amount);
    uint256 profit = stakeProfit();
    s.stakeBalance += profit/calcDecimals;
        s.stakeBalance += _amount;
    emit tokenTransfer(msg.sender, address(this), _amount);
    stakeIndex++;
    s.stakeTime = uint248(block.timestamp);
    s.stakeMaturity = false;
}

function viewStakeBalance() external view returns(uint256 _balance){
    Stake storage s = stakes[msg.sender];
    uint256 profit = stakeProfit();
    _balance = s.stakeBalance + profit/calcDecimals;
} 

function withdraw(uint256 _amount) external returns(bool success){
    Stake storage s = stakes[msg.sender];
    uint256 profit = stakeProfit();
    require(s.stakeMaturity == true, "Stake is not mature for withdrawal");
    s.stakeBalance += profit/calcDecimals;
    require(s.stakeBalance >= _amount, "Amount exceeds BAT balance");
    s.stakeBalance -= _amount;
    boredApeToken.transfer(msg.sender, _amount);
    success = true;
    emit tokenTransfer(address(this), msg.sender, _amount);
    s.stakeTime = uint248(block.timestamp);
    s.stakeMaturity = false;
}
}