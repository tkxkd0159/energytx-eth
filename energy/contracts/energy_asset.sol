// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract EnergyAsset is Ownable, ERC1155Burnable {
    uint256 public constant E_TOKEN = 0;
    uint256 private _totalTokenSupply;
    uint256 public constant E_CERTIFICATION = 1;
    uint256 private _creation_time = block.timestamp;

    event AddProsumer(address indexed newProsumer);

    mapping(address => bool) prosumers;

    modifier isProsumer {
        require(prosumers[_msgSender()] == true || _msgSender() == owner(), "Caller is not the prosumer");
        _;
    }
    modifier onlyAfter(uint start, uint minutes_after) {
        require(block.timestamp > start + minutes_after * 1 minutes, "It's called too early");
        _;
    }

    function addProsumer(address new_prosumer) public onlyOwner {
        require(new_prosumer != address(0), "New prosumer is the zero address");
        prosumers[new_prosumer] = true;

        emit AddProsumer(new_prosumer);
    }

    function setCreationTime() public isProsumer {
        _creation_time = block.timestamp;
    }

    function getCreationTime() public view returns (uint256) {
        return _creation_time;
    }

    function getEtokenBalance() public view returns (uint256) {
        return _totalTokenSupply;
    }

    constructor() ERC1155("https://tkxkd0159.github.io/energytx-eth/erc1155meta/token/{id}.json") {
        _mint(_msgSender(), E_TOKEN, 10**18, "");
        _totalTokenSupply += 10**18;
        _mint(_msgSender(), E_CERTIFICATION, 1, "");
    }

    function setURI(string memory new_uri) public onlyOwner {
        _setURI(new_uri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {

        _mint(account, id, amount, data);
        if (id == E_TOKEN) {
            _totalTokenSupply += amount;
        }

    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
        for (uint i=0; i < ids.length; i++) {
            if (ids[i] == E_TOKEN) {
                _totalTokenSupply += amounts[i];
            }
        }
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public override {
        super.burnBatch(account, ids, amounts);
        for (uint i=0; i < ids.length; i++) {
            if (ids[i] == E_TOKEN) {
                _totalTokenSupply -= amounts[i];
            }
        }
    }
}
