const EnergyAsset = artifacts.require("EnergyAsset");

module.exports = function (deployer) {
  deployer.deploy(EnergyToken);
};
