# slack-a2dev

slack functions

# usage

```js
var Slack = require("slack-a2dev")

let slack = new Slack({webhookURL: ${yourWebHookURL}})
slack.post("my post")
  .then(data => {
    done()
  })
  .catch(err => done(err))
```

# methods

##  post (text) Promise

post to slack

```js
let slack = new Slack({webhookURL: ${yourWebHookURL}})
slack.post("my post")
  .then(data => {
    done()
  })
  .catch(err => done(err))
```

show detail here [Building Slack apps \| Slack](https://api.slack.com/slack-apps)
