// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.10;



// contract StakingContract{

// // Staking contract that allows Bored Ape NFT owners too stake BAT(ERC20) for 10% profit monthly
//     // Must own Bored Ape NFT to qualify for staking
//     // Must have BAT to qualify for staking
//     // Get 10% profit if staking conditions are satisfied 
//     // Must have staked for at least 3 days to get 10% profit 
//     // Can only get 10% profit once in a month (30 days)

//    struct Stake{
//        uint stakedAmount;
//        uint profit;
//    }

// modifier OnlyBoredApeOwners(){
//     require(balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

//     _;
// }

// function stake(uint _amount) public pure OnlyBoredApeOwners{
//     Stake storage s;
//     s.amount += _amount
// }

// }
// //  function balanceOf(address owner) public view virtual override returns (uint256) {
// //         require(owner != address(0), "ERC721: balance query for the zero address");
// //         return _balances[owner];
// //     }