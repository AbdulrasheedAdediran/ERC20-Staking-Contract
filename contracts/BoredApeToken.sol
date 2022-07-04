// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Deployed to: 0x234d11e2382C47283FBBBE42835676058009BF18

contract BoredApeToken is ERC20 {
    constructor(address _admin, uint256 totalSupply)
        ERC20("Bored Ape Token", "BAT")
    {
        _mint(_admin, totalSupply);
    }
}
