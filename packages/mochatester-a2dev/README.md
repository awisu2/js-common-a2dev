# MochaTester

# usage

```js
var tester = require("mochatester-a2dev")
var values = tester.testValues() // a lot values for test
// { undefined:
//    { value: undefined,
//      type: 'undefined',
//      typeString: '[object Undefined]',
//      canNumber: false },
//   undefinedArg:
//    { value: undefined,
//      type: 'undefined',
//      typeString: '[object Undefined]',
//      canNumber: false },
//   null:
//    { value: null,
//      type: 'object',
//      typeString: '[object Null]',
//      canNumber: false }
// ...
// }
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




