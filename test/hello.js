const Hello = artifacts.require('./Hello.sol')

contract('Hello', accounts => {
  it('Should be deployed', async() => {
    assert(await Hello.deployed())
  })

  describe('Manipulate with contract', async() => {
    let helloInstance
    beforeEach(async() => helloInstance = await Hello.deployed())

    it('Should allow to greet', async() => {
      assert(await helloInstance.greet({ from: accounts[0] }))
    })

    it('Should change greeter', async() => {
      assert(await helloInstance.greet({ from: accounts[0] }))
      assert(await helloInstance.lastestGreeter() == accounts[0])
      assert(await helloInstance.greet({ from: accounts[1] }))
      assert(await helloInstance.lastestGreeter() == accounts[1])
    })

    it('Shoud fire event when greeter changes', async() => {
      const greetWatcher = helloInstance.Greet()

      await helloInstance.greet({ from: accounts[0]})

      const events = greetWatcher.get()

      assert(events.length == 1)
      assert(events[0].args._who == accounts[0])
    })
  })
})