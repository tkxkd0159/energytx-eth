const simple = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(simple);
};
