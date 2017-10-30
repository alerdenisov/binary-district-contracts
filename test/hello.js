const Hello = artifacts.require('./Hello.sol')

contract('Hello', accounts => {
  it('Should be deployed', async() => {
    assert(await Hello.deployed())
  })
})