pragma solidity ^0.4.15;

contract Hello {
  // Save address of latest greeter called greet function
  address public lastestGreeter;

  // Greet event fires when someone calls greet function
  event Greet(address indexed _who);
  
  // Greet with everyone inside ethereum blockchain
  function greet() public returns (bool) {
    lastestGreeter = msg.sender;
    Greet(lastestGreeter);
    return true;
  }
}