pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract DistrictToken is MintableToken {
    using SafeMath for uint256;
    
    // ERC20 constants
    string public constant name = "Binary District Token";
    string public constant symbol = "DIST";
    uint public constant decimals = 18;

    uint public constant HARDCAP = 1 ether * 10 ** 9;

    modifier hardCapUnreached(uint _increase) {
      require(totalSupply.add(_increase) <= HARDCAP);
      _;
    }

    function mint(address _to, uint256 _amount) hardCapUnreached(_amount) public returns (bool) {
      return super.mint(_to, _amount);
    }
}