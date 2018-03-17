# file-a2dev

file system suport.

# usage

this sample save to log.txt. 2 line a and b.

```js
let file = require("file-a2dev")
file.deepReaddirSync('/path/to/read') // {files: ["a.jpg", "b/c.jpg"], directories: ["b"]}
```

# methods

## setSeparator (target)

add path separator last of string only not exists.

```js
file.setSeparator('/path/to/read') // '/path/to/read/'
file.setSeparator('/path/to/read/') // '/path/to/read/'
```


## deepReaddirSync (base, options = {})

read files and directories.

```js
file.deepReaddirSync('/path/to/read') // {files: ["/path/to/read/a.jpg", "/path/to/read/b/c.jpg"], directories: ["/path/to/read/b"]}
file.deepReaddirSync('/path/to/read', {maxDeep: 0}) // {files: ["/path/to/read/a.jpg", "/path/to/read/b/c.jpg"], directories: ["/path/to/read/b"]}
file.deepReaddirSync('/path/to/read', {maxDeep: 0, isRelative: true}) // {files: ["a.jpg", "b/c.jpg"], directories: ["b"]}
```

### options

- maxDeep: number (default: 5)
  - max search number for deep. 0~
- ignoreSystemFile: boolean (default: true)
  - not exists system file
- isRelative: boolean (default: false)
  - response value to relative.

## makeFiles (filse, current = '.')

create any files.

```js
// create files ./a.txt(text a), b/b.txt(text b)
file.makeFiles({"a.txt": "text a", b: {"b.txt": "text b"}})
```

## checkFiles (files, current = '.')

check files

```js
file.checkFiles({"a.txt": "text a", b: {"b.txt": "text b"}}) // [ 'no exists ./a.txt', 'no exists ./b' ]
```

## renameSyncBySearch (file, pattern, replace)

rename one file, it's hit pattern.

```js
file.makeFiles({sub: {"abcdabcd.txt": "text a"}})
var change = file.renameSyncBySearch("./sub/abcdabcd.txt", /[bc]+/g, "ZZ") // { old: './sub/abcdabcd.txt', new: './sub/aZZdaZZd.txt' }
```

## fillNumbersByMaxlengthUnderDirectory (directory = '.')

change filename under directory.  
it's search all files name. and get max length of number.  
finaly change files number to max length.

```js
file.makeFiles({sub: {"aaa012.txt": "", "aab12.txt": ""}})
var change = file.fillNumbersByMaxlengthUnderDirectory("./sub") // [ { old: './sub/aaa012.txt', new: './sub/aaa12.txt' } ]
```

## isSystemfile (filename)

check file is system file.

- it's not need exists

```js
file.isSystemfile("._") // true
```

## canWrite (file)

check file is exists or file's directory is exists.

```js
file.canWrite ("/existsDir/Exists.txt") // true
file.canWrite ("/existsDir/noExists.txt") // true
file.canWrite ("/noExistsDir/noExists.txt") // false
```

