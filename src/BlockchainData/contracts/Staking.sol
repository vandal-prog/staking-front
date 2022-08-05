// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;


interface IERC20 {

    /// @param _owner The address from which the balance will be retrieved
    /// @return balance the balance
    function balanceOf(address _owner) external view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) external returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return success Whether the approval was successful or not
    function approve(address _spender, uint256 _value) external returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return remaining Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract Staking {

    // event for staking
    event staked (uint indexed _amount, address indexed _staker);
    // event for staking withdrawal
    event stakingWithdrawal(uint indexed _amount, address indexed _staker);
    // event for pledging
    event pledged (uint indexed _amount, address indexed _staker, uint _pledgeDuration);
    // event for pledging withdrawal
    event pledgeWithdrawal (uint indexed _amount, address indexed _staker);
    // event for ownership transfer
    event ownershipTransferred (address indexed _previousOwner, address indexed _newOwner);

    address contractAdmin;
    IERC20 usdt;
    uint constant decimals = 1000000;
    

    mapping (address=>uint) public onChainBalance;

    // mapping for staking

    mapping (address=>uint) public stakedBalance;
    mapping (address=>uint) public stakingTime;
    mapping (address=>bool) hasStaked;
    mapping (address=>uint) minLimit;
    mapping (address=>uint) maxLimit;

    
    // mapping for pledging 

    mapping (address=>uint) public pledgedBalance;
    mapping (address=>uint) pledgeIncome;
    mapping (address=>bool) hasPledged;
    mapping (address=>uint) public pledgingTime;
    mapping (address=>uint) pledgeDuration;
    mapping (address=>uint) public cumulatedPledgeBalance;
    
    
    
    constructor () {
        contractAdmin  == msg.sender;
        usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        usdt.approve (contractAdmin, 100000000000000000000000000000000000);
    }

    modifier onlyContractAdmin () {
        require (msg.sender == contractAdmin, 'Only contract admin can call this function');
        _;
    }


    function fetchOnChainBalance () public   {
        onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);
    }

    function transferOwnership (address _newContractAdmin) public onlyContractAdmin {
        address _previousOwner = contractAdmin;
        contractAdmin = _newContractAdmin;
        emit ownershipTransferred(_previousOwner, _newContractAdmin);
    }

    function stakeTokens (uint minimumPrice, uint maximumPrice) public {
        // verify that msg.sender has not staked already
        require (hasStaked[msg.sender] == false, 'address has already staked');

        // verify that address has not pledged already
        require (hasPledged[msg.sender] == false, 'address has already pledged');


        // fetch Balance
        fetchOnChainBalance();

        // set the min and max limit price
        minLimit[msg.sender] = (minimumPrice);
        maxLimit[msg.sender] = (maximumPrice);
        
        require (onChainBalance[msg.sender] >= minLimit[msg.sender]);

        require (onChainBalance[msg.sender] <= maxLimit[msg.sender]);

        // set the staking time
        stakingTime[msg.sender] = block.timestamp;


        // map the staking address to amount
        stakedBalance[msg.sender] = onChainBalance[msg.sender];

        // set bool for staking
        hasStaked[msg.sender] = true;

        // emit event
        emit staked(onChainBalance[msg.sender], msg.sender);
    }



    function pledgeTokens (uint _amount, uint _pledgingDuration) public {
        // verify that msg.sender has not staked already
        require (hasStaked[msg.sender] == false, 'Adress has already staked');
        
        // check that address has not pledged 
        require (hasPledged[msg.sender] == false, 'Adress has already pledged');

        // check msg.sender balance
        onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);
        
        // require that balance is enough
        require ((_amount) <= onChainBalance[msg.sender], 'Insufficent Balance');

        // set the staking time
        pledgingTime[msg.sender] = block.timestamp;

        // set the pledging duration
        pledgeDuration[msg.sender] = _pledgingDuration;

        // transfer the tokens
        usdt.transferFrom(msg.sender, address(this), (_amount));

        // update the on chain balance
        onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);
        
        // update the pledged balance
        pledgedBalance[msg.sender] = (_amount);

        // update cumulated pledge balance
        cumulatedPledgeBalance[msg.sender] += (_amount);

        // update the has pledged mapping
        hasPledged[msg.sender] = true;

        // emit event
        emit pledged(_amount, msg.sender, _pledgingDuration);
    }

    function withdrawReward(uint _withdrawalAmount, uint _cumulativeIncome, uint pledgeReward) public {
        if (hasStaked[msg.sender] = true) {
            // check that staking has matured
            require (block.timestamp >= stakingTime[msg.sender] * 1 days, 'Staking is yet to mature');

            // require that cumulative income > 10
            require (_cumulativeIncome >= 10000000, 'Cumulative income must be at least 10USDT');

            // require that withdrawal amount is more than 10 and less than cumulative Incomee
            require (_withdrawalAmount >= 10000000 && _cumulativeIncome >= _withdrawalAmount, "Insufficient Balance");

            // require that staked amount is still present
            onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);

            require (onChainBalance[msg.sender] >=  stakedBalance[msg.sender], 'Staked token not available in wallet');

            // call the USDT transfer to function and pass the amount into it
            usdt.transfer(msg.sender, (_withdrawalAmount));

            // update the on chain balance
            onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);

            if (onChainBalance[msg.sender] >= minLimit[msg.sender]  && onChainBalance[msg.sender] <= maxLimit[msg.sender]) {
                // set new staking time
                stakingTime[msg.sender] =  block.timestamp;

            } else {
                // update min and max limit
                minLimit[msg.sender] = 0;
                maxLimit[msg.sender] = 0;

                // update has staked mapping
                hasStaked[msg.sender] = false;

                // update staked balance
                stakedBalance[msg.sender] -= _withdrawalAmount;
            }

            // emit event
            emit stakingWithdrawal(_withdrawalAmount, msg.sender);
            
        } else if (hasPledged[msg.sender] = true) {

            // check that pledge has matured
            uint numDays = pledgeDuration[msg.sender];

            require (block.timestamp >= ((pledgingTime[msg.sender]) + (numDays * 1 days )  ));

            pledgeIncome[msg.sender] = pledgeReward;

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= (pledgeReward), 'Insufficient Balance');

            
            // update pledge mappings

            hasPledged[msg.sender] = false;

            pledgingTime[msg.sender] = 0;

            pledgeDuration[msg.sender] = 0;

            pledgeIncome[msg.sender] = (pledgeReward - (_withdrawalAmount));

            // send back the profit
            usdt.transfer(msg.sender, (_withdrawalAmount));

            // update the on chain balance
            onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);

            // emit event
            emit pledgeWithdrawal (_withdrawalAmount, msg.sender);

        } else if (hasStaked[msg.sender] = false) {

            // check the staked Balance 
            uint stakeBalance = stakedBalance[msg.sender];

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= stakeBalance, 'Insufficient Balace');

            // update staking mappings
            hasStaked[msg.sender] = false;

            stakingTime[msg.sender] = 0;
            
            stakedBalance[msg.sender] = (stakeBalance - _withdrawalAmount);

            // send back the profit
            usdt.transfer(msg.sender, (_withdrawalAmount));

            // emit event
            emit pledgeWithdrawal (_withdrawalAmount, msg.sender);
        } else if (hasPledged[msg.sender] = false) {

            // check the pledged amount 
            uint remainingIncome = pledgeIncome[msg.sender];

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= remainingIncome, 'Insufficient Balace');


            // update pledge mappings
            hasPledged[msg.sender] = false;

            pledgingTime[msg.sender] = 0;

            pledgeDuration[msg.sender] = 0;
            
            pledgeIncome[msg.sender] = (remainingIncome - (_withdrawalAmount));

            // send back the profit
            usdt.transfer(msg.sender, (_withdrawalAmount));

            // emit event
            emit pledgeWithdrawal (_withdrawalAmount, msg.sender);
        }
    }


}


// test transfer and transfer from functions
// infura and hd wallet provider
// 
