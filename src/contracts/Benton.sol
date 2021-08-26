// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

contract Benton {

    struct Food {
      string name;
      uint price;
    }

    string public name = "Benton Contract";
    address public admin;
    
    mapping(address => Food) public bills;

    constructor() public {
        admin = msg.sender;
    }

    function order(string memory foodName, uint price) public {
      bills[msg.sender].name = foodName;
      bills[msg.sender].price = price;
    }
}
