const request = require("request");

const BASE_URL = "https://www.codingame.com/services"
const CODIN_GAME = "https://www.codingame.com/multiplayer/clashofcode"
const BASIC_HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
}

async function login(email, password) {
    const loginRequest = {
        url: BASE_URL + '/CodinGamer/loginSiteV2',
        headers: BASIC_HEADERS,
        body: JSON.stringify([
            email,
            password,
            true
        ]),
        referrer: CODIN_GAME,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors"
    }

    return new Promise((resolve, reject) => {

        request(loginRequest, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let cookie = response.headers['set-cookie'].join(';')
                let user_info = JSON.parse(body.toString())
                let uid = user_info['codinGamer']['userId']
                resolve({cookie: cookie, uid: uid});
            } else {
                reject(error);
            }
        })

    })
}

async function createPrivateGame(cookie, userId, languages, modes) {
    const gameCreationRequest = {
        url: BASE_URL + '/ClashOfCode/createPrivateClash',
        headers: {
            ...BASIC_HEADERS,
            "cookie": cookie
        },
        body: JSON.stringify([
            userId,
            { SHORT: true },
            languages,
            modes,
        ]),
        referrer: CODIN_GAME,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors"
    }

    return new Promise((resolve, reject) => {
        request(gameCreationRequest, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let game = JSON.parse(body)
                resolve(game);
            } else {
                reject(error);
            }
        })

    })
}

async function launchGame(cookie, userId, handle) {
    const gameLaunchRequest = {
        url: BASE_URL + '/ClashOfCode/startClashByHandle',
        headers: {
            ...BASIC_HEADERS,
            "cookie": cookie
        },
        body: JSON.stringify([
            userId,
            handle
        ]),
        referrer: CODIN_GAME,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors"
    }

    return new Promise((resolve, reject) => {
        request(gameLaunchRequest, (error, response, _) => {
            if (!error) {
                if (response.statusCode === 204) {
                    resolve(true);
                } else {
                    resolve(false)
                }
            } else {
                reject(error);
            }
        })

    })
}

async function getClashByHandle(cookie, handle) {
    const clashFindRequest = {
        url: BASE_URL + '/ClashOfCode/findClashByHandle',
        headers: {
            ...BASIC_HEADERS,
            "cookie": cookie
        },
        body: JSON.stringify([
           handle
        ]),
        referrer: CODIN_GAME,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors"
    }

    return new Promise((resolve, reject) => {
        request(clashFindRequest, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let clash = JSON.parse(body)
                resolve(clash);
            } else {
                reject(error);
            }
        })

    })
}


async function getPublicPendingGame(cookie) {
    const publicPendingGameRequest = {
        url: BASE_URL + '/ClashOfCode/findPendingClashes',
        headers: {
            ...BASIC_HEADERS,
            "cookie": cookie
        },
        body: JSON.stringify([]),
        referrer: CODIN_GAME,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors"
    }
    return new Promise((resolve, reject) => {
        request(publicPendingGameRequest, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let clash = JSON.parse(body)
                resolve(clash);
            } else {
                reject(error);
            }
        })

    })
}



exports.login = login
exports.createPrivateGame = createPrivateGame
exports.getClashByHandle = getClashByHandle
exports.getPublicPendingGame = getPublicPendingGame
exports.launchGame = launchGame