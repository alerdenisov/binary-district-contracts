pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/token/ERC20Basic.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract VotingContract {
  function vote(bool _agree) public returns (bool);
  function remainingTotal() public returns (uint);
  function successVote() public constant returns (bool);

  event Vote(address indexed who, bool agree);
  event Finish();
}

contract DistrictProposal is VotingContract {
  using SafeMath for uint;

  mapping (address => bool) votingList;

  ERC20Basic public token;
  uint public totalStake;

  uint public agreeCount;
  uint public rejectCount;

  function StakeVoting(address _tokenAddress) {
    token = ERC20Basic(_tokenAddress);
    totalStake = token.totalSupply();
  }

  modifier shouldNotVoteYet() {
    require(!votingList[msg.sender]);
    _;
  }

  function vote(bool _agree) shouldNotVoteYet public returns (bool) {
    uint senderStake = token.balanceOf(msg.sender);
    require(senderStake > 0);

    votingList[msg.sender] = true;

    if(totalStake / senderStake < 1000) {
      senderStake = totalStake / 1000;
    }

    if (_agree) {
      agreeCount = agreeCount.add(senderStake);
    }

    else {
      rejectCount = rejectCount.add(senderStake);
    }

    return true;
  }

  function successVote() public constant returns (bool) {
    require(agreeCount.add(rejectCount) > totalStake / 100);
    return agreeCount / rejectCount > 2;
  }
}