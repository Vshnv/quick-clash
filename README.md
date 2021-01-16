# quick-clash
![Node.js CI](https://github.com/Vshnv/quick-clash/workflows/Node.js%20CI/badge.svg?branch=master) ![npm](https://img.shields.io/npm/v/quick-clash) ![NPM](https://img.shields.io/npm/l/quick-clash)

Create and launch private clash of code games or get active public games

# Example 
```js
const clash = require('quick-clash')

clash.createClashClient("MyEmail@Email.com", "MyPassword").then( client => {
    client.createPrivateGame().then(game=> {
        console.log(game)
        console.log(clash.getClashLinkFromHandle(game['publicHandle']))
        client.launchLastGame()
    })
})
```

# Install

```
$ npm install quick-clash
```
