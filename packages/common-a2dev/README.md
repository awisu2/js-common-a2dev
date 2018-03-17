# common-a2dev

gather sometimes need.

# usage

```
var common = require("common-a2dev")

let v = []
if (common.isArray(v)) {
  console.log("it's array")
} else {
  console.log("it's not array")
}
```

# methods

##  existsArg

check args isExists

```js
common.existsArg(undefined) // false
common.existsArg(1) // true
common.existsArg(null) // true
```

## canNumber

check value it's can change number

```js
common.canNumber (1) // true
common.canNumber ("1") // true
common.canNumber ("a") // false
common.canNumber ("1a") // false
```

## hasDataObject

check value it's false or when value is object not have data

```js
common.hasDataObject ({}) // false
common.hasDataObject ([]) // false
common.hasDataObject ([0]) // true
common.hasDataObject () // false
common.hasDataObject (0) // false
```

## valueObject

get value from object

```js
common.valueObject ({a: 1}, "a", 2) // 1
common.valueObject ({a: 1}, "b", 2) // 2
```

## copyObject

value copy object

```js
var obj1 = {a: 1}
var obj2 = common.copyObject (obj1) // 1
obj2.a = 2

console.log(obj1) // {a: 1}
console.log(obj2) // {a: 2}
```

## matchUrl

get urls by string

```js
common.matchUrl ("http://exsample.com is url. second url is http://exsample2.com") // ["http://exsample.com", "http://exsample2.com"]
```

### options

- isDeleteEscape: boolean
  - if it's true. delete escape string.

## fillObject

fill data by sample

```js
var obj = {a: 1}
var options = {
  isPrune: false
}
var obj2 = common.fillObject (obj, {b: 2}, options) // {a: 1, b: 2}
```

### options

- isPrune: boolean
  - if it's true. run prneOjbect after fillObject

## pruneObject

prune data from obj not exists sample value

```js
var obj = {a: 1, b: 2}
var options = {
  isPrune: false
}
var obj2 = common.pruneObject (obj, {b: 2}, options) // {b: 2}
```

## randomInt

get randomInt

```js
common.randomInt(1, 5) // 1-5
```

## typeString

get value type from class

```js
common.typeString(1) // '[object Number]'
common.typeString("1") // '[object String]'
common.typeString([]) // '[object Array]'
common.typeString({}) // '[object Object]'
```

## isObject

check value is object corectly

```js
common.isObject(1) // false
common.isObject("1") // false
common.isObject(null) // false
common.isObject([]) // false
common.isObject({}) // true
```

## isArray

check value is object corectly

```js
common.isArray(1) // false
common.isArray("1") // false
common.isArray(null) // false
common.isArray([]) // true
common.isArray({}) // false
```

## isObjectArray

check value is object or array. if it's null return is false.

```js
common.isObjectArray(1) // false
common.isObjectArray("1") // false
common.isObjectArray(null) // false
common.isObjectArray([]) // true
common.isObjectArray({}) // true
```

## getArgumentNode

get node binary path currentry run.

```js
common.getArgumentNode() // '/usr/local/Cellar/node/8.1.2/bin/node'
```

**NOTE**: please use only when cli.

## getArgumentCurrent

get node script path currentry run.

```js
common.getArgumentCurrent() // '/path/to/current/${script.js}'
```

**NOTE**: please use only when cli.

## getArgumentValue

get value from argument.

```bash
node sample.js 1 2 3
```

```js
common.getArgumentValue(0) // 1
common.getArgumentValue(2) // 3
```

## addNodePathEnv

add node path. for Environment

```js
common.addNodePathEnv("/path/to/node") // NODE_PATH: "${NODE_PATH};/path/to/node"
```

## getMatches

get match string from multi string by pattern.

```js
common.getMatches(["abcdefgabcxyz", "hijxyz"], /cd/) // [ 'cd' ]
common.getMatches(["abcdefgabcxyz", "hijxyz"], /xy/) // [ 'xy', 'xy' ]
common.getMatches(["abcdefgabcxyz", "hijxyz"], /[a-z]{2}/) // [ 'ab', 'hi' ]
common.getMatches(["abcdefgabcxyz", "hijxyz"], /[a-z]{2}/g) // [ 'ab', 'cd', 'ef', 'ga', 'bc', 'xy', 'hi', 'jx', 'yz' ]
```

## getMaxLengthStr

get max length from strings

```js
common.getMaxLengthStr(["1", "333", "22"]) // 3
```

## fillStr (str, length, fill = '0')

fill string fill

```js
common.fillStr(123, 6) // '00123'
common.fillStr(123, 2) // '23'
common.fillStr(123, 6, "ZY") // 'ZYZ123'
common.fillStr("abc", 7, "ZY") // 'ZYZYabc'
```

**NOTE**: when fill's value is multi. stacking from the front.

## betweenStr (str, prefix, suffix, options = {})

get string btween prefix and suffix

```js
common.betweenStr("abcdefghijklmn", "cd", "kl") // 'efghij'
common.betweenStr("abcdefghijklmn", "ZZ", "ZZ") // ''
common.betweenStr("abcdefghijklmn", "cd", "kl", {isDetail: true}) // [ 'cdefghijkl', 'efghij', index: 2, input: 'abcdefghijklmn' ]
```

### options

- isDetail: boolean
  - if it's true. return match object.


## escapeRegStr (str)

escape string for regExp

## disallowStringFileName ()

get disallow strings for filename.

```js
common.disallowStringFileName () // [ '\\', '/', ':', '*', '?', '"', '<', '>', '|' ]
```

## replaceDisallowStringFileName (str, replace = '')

replace disallow string from string for filename of filesystem.

```js
common.disallowStringFileName () // [ '\\', '/', ':', '*', '?', '"', '<', '>', '|' ]
```


## Date.format

```js
var d = new Date
d.format('YYYY-MM-DDTHH:mm:SS') // '2018-03-17T13:54:38'
```

**NOTE**: automaticaly set prototype

