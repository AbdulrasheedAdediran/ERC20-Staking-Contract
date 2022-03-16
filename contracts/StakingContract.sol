// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "../ERC721.sol";
import "./IERC721Enumerable.sol";

contract StakingContract{

    uint stakedAmount;

// Staking contract that allows Bored Ape NFT owners too stake BAT(ERC20) for 10% profit monthly
    // Must own Bored Ape NFT to qualify for staking
    // Must have BAT to qualify for staking
    // Get 10% profit if staking conditions are satisfied 
    // Must have staked for at least 3 days to get 10% profit 
    // Can only get 10% profit once in a month (30 days)

   

modifier OnlyBoredApeOwners(){
    require(balanceOf(msg.sender) > 0, "Must own Bored Ape NFT to stake");

    _;
}

function stake(uint _amount) public pure OnlyBoredApeOwners{
    staking pool += _amount
}

}
//  function balanceOf(address owner) public view virtual override returns (uint256) {
//         require(owner != address(0), "ERC721: balance query for the zero address");
//         return _balances[owner];
//     }