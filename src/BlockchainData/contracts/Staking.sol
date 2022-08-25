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


contract Staking  {

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

    event RegisteredReferer(address referee, address referrer);

    event RegisteredRefererFailed(address referee, address referrer, string reason);
  

    address contractAdmin = 0x88a94055AB22Ac80306cc0f00bb13c85205afd3d;
    IERC20 usdt;


    mapping (address=>uint) public onChainBalance;

    // mapping for staking


    mapping (address=>uint) public stakingTime;
    mapping (address=>bool) public hasStaked;
    mapping (address=>uint) minLimit;
    mapping (address=>uint) public allowance;
    mapping (address=>uint) public stakingPercentage;
    mapping (address=>uint) public dailyIncome;
    mapping (address=>uint) public hourlyIncome;
    mapping (address=>uint) public remainingIncome;
    mapping (address=>uint) stakingIncome;
    

    
    // mapping for pledging 
    mapping (address=>bool) public hasPledged;
    mapping (address=>uint) public pledgedBalance;
    mapping (address=>uint) public pledgeIncome;
    mapping (address=>uint) public remainingPledgeIncome;
    mapping (address=>uint) public pledgeDuration;
    mapping (address=>uint) public pledgePercentage;
    mapping (address=>uint) public cumulatedPledgeBalance;
    mapping (address=>uint) public cumulatedPledgeIncome;
    mapping (address=>uint) public pledgingTime;

    struct pledgeRecord {
        uint pledgeAmount;
        uint pledgeTime;
    }

    mapping (address=> pledgeRecord[]) public pledgeHistory;


    // mappping for referral

    struct Account {
        address referrer;
    }

    mapping(address => Account) accounts;
    mapping(address => uint) public teamSize;



    mapping(address => uint) public firstGenerationReferral;
    mapping(address => uint) public secondGenerationReferral;
    mapping(address => uint) public thirdGenerationReferral;

    mapping(address => uint) public firstGenerationIncome;
    mapping(address => uint) public secondGenerationIncome;
    mapping(address => uint) public thirdGenerationIncome;



    mapping(address=>uint) public referralIncome;

    
    
    constructor () {
        usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    }

    modifier onlyContractAdmin () {
        require (msg.sender == contractAdmin, 'Only contract admin can call this function');
        _;
    }


    function transferOwnership (address _newContractAdmin) public onlyContractAdmin {
        address _previousOwner = contractAdmin;
        contractAdmin == _newContractAdmin;
        emit ownershipTransferred(_previousOwner, _newContractAdmin);
    }

    function stakeTokens (uint minimumPrice, uint _stakingPercentage) public returns(bool) {
        // verify that msg.sender has not staked already
        require (hasStaked[msg.sender] == false, 'address has already staked');

        // verify that address has not pledged already
        require (hasPledged[msg.sender] == false, 'address has already pledged');

        // confirm allowance
         uint _allowance = usdt.allowance(msg.sender, contractAdmin);
        
        allowance[msg.sender] =   _allowance;

        // set the min limit price
        minLimit[msg.sender] = (minimumPrice);
        
        require (_allowance >= minLimit[msg.sender], 'Insufficent allowance');


        // daily income
        uint _dailyIncome = ((_stakingPercentage * _allowance) / 10000);

        dailyIncome[msg.sender] = _dailyIncome; 
        
        // hourly income
        hourlyIncome[msg.sender] = ((_dailyIncome)/ 24);


        // set the staking time
        stakingTime[msg.sender] = block.timestamp;

        // set bool for staking
        hasStaked[msg.sender] = true;

        return true;
        
        emit staked(_allowance, msg.sender);
    }



    function pledgeTokens (uint _amount, uint _pledgingDuration, uint _pledgePercentage, address referrer) public {
        // verify that msg.sender has not staked already
        require (hasStaked[msg.sender] == false, 'Address has already staked');
        
        // check that address has not pledged 
        require (hasPledged[msg.sender] == false, 'Address has already pledged');

        // check msg.sender balance
        onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);
        
        // require that balance is enough
        require ((_amount) <= onChainBalance[msg.sender], 'Insufficent Balance');

        // transfer the tokens
        usdt.transferFrom(msg.sender, contractAdmin, _amount);

        // add referrer
        addReferrer(referrer);

        // update pledge history
        pledgeHistory[msg.sender].push(pledgeRecord(_amount, block.timestamp));
        
        // set the staking time
        pledgingTime[msg.sender] = block.timestamp;

        // set the pledging duration
        pledgeDuration[msg.sender] = _pledgingDuration;

        // calculate reward
        pledgePercentage[msg.sender] = _pledgePercentage;

        pledgeIncome[msg.sender] = ((_pledgePercentage * _amount) / 10000);

        // update the pledged balance
        pledgedBalance[msg.sender] = (_amount);

        // update cumulated pledge balance
        cumulatedPledgeBalance[msg.sender] += (_amount);

        cumulatedPledgeIncome[msg.sender] += pledgeIncome[msg.sender];

        // update the has pledged mapping
        hasPledged[msg.sender] = true;

        // emit event
        emit pledged(_amount, msg.sender, _pledgingDuration);
    }

    function withdrawReward(uint _withdrawalAmount) public {
        if (hasStaked[msg.sender] == true) {
            // check that staking has matured
            require (block.timestamp >= stakingTime[msg.sender] * 1 days, 'Staking is yet to mature');

            // stake income
            uint stakeTime = stakingTime[msg.sender];

            uint currentTime = block.timestamp;

            uint _hourlyIncome = hourlyIncome[msg.sender];

            stakingIncome[msg.sender] = (((currentTime - stakeTime) / 1 hours) * _hourlyIncome);

            uint Income = stakingIncome[msg.sender];

            uint previousIncome = remainingIncome[msg.sender];

            uint cumulativeIncome = Income + previousIncome;


            // require that cumulative income > 10
            require (cumulativeIncome >= 10000000, 'Cumulative income must be at least 10USDT');

            // require that withdrawal amount is more than 10 and less than cumulative Incomee
            require (_withdrawalAmount >= 10000000 && cumulativeIncome >= _withdrawalAmount, "Insufficient Balance");

            // require that staked amount is still present
            onChainBalance[msg.sender] = usdt.balanceOf(msg.sender);

            require (onChainBalance[msg.sender] >=  allowance[msg.sender], 'Staked token not available in wallet');

            // call the USDT transfer to function and pass the amount into it
            usdt.transferFrom(contractAdmin, msg.sender, (_withdrawalAmount));

            allowance[msg.sender]= usdt.allowance(msg.sender, contractAdmin);

            remainingIncome[msg.sender] = cumulativeIncome - _withdrawalAmount;

            if (allowance[msg.sender] >= minLimit[msg.sender]) {
                // set new staking time
                stakingTime[msg.sender] =  block.timestamp;

            } else {
                // update has staked mapping
                hasStaked[msg.sender] = false;

                stakingTime[msg.sender] = 0;
            }

            // emit event
            emit stakingWithdrawal(_withdrawalAmount, msg.sender);
            
        } else if (hasPledged[msg.sender] == true) {

            // check that pledge has matured
            uint256 numDays = pledgeDuration[msg.sender];

            require (block.timestamp >= ((pledgingTime[msg.sender]) + (numDays * 1 days )  ), "Pledge income not yet mature");

            uint pledgeReward = pledgeIncome[msg.sender] ;

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= (pledgeReward), 'Insufficient Balance');

            
            // update pledge mappings

            hasPledged[msg.sender] = false;

            pledgingTime[msg.sender] = 0;

            pledgeDuration[msg.sender] = 0;

            remainingPledgeIncome[msg.sender] = (pledgeReward - (_withdrawalAmount));

            // send back the profit
            usdt.transferFrom(contractAdmin, msg.sender, (_withdrawalAmount));

            // execute refferal function
            payReferral();

            // emit event
            emit pledgeWithdrawal (_withdrawalAmount, msg.sender);

        } else if (hasStaked[msg.sender] == false) {

            // check the staked Balance 
            uint _remainingIncome = remainingIncome[msg.sender];

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= _remainingIncome, 'Insufficient Balace');

            // update staking mappings
            
            remainingIncome[msg.sender] = (_remainingIncome - _withdrawalAmount);

            // send back the profit
            usdt.transferFrom(contractAdmin, msg.sender, (_withdrawalAmount));

            // emit event
            emit stakingWithdrawal(_withdrawalAmount, msg.sender);
        } else if (hasPledged[msg.sender] == false) {

            // check the pledged amount 
            uint _remainingIncome = remainingPledgeIncome[msg.sender];

            // require that withdrawal amount is not more than amount pledged + profit
            require ((_withdrawalAmount) <= _remainingIncome, 'Insufficient Balace');


            // update pledge mappings

            pledgingTime[msg.sender] = 0;

            pledgeDuration[msg.sender] = 0;
            
            remainingPledgeIncome[msg.sender] = (_remainingIncome - (_withdrawalAmount));

            // send back the profit
            usdt.transferFrom(contractAdmin, msg.sender, (_withdrawalAmount));

            // emit event
            emit pledgeWithdrawal (_withdrawalAmount, msg.sender);
        }
    }

    function addReferrer(address referrer) internal returns(bool){
        if (referrer == address(0)) {
        emit RegisteredRefererFailed(msg.sender, referrer, "Referrer cannot be 0x0 address");
        return false;
        } else if (msg.sender == referrer) {
        emit RegisteredRefererFailed(msg.sender, referrer, "Referee cannot be one of referrer uplines");
        return false;
        } else if (referrer == contractAdmin) {
        emit RegisteredRefererFailed(msg.sender, referrer, "Referee cannot be one contract Admin");
        return false; 
        } else if (accounts[msg.sender].referrer != address(0)) {
        emit RegisteredRefererFailed(msg.sender, referrer, "Address have been registered upline");
        return false;
        }

        accounts[msg.sender] = (Account(referrer));

        Account storage userAccount = accounts[msg.sender];

        Account memory firstParent = accounts[userAccount.referrer];
        Account memory secondParent = accounts[firstParent.referrer];
       
        firstGenerationReferral[userAccount.referrer] += 1;
        secondGenerationReferral[firstParent.referrer] += 1;
        thirdGenerationReferral[secondParent.referrer] += 1;

        teamSize[userAccount.referrer] += 1;
        teamSize[firstParent.referrer] += 1;
        teamSize[secondParent.referrer] += 1;
        



        emit RegisteredReferer(msg.sender, referrer);
        return true;
    }

    function payReferral() internal {
        Account memory userAccount = accounts[msg.sender];
        Account memory firstParent = accounts[userAccount.referrer];
        Account memory secondParent = accounts[firstParent.referrer];
        Account memory thirdParent = accounts[secondParent.referrer];


        uint income = pledgeIncome[msg.sender]; 

        // calculate parent income  
        uint firstParentIncome = ((30 * income) / 100);
        uint secondParentIncome = ((20 * income) / 100);
        uint thirdParentIncome = ((10 * income) / 100);

            
        referralIncome[firstParent.referrer] += firstParentIncome;
        referralIncome[secondParent.referrer] += secondParentIncome;
        referralIncome[thirdParent.referrer] += thirdParentIncome;


        firstGenerationIncome[userAccount.referrer] += firstParentIncome;
        secondGenerationIncome[firstParent.referrer] += secondParentIncome;
        thirdGenerationIncome[secondParent.referrer] += thirdParentIncome;

        // transfer out rewards
        usdt.transferFrom(contractAdmin, userAccount.referrer, firstParentIncome);
        usdt.transferFrom(contractAdmin, firstParent.referrer, secondParentIncome);
        usdt.transferFrom(contractAdmin, secondParent.referrer, thirdParentIncome);

    }


}