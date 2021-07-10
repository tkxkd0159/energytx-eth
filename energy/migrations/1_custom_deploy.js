const EnergyAsset = artifacts.require("EnergyAsset");
const EnergyTrade = artifacts.require("EnergyTrade");

module.exports = function (deployer, network, accounts) {
  deployer.then(async() => {
    await deployer.deploy(EnergyAsset);
    await deployer.deploy(EnergyTrade, EnergyAsset.address);
  });
};
