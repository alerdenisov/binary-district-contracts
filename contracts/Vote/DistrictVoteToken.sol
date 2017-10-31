pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';


contract DistrictVoteToken is MintableToken {
  uint public hardCap;
  uint public blockNumber;
  address public mainTokenAddress;

  function DistrictVoteToken(uint _supplyAtBlock, uint _blockNumber, address _mainTokenAddress)
  {
    hardCap = _supplyAtBlock;
    blockNumber = _blockNumber;
    mainTokenAddress = _mainTokenAddress;
  }

  modifier hardCapUnreached(uint _increase) {
    require(totalSupply.add(_increase) <= hardCap);
    _;
  }

  function bulkMint(address[] _accounts, uint[] _amounts) onlyOwner public returns (bool) {
    require(_accounts.length == _amounts.length);
    for (uint16 index = 0; index < _accounts.length; index++) {
      assert(mint(_accounts[index], _amounts[index]));
    }

    return true;
  }

  function mint(address _to, uint256 _amount) hardCapUnreached(_amount) public returns (bool) {
    return super.mint(_to, _amount);
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    return false;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    return false;
  }
}