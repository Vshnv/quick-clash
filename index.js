const coc = require("./clash.js")

class ClashClient {
    lastGameHandle = null
    /**
     * {@link createClashClient}
     *
     * @param cookie cookie returned from successful login
     * @param userId user id of bot user
     */
    constructor(cookie, userId) {
        this.cookie = cookie
        this.userId = userId
    }

    /**
     * Creates a private game and returns info for the game
     * Use Result#publicHandle to get the game's handle
     * @link getClashLinkFromHandle
     *
     * @param languages Array of names of allowed languages - ALL are allowed if null; [Rust, Python, Java...etc]
     * @param modes Array of allowed modes - ALL are allowed if null; [FASTEST, SHORTEST, REVERSE]
     * @returns {Promise<String>} The handle for the created Game
     *
     */
    async createPrivateGame(languages, modes) {
        return coc.createPrivateGame(this.cookie, this.userId, languages, modes).then(res => this.lastGameHandle = res[`publicHandle`])
    }

    /**
     * Gets info about a clash like players in the game, started time...ect...
     * @param handle The handle of the game, possibly from {@link createPrivateGame}
     * @returns {Promise<{...}>} Info about the clash
     */
    async getClashByHandle(handle) {
        return coc.getClashByHandle(this.cookie, handle)
    }

    /**
     * Finds array of current public pending games normally shown in the home screen of the clash of code
     * Each of the elements of the returned array contains info about the clash.
     * Use Result#publicHandle to get the game's handle
     * @returns {Promise<{...}>}
     */
    async getPublicPendingGame() {
        return coc.getPublicPendingGame(this.cookie)
    }

    /**
     * Attempts to launch last game.
     *
     * This limitation of launching last game exists since the bot must be in the game
     * and be the game's owner at present to launch the game
     * @return true, if successful;
     */
    async launchLastGame() {
        if (this.lastGameHandle == null) return false
        return coc.launchGame(this.cookie, this.userId, this.lastGameHandle)
    }
}

/**
 * Logs in with specified credentials
 * @param email
 * @param password
 * @return {Promise<ClashClient>} Client that allows managing games
 */
async function createClashClient(email, password) {
    let result = await coc.login(email, password)
    return new ClashClient(result[`cookie`], result['uid'])
}

/**
 * Given the handle (publicHandle) of a game, returns the link to be used to enter the game
 * @param handle
 * @return {string}
 */
function getClashLinkFromHandle(handle) {
    return "https://www.codingame.com/clashofcode/clash/"+ handle
}

exports.createClashClient = createClashClient
exports.getClashLinkFromHandle = getClashLinkFromHandle