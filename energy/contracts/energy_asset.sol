// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract EnergyAsset is ERC1155, Ownable, ERC1155Burnable {
    uint256 public constant E_TOKEN = 0;
    uint256 public constant ENERGY_CERTIFICATION = 1;


    constructor() ERC1155("https://tkxkd0159.github.io/ERC1155meta/token/{id}.json") {
        _mint(msg.sender, E_TOKEN, 10**18, "");
        _mint(msg.sender, ENERGY_CERTIFICATION, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
