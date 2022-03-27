// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Deployed to: 0x0ed64d01D0B4B655E410EF1441dD677B695639E7

contract BoredApeToken is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        
        _mint(0xe66904a5318f27880bf1d20D77Ffa8FBdaC5E5E7, 10000000000 * 10**uint(decimals()));
    }
}