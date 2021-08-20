// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract EnergyAsset is Ownable, ERC1155Burnable {
    uint256 public constant E_TOKEN = 0;
    uint256 private _totalTokenSupply;
    uint256 private _creation_time = block.timestamp;
    uint256 private _maxid = 0;

    event AddProsumer(address indexed newProsumer);


    mapping(address => bool) prosumers;

    struct UserAsset {
        mapping(uint256 => bytes32) cid_store;
        uint count;
    }
    mapping(address => UserAsset) users_asset;
    mapping(bytes32 => bool) cid_entry;


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

    function setCreationTime() private isProsumer {
        _creation_time = block.timestamp;
    }

    function getCreationTime() public view returns (uint256) {
        return _creation_time;
    }

    function getEtokenBalance() public view returns (uint256) {
        return _totalTokenSupply;
    }

    constructor() ERC1155("https://tkxkd0159.github.io/energytx-eth/erc1155meta/token/{id}.json") {
        _mint(_msgSender(), E_TOKEN, 10000 * 10**18, "");
        _totalTokenSupply += 10**18;
    }

    function setURI(string memory new_uri) public onlyOwner {
        _setURI(new_uri);
    }

    function mintET(address account, uint256 amount, bytes memory data)
        public
        onlyOwner
    {

        _mint(account, 0, amount, data);
        _totalTokenSupply += amount;

    }

    function mintBatch(address to, bytes32[] memory cids, bytes memory data)
        public
        onlyOwner
    {
        uint count = cids.length;
        uint256[] memory amounts = new uint256[](count);
        uint256[] memory ids = new uint256[](count);
        uint cursor = users_asset[to].count;

        for (uint i=0; i < cids.length; i++) {
            amounts[i] = 1;
            ids[i] = i + _maxid + 1;
            users_asset[to].cid_store[cursor] = cids[i];
            users_asset[to].count += 1;
            cursor += 1;
            _maxid += 1;

            cid_entry[cids[i]] = true;
        }
        _mintBatch(to, ids, amounts, data);

    }

    function getMyETP(address to) public view returns (bytes32[] memory) {
        uint cnt = users_asset[to].count;
        bytes32[] memory ret = new bytes32[](cnt);
        for (uint i=0; i < cnt; i++) {
            ret[i] = users_asset[to].cid_store[i];
        }
        return ret;
    }

    function isEtpValid(bytes32 cid) public view returns (bool) {
        return cid_entry[cid] == true;
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

    function getMaxId() public view returns (uint256) {
        return _maxid;
    }
}