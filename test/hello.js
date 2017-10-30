const Hello = artifacts.require('./Hello.sol')

contract('Hello', accounts => {
  describe('Should be deployed', async() => {
    assert(await Hello.deployed())
  })
})