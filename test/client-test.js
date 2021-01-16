const {describe} = require('mocha');

const assert = require('assert');
const clash = require('../index')

describe('test creating game', () => {
    it('game returned must not be null', async () => {
        let client = await clash.createClashClient(process.env.TEST_EMAIL, process.env.TEST_PASS)
        let game = await client.createPrivateGame()
        assert(game != null);
        assert(game['publicHandle'] != null);
    })
});