// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./energy_asset.sol";

contract EnergyTrade is Ownable {
    EnergyAsset ea;

    constructor(address ea_addr) {
        ea = EnergyAsset(ea_addr);
    }

    function getAssetOwner() public view returns (address) {
        return ea.owner();
    }
}

