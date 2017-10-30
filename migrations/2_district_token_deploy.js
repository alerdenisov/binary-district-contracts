var DistrictToken = artifacts.require("./DistrictToken.sol");

module.exports = function(deployer) {
  deployer.deploy(DistrictToken);
};
