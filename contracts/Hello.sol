pragma solidity ^0.4.15;

contract Hello {
  address public lastestGreeter;

  function greet() public returns (bool) {
    lastestGreeter = msg.sender;
    return true;
  }
}