// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;



contract StakingContract{

// Staking contract that allows Bored Ape NFT owners to stake BAT(ERC20) for 10% profit monthly
    // Must own Bored Ape NFT to qualify for staking
    // Must have BAT to qualify for staking
    // Get 10% profit if staking conditions are satisfied 
    // Must have staked for at least 3 days to get 10% profit 
    // Can only get 10% profit once in a month (30 days)

   struct Stake{
       uint stakedAmount;
       uint stakeTime;
       uint stakeProfit;
       bool stakeMaturity;
   }
   uint internal stakeIndex = 1;
   // Bored Ape Token Address
   address internal batAddress;
   // Bored Ape NFT Address
   address internal baycAddress;

mapping(address => Stake) public stakes;
modifier OnlyBoredApeOwners(){
    require(baycAddress.balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

    _;
}

function stake(uint _amount) public pure OnlyBoredApeOwners{
    Stake storage s = stakes[stakeIndex];
    s.stakedAmount = _amount;
    s.stakeTime = block.timestamp;
    if(s.stakeTime = block.timestamp + 3 days){
        s.stakeMaturity = true;
    }
    if(stakeMaturity){
    s.stakeProfit = (s.stakedAmount/100) * 10; 
    }
stakeIndex++
}

}
//  function balanceOf(address owner) public view virtual override returns (uint256) {
//         require(owner != address(0), "ERC721: balance query for the zero address");
//         return _balances[owner];
//     }