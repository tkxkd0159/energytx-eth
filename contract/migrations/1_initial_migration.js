const EnergyAsset = artifacts.require("EnergyAsset");


module.exports = function (deployer, network, accounts) {
  deployer.then(async() => {
    deployer.deploy(EnergyAsset);
    // await deployer.deploy(EnergyTrade, EnergyAsset.address);
  });
};