const DistrictToken = artifacts.require('./DistrictToken.sol')
const DistrictProposal = artifacts.require('./Vote/DistrictProposal.sol')
const DistrictVoteToken = artifacts.require('./Vote/DistrictVoteToken.sol')
const { toToken } = require('./utils.js')
const BigNumber = require('bignumber.js')

let voteToken;

before(async () => {
  const accounts = await web3.eth.accounts
  console.log(accounts)
  
  const mainToken = await DistrictToken.deployed()
  const transferEventFilter = mainToken.Transfer({}, {fromBlock: 0, toBlock: 'latest'})

  // Test minting 10000 tokens for each account
  // for (let index = 0; index < 10; index++) {
    // expectedMint += 1000
  await mainToken.mint(accounts[0], toToken(100000))
  // }

  // Test transfers
  for (let index = 1; index < accounts.length; index++) {
    await mainToken.transfer(accounts[index], toToken(Math.random() * 10000), { from: accounts[0] })
  }

  const balances = {
    [accounts[0]]: await mainToken.balanceOf(accounts[0])
  }

  const transferEvents = await transferEventFilter.get()
  const block = await web3.eth.getBlock('latest')

  transferEvents.forEach(transfer => {
    const from = transfer.args.from
    const to   = transfer.args.to
    const value = transfer.args.value

    if (parseInt(from, 16)) {
      balances[from] = balances[from].sub(value)
    }

    if (!balances[to]) {
      balances[to] = new BigNumber(0)
    }

    balances[to] = balances[to].add(value)
  })

  const total = await mainToken.totalSupply()
  voteToken = await DistrictVoteToken.new(total, block.number, mainToken.address, { from: accounts[0] })

  for (let account in balances) {
    await voteToken.mint(account, balances[account], { from: accounts[0] })
  }
})

contract('Voting', accounts => {
  describe('Miniting vote tokens', async => {
    it('test', async => {
      
    })
  })
})

  // describe('Manipulate with token', async() => {
    
  //     })
    
  //     describe('Calculate balances', async() => {
  //       it('Calculate mint amount', async() => {
  //         const mintEvent = token.Mint({}, {fromBlock: 0, toBlock: 'latest'})
    
  //         let expectedMint = 0
  //         for (let index = 1; index < 10; index++) {
  //           expectedMint += 1000 * index
  //           await token.mint(accounts[index], toToken(1000 * index))
  //         }
    
  //         const mintEvents = await mintEvent.get()
  //         const totalMint = mintEvents.reduce((acc, event) => acc.add(event.args.amount), new BigNumber(0, 10))
    
  //         assert(totalMint.eq(new BigNumber(expectedMint).mul(Math.pow(10, 18))))
    
  //       })
  //       it('Calculate balances in transfers', async() => {
  //         const transferEventFilter = token.Transfer({}, {fromBlock: 0, toBlock: 'latest'})
    
  //         const balances = {}
    
  //         for (let index = 1; index < 10; index++) {
  //           await token.mint(accounts[index], toToken(5000))
  //         }
    
  //         await token.transfer( accounts[0], toToken(Math.floor(5000)), { from: accounts[1]})
  //         await token.transfer( accounts[0], toToken(Math.floor(5000)), { from: accounts[2]})
  //         await token.transfer( accounts[0], toToken(Math.floor(5000)), { from: accounts[3]})
  //         await token.transfer( accounts[0], toToken(Math.floor(5000)), { from: accounts[4]})
    
  //         const transferEvents = await transferEventFilter.get()
    
  //         transferEvents.forEach(transfer => {
  //           const from = transfer.args.from
  //           const to   = transfer.args.to
  //           const value = transfer.args.value
    
  //           if (parseInt(from, 16)) {
  //             balances[from] = balances[from].sub(value)
  //           }
    
  //           if (!balances[to]) {
  //             balances[to] = new BigNumber(0)
  //           }
    
  //           balances[to] = balances[to].add(value)
  //         })
    
    
  //         const actualBalance = await token.balanceOf(accounts[0])
  //         assert(actualBalance.eq(balances[accounts[0]]))
    
  //       })
  //     })