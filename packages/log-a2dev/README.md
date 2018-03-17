# log-a2dev

logging to file.

# usage

this sample save to log.txt. 2 line a and b.

```js
let Log = require("log-a2dev")
new log = new Log("/path/to/log.txt")
log.append('a')
log.append('b')
```

# methods

## append (log, d = null)

d: Date  
when it's set logging time change.

```js
new log = new Log("/path/to/log.txt")
log.append('a')
log.append('b')
```

### options

- dateFormat: string (default: 'YYYY-MM-DD HH:MM:SS')

