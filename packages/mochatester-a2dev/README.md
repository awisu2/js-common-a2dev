# MochaTester

# usage

```js
var tester = require("mochatester-a2dev")
var values = tester.testValues() // a lot values for test
```

# methods

## testValues

get test values

```js
tester.testValues // test values
```

## existsKeyAssert (key, data) boolean

check exists key in data.
and not exists key return false

```js
tester.existsKeyAssert (key, data)
```

## isErrorWithDone (done, err) boolean

check exists err.

```js
tester.isErrorWithDone (done, err)
```




