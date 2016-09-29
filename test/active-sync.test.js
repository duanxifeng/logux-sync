var ActiveSync = require('../active-sync')
var LocalPair = require('../local-pair')

it('connects first', function () {
  var log = { on: function () { } }
  var pair = new LocalPair()
  var sync = new ActiveSync('host', log, pair.left)

  sync.sendConnect = jest.fn()
  pair.left.connect()
  expect(sync.sendConnect).toBeCalled()
})

it('saves last added from ping', function () {
  var log = { on: function () { } }
  var pair = new LocalPair()
  var sync = new ActiveSync('host', log, pair.left)

  pair.left.connect()
  pair.right.send(['connected', sync.protocol, 'server'])
  expect(sync.otherSynced).toBe(0)

  pair.right.send(['ping', 1])
  expect(sync.otherSynced).toBe(1)

  sync.sendPing()
  pair.right.send(['pong', 2])
  expect(sync.otherSynced).toBe(2)
})
