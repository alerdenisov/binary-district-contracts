

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