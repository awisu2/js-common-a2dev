# js-common-a2dev

for myself node library

## Objects

- Common
- File
- Http
- MochaTester

## Common

```
const {Common} = require('common-a2dev')
```

### Methods

- Common.existsArg (v)
- Common.canNumber (v)
- Common.hasDataObject (object)
- Common.valueObject (object, key, [def])
- Common.copyObject (object)
- Common.matchUrl (str, options)
- Common.fillObject (obj, sample, options)
- Common.pruneObject (obj, fills, options)
- Common.getArgumentNode ()
- Common.getArgumentCurrent ()
- Common.getArgumentValue (index)
- Common.addNodePathEnv (path)
- Common.getMatches (values, pattern)
- Common.getMaxLengthStr (strings)
- Common.fillStr (str, length, fill = '0')
- Common.randomInt(min, max)

#### Common.existsArg (v)
check exists function artument

return `<boolean>`

#### Common.canNumber (v)
check value can convert number

return `<boolean>`

#### Common.hasDataObject (object)
check one or more data in object

return `<boolean>`

#### Common.valueObject (object, key, [def])
get value in object value. when no exists return def

default `def` = `undefined`

return `<value>`

#### Common.copyObject (object)

#### Common.matchUrl (str, options)
- 文字列内に存在するurlを配列で返却します

####  options
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


## File

### Methods

- setSeparator
- deepReaddirSync
- makeFiles
- checkFiles
- renameSyncBySearch
- fillNumbersByMaxlengthUnderDirectory (directory = '.')
- downloadFile(url, filename)

#### File.setSeparator(target)

add directory separator suffix.  
if already exists separator not add.

#### File.deepReaddirSync (target, [options]) {
read file and directory Recursive.  


**arg:target** target directory

**options**

- maxDeep: how long can read directory recursive (default: 5)
- deep: first directory deep number (default: 0)

**return** `<object>`

```
{
  filse: <array>,
  directories: <array>
}
```

#### File.makeFiles (filse, current = '.')

make directories and files.

**notice**

please remove folders before execute this function.  
this function not check file or directory and remove.

**arg:filse** `<object>`

create file or directory key base.  
if value is object create directory.  
if value is not object create file and write value in file.  

exsample

```
const files = {
  anydir: {
    a: {},
    b: {
      c: {},
      d: {},
      e: 'foo'
    },
    f: 'bar'
  }
}
File.makeFiles(filse)
```

this sample create directory and file below.

```
anydir/
  a/
  b/
    c/
    d/
    e (this is file and have data 'foo')
  f (this is file and have data 'bar')
```

#### File.checkFiles (files, [current])

check exists files and directories.  
check file's data is same.

**arg:files**
same setting by `File.makeFiles -> files`

but it have few difference.  
if value is null not check file's data

**arg:current** check directory (default: .)

**return** `<array>` or `null`

if found out no exists or different data. return array.  
if all correctly return null

**exsample**

```
const files = {
  anydir: {
    a: {},
    b: {
      c: {},
      d: {},
      e: 'foo'
    },
    f: 'bar'
  }
}
File.checkFiles(filse)
```

#### File.renameSyncBySearch (file, pattern, replace)

rename file by fs.renameSync  
before rename check pattern 

```

```

## How to Test

```bash
npm test
# grep
npm test -- --grep Common
```
