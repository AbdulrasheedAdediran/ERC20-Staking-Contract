// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Deployed to: 0x0ed64d01D0B4B655E410EF1441dD677B695639E7
// 0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE

contract BoredApeToken is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        
        _mint(msg.sender, 1000000 * 10**uint(decimals()));
    }
}