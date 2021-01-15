# quick-clash
Create and launch private clash of code games or get active public games

# Example 
```js
const clash = require('./index')

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