# http-a2dev

# usage

```js
var http = require('http-a2dev')
http.request('https://www.google.co.jp/')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```

# parameters

## METHOD

return list of HTTP METHOD

```js
http.METHOD.GET // GET
// {
//   'GET': 'GET',
//   'POST': 'POST',
//   'DELETE': 'DELETE',
//   'OPTION': 'POST',
//   'PUT': 'PUT',
//   'PATCH': 'PATCH',
//   'LINK': 'LINK',
//   'UNLINK': 'UNLINK',
//   'TRACE': 'TRACE'
// }
```

# methods

## request (url, data = null, options = {}) : promise

url request

```js
http.request('https://www.google.co.jp/')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```

### options

- method: string(default: GET)
  - GET, POST, OPTION, DELETE (please use http.METHOD)
- isRedirect: boolean(default: true)
  - if it's true. auto redirect.
- headers: object (default: {})
  - set http headers
- port: number(default: 80)
  - http port. if it's not set automaticaly set. http => 80, https => 443

## get (url, data = null, options = {}) : promise

call request with `options.method = http.METHOD.GET`. please show detail request method

## post (url, data = null, options = {}) : promise

call request with `options.method = http.METHOD.POST`. please show detail request method

## put (url, data = null, options = {}) : promise

call request with `options.method = http.METHOD.PUT`. please show detail request method

## delete (url, data = null, options = {}) : promise

call request with `options.method = http.METHOD.DELETE`. please show detail request method

## createPathForGet (path, data)

create path for http method of GET.

```js
http.createPathForGet("http://sample.html", {a: 1, b: 2}) // 'http://sample.html?a=1&b=2'
```

## httpRequestResponse (response, body, options = {})

create response for this package

## downloadFile (url, filename, options = {})

download file

```js
http.downloadFile ("http://anyfile.com/anyimage.jpg", "/path/to/anyimage.jpg")
.then(_ => {
  // finish download and save file
})
.catch (err => {
  console.log(err)
})
```

### options

it's like to request() method. please show detail request().















