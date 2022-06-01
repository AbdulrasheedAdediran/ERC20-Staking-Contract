// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Deployed to: 0x234d11e2382C47283FBBBE42835676058009BF18

contract BoredApeToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 10000000000 * 10**uint256(decimals()));
    }
}
