// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC721.sol";

contract StakingContract {
    struct Stake {
        address staker;
        bool activeStake;
        uint88 stakeTime;
        uint256 stakeBalance;
    }

    IERC20 public immutable boredApeToken;
    IERC721 public immutable boredApeYachtClub;

    uint256 public constant MINIMUM_STAKE = 10e18;

    mapping(address => Stake) public stakes;

    /// Sender does not have an active stake
    error NoActiveStakeFound();

    /// Sender does not own a Bored Ape Yatch Club NFT
    error MustOwnBoredApeNFT();

    /// Sender's stake amount is less than the minimum acceptable amount
    error StakeTooLow();

    event StakeDeposit(address _from, uint256 _amount);
    event StakeWithdrawal(address _from, uint256 _amount);

    /// Asserts that only users who own at least one Bored Ape Yatch Club NFT can stake
    modifier onlyBoredApeOwners() {
        if (boredApeYachtClub.balanceOf(msg.sender) < 1)
            revert MustOwnBoredApeNFT();
        _;
    }

    constructor(address _batAddress, address _baycAddress) {
        boredApeToken = IERC20(_batAddress);
        boredApeYachtClub = IERC721(_baycAddress);
    }

    function stake(uint256 _amount)
        external
        onlyBoredApeOwners
        returns (bool success)
    {
        Stake storage s = stakes[msg.sender];
        if (_amount < MINIMUM_STAKE) revert StakeTooLow();
        assert(boredApeToken.transferFrom(msg.sender, address(this), _amount));
        if (s.activeStake) {
            uint256 profit = stakeProfit();
            s.stakeBalance += _amount + profit;
        } else {
            s.staker = msg.sender;
            s.stakeBalance += _amount;
            s.activeStake = true;
        }
        s.stakeTime = uint88(block.timestamp);

        emit StakeDeposit(msg.sender, _amount);

        success = true;
    }

    /**
     * @notice Withdraws sender's total stake balance
     * Returns a boolean to indicate transaction status
     */
    function withdraw() external returns (bool success) {
        Stake storage s = stakes[msg.sender];
        if (!s.activeStake) revert NoActiveStakeFound();
        uint256 profit = stakeProfit();
        uint256 totalStakeBalance = s.stakeBalance + profit;
        s.stakeBalance -= totalStakeBalance;
        s.activeStake = false;
        assert(boredApeToken.transfer(msg.sender, totalStakeBalance));
        emit StakeWithdrawal(msg.sender, totalStakeBalance);
        success = true;
    }

    /**
     * @notice Returns the sender's total stake balance
     */
    function viewStakeBalance() external view returns (uint256 _balance) {
        Stake storage s = stakes[msg.sender];
        if (!s.activeStake) revert NoActiveStakeFound();
        uint256 profit = stakeProfit();
        _balance = s.stakeBalance + profit;
    }

    /**
     * Computes the stakers profit per second
     * Returns the stakers profit accrued after stake maturity
     * Returns 0 if stake is not yet matured for autocompounding
     */
    function stakeProfit() internal view returns (uint256 _profit) {
        Stake storage s = stakes[msg.sender];
        uint256 minimumCycle = 259200 seconds; // 3 days
        uint256 stakeMaturity = block.timestamp - s.stakeTime;
        uint256 cycles = stakeMaturity / 1 seconds;
        if (block.timestamp >= (s.stakeTime + minimumCycle)) {
            // _profit = (10% * s.stakeBalance * cycles)/(60*60*24*30*100 or 259200000);
            _profit = (10 * s.stakeBalance * cycles) / 259200000;
        } else {
            _profit = 0;
        }
    }
}
