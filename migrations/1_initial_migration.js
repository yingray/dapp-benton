const Benton = artifacts.require("./Benton.sol");

module.exports = function (deployer) {
  deployer.deploy(Benton);
};
