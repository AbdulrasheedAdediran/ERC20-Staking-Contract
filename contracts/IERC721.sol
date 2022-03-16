// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


interface IERC721{
    function balanceOf(address owner) external view returns (uint256 balance);
}