# js-common-a2dev

## Common

```
const {Common} = require('common-a2dev')
```

### Common.existsArg (v)

### Common.canNumber (v)

### Common.hasDataObject (v)

### Common.valueObject (object, key, def)

### Common.copyObject (object)

### Common.matchUrl (str, options)

文字列内に存在するurlを配列で返却します

- options
  - isDeleteEscape(boolean): url内のエスケープ文字を削除

### Common.fillObject (obj, sample, options)

sampleに存在するキーが、objに存在しない時、
対象のキーに一致するsampleの値を、objに追加します

- options
  - isPrune(boolean): exec pruneObject after fill

### Common.pruneObject (obj, fills, options)

### Common.getArgumentNode ()

### Common.getArgumentCurrent ()

### Common.getArgumentValue (index)

### Common.addNodePathEnv (path)

## Http

```
const {Http} = require('common-a2dev')
```

### Http.request (url, data, options)

- options
  - method(string): Http Method(default: 'GET')
  - isRedirect(boolean): is Redirect when 3xx statusCode(default: true)
  - headers(object): send headers value(default: undefined)
  - port(number): port (default: 80 or 443)

## How to Test

```bash
npm test
# grep
npm test -- --grep Common
```
