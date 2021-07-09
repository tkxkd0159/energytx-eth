// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint storedData;
    address public owner = msg.sender;

    modifier restricted() {
      require(
        msg.sender == owner,
        "This function is restricted to the contract's owner"
      );
      _;
    }

    function set(uint x) public restricted{
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}