const EnergyAsset = artifacts.require("EnergyAsset");


module.exports = function (deployer, network, accounts) {
  deployer.then(async() => {
    await deployer.deploy(EnergyAsset);
  });
};