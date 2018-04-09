config-a2dev
============

I know we have config.js, dotenv and any greate configlation modules.

But I want use same config file on node and javascript.

- not loading file
- if it's can get data from environment
- simple over write

usage
===========

```javascript
var Config = require("config-a2dev")

const myConfig = {
  default: {
    a: 1,
    b: {
      b1: 2,
      b2: 3
    }
  },
  dev: {
    a: 11, // over write
    b: {
      b1: Config.getEnv('b1', 12), // get from environment
      b3: 14// add
    },
    c: 13
  }
}

var config = Config.create(myConfig, {stage: 'dev'})
// { a: 1, b: { b1: 12, b2: 3, b3: 14 }, c: 13 }
```

