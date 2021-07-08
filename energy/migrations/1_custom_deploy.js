const Simple = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(Simple);
};
