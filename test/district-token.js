const DistrictToken = artifacts.require('./DistrictToken.sol')
const BigNumber = require('bignumber.js')
const { expectThrow } = require('./utils.js')

function toToken (number) {
  return number * Math.pow(10, 18)
}

contract('DistrictToken', accounts => {
  let token

  beforeEach(async() => {
    token = await DistrictToken.deployed()
  })

  describe('Hardcap test', async() => {
    it('Should have a hard cap', async() => {
      const hardCap = await token.HARDCAP()
      assert(hardCap.toString(10) === "1000000000000000000000000000")
    })

    it('Shouldnt mint more than hard cap', async() => {
      await token.mint(accounts[0], await token.HARDCAP(), { from: accounts[0] })
      expectThrow(token.mint(accounts[0], 1, { from: accounts[0] }))
    })

    it('Shouldnt allow to mint non owner', async() => {
      let anotherToken = await DistrictToken.new({from: accounts[5]})
      expectThrow(token.mint(accounts[0], 100000, { from: accounts[1] }))
    })
  })
})