# nativescript-http

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![TotalDownloads][total-downloads-image]][npm-url]
[![Build Status][build-status]][build-url]

[build-status]:https://github.com/klippa-app/nativescript-http/workflows/Build%20CI/badge.svg
[build-url]:https://github.com/klippa-app/nativescript-http/actions
[npm-image]:http://img.shields.io/npm/v/@klippa/nativescript-http.svg
[npm-url]:https://npmjs.org/@klippa/nativescript-http
[downloads-image]:http://img.shields.io/npm/dm/@klippa/nativescript-http.svg
[total-downloads-image]:http://img.shields.io/npm/dt/@klippa/nativescript-http.svg?label=total%20downloads

**A drop-in replacement for the core HTTP with important improvements like proper connection pooling and form data support.**

## Features
* Modern TLS & SSL security features
* Shared connection pooling reduces request latency
* Control over concurrency/connection pooling
* Silently recovers from common connection problems
* Everything runs on a native background thread
* Transparent GZIP to shrink response size
* HTTP/2 and SPDY support
* Support for directly posting ArrayBuffer/File/Blob/native(such as java.io.File and NSData.dataWithContentsOfFile) objects
* Multipart form data support (for file upload), file upload supports ArrayBuffer, File, Blob and native objects (like java.io.File, NSData.dataWithContentsOfFile)
* Ability to use without any code change
* Ability to make all http requests go through this plugin
* Backwards compatible (behaves the same as core HTTP)
* Ability to set a global user agent
* Ability to control cookies
* Ability to control background image parsing
* Certificate/SSL pinning

## Installation

```
tns plugin add @klippa/nativescript-http
```

## Usage 

### Automatically use this plugin for all HTTP calls

Since this is a drop-in replacement for the [core HTTP](https://docs.nativescript.org/ns-framework-modules/http),
we can automatically use this plugin for all HTTP calls in NativeScript that use the XHR framework to do HTTP calls, this includes:
 * Any JavaScript/Angular/Vue plugin that was created to be used in the browser
   * Axios
   * Angular HTTPClient
   * vue-resource
 * Any NativeScript http method
   * request
   * fetch
   * getString, getJSON, getImage, getFile, getBinary
   * **Not** NativeScript ImageCache
 * Any NativeScript plugin that uses above methods internally

The way to do this is quite simple, we only have to import a plugin and add the plugin to the `plugins` array in the `webpack.config.js` file:

```javascript
// Add on top of page.
const NativeScriptHTTPPlugin = require("@klippa/nativescript-http/webpack");

// ... code

// Add our plugin to the webpack plugins array.
plugins: [
            // ... other plugins
            new NativeScriptHTTPPlugin()
]

// ... code
```

**Note: if you do this, you don't have to do the other integrations.**

### Integration in code

Since this is a drop-in replacement for the [core HTTP](https://docs.nativescript.org/ns-framework-modules/http), you can execute the requests in the same way as with the Core HTTP, the only thing different is the import:

The format of options and the output of the request are the same as in core HTTP.

```typescript
import { HttpResponse } from "tns-core-modules/http";
import { request } from "@klippa/nativescript-http";

request({
   url: "https://httpbin.org/get",
   method: "GET"
}).then((response: HttpResponse) => {
   // Argument (response) is HttpResponse
}, (e) => {
});
```

### Integration in Angular
We also provide a drop-in replacement `NativeScriptHttpClientModule` from the `nativescript-angular` project.

In order to make Angular use our HTTP implementation, import our module like this:

```typescript
import { NativeScriptHttpClientModule } from "@klippa/nativescript-http/angular";

@NgModule({
    imports: [
        NativeScriptHttpClientModule
    ]
```

From now on you can make requests using Angular's HttpClient service like explained [here](https://docs.nativescript.org/angular/ng-framework-modules/http).

Be aware that this plugin tries to parse your image in the background so you won't have to do this in javascript (core HTTP does the same).
This value is not reachable from the Angular HTTP client, only through response.content.toImage(), so I would advice to use the HTTP client directly (so without the Angular HTTP client) if you are going to download images and display them directly.

## Form data
By default this client behaves the same as the Core HTTP for FormData objects, meaning it will just encode it as key=value pairs and it does not support Blob/File objects.
It will be posted as `application/x-www-form-urlencoded` unless you override it using a custom header.

If you want to create multipart (multipart/form-data) form data requests, you can use the HTTPFormData class from this plugin.
You can create form data requests like this:

```typescript
import { HttpResponse } from "tns-core-modules/http";
import { request, HTTPFormData, HTTPFormDataEntry } from "@klippa/nativescript-http";

const form = new HTTPFormData();
form.append("value", "Test");
// You can also append ArrayBuffer/File/Blob/native(such as java.io.File and NSData.dataWithContentsOfFile) objects directly to form here, but please keep in mind that only the File object has the ability to set a filename. And only Blob/File objects have the ability to set a content type.
// Use HTTPFormDataEntry if you want more control.

const formFile = new HTTPFormDataEntry();
formFile.fileName = "test.png";
formFile.contentType = "image/png";

// formFile.data can be a JavaScript ArrayBuffer but also native file objects like java.io.File and NSData.dataWithContentsOfFile.
formFile.data = new java.io.File(fileLocation);
form.append("file", formFile);

request({
    url: "https://httpbin.org/post",
    method: "POST",
    content: form
}).then((response: HttpResponse) => {
    // Argument (response) is HttpResponse
}, (e) => {
});
```

**Note: this does not work with the Angular HTTPClient, because it tries to transform the HTTPFormData to json. Use the request() method for Multipart posting.**

## Comparison with other NativeScript HTTP Clients

| Plugin | Android | iOS | Background threads | Supports form data | Proper connection pooling | Can replace core http | Certificate / SSL Pinning |
| --- | --- | --- | --- | --- | --- | --- | --- |
| @nativescript/core/http | :heavy_check_mark: using Java HttpURLConnection | :heavy_check_mark: using NSMutableURLRequest | :heavy_check_mark: | :x: | :x: bad Android implementation | - | :x: |
| nativescript-background-http | :heavy_check_mark: using gotev/android-upload-service | :heavy_check_mark: using NSURLSession | :heavy_check_mark: (with a service) | :x: | Unknown | :x: | :x: |
| nativescript-http-formdata | :heavy_check_mark: using okhttp3 | :heavy_check_mark: using OMGHTTPURLRQ | :x: | :heavy_check_mark: | :x: bad okhttp3 implementation | :x: | :x: |
| nativescript-okhttp | :heavy_check_mark: using okhttp3 | :x: | :x: | :x: | :x: bad okhttp3 implementation | :x: | :x: |
| nativescript-https | :heavy_check_mark: using okhttp3 | :heavy_check_mark: using AFNetworking | :heavy_check_mark: | :x: | :heavy_check_mark: shared client | :white_check_mark: by manually replacing calls, data structures are (almost) the same | :heavy_check_mark: |
| @klippa/nativescript-http | :heavy_check_mark: using okhttp3 | :heavy_check_mark: using NSURLSession | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: shared client | :heavy_check_mark: automatically and manually | :heavy_check_mark: |

## Implementation differences with NativeScript Core HTTP
 
 * We only try to parse the response as Image when the Content-Type starts with `image/`
 * We use a default timeout of 60s for connect/write/read, you can change this using the timeout option
 * While the code of Core HTTP looks like it supports FormData, it only supports key/value and not files, we do support it with our `HTTPFormData` class.
 
## API

### Controlling image decode (Android only)
The NativeScript HTTP implementation always tries to decode responses as image to make sure toImage() works fast.
However, a lot of times you don't want it to do this, as you are not expecting images.
By default this plugin only works like this when the endpoint returns a proper image content type (`ImageParseMethod.CONTENTTYPE`).
With this method you can control this behaviour, with `ImageParseMethod.ALWAYS` you revert to Core HTTP behaviour, with `ImageParseMethod.NEVER` you can completely disable it. 

Note: only has affect on Android, on iOS image decoding already only happens when you use toImage().

```typescript
import { setImageParseMethod, ImageParseMethod } from "@klippa/nativescript-http";

// Add this line where you want to change the image parse mode.
// Options are: NEVER/CONTENTTYPE/ALWAYS.
setImageParseMethod(ImageParseMethod.ALWAYS);
```

### Controlling cookies
Clear all cookies:

```typescript
import { clearCookies } from "@klippa/nativescript-http";

// Add this line where you want to clear cookies.
clearCookies();
```

### Controlling concurrency / connection pool limits
Note: only the domain limit has effect on iOS.

```typescript
import { setConcurrencyLimits } from "@klippa/nativescript-http";

// Add this line where you want to set the concurrency limits.
// First argument is total limit, second per domain.
setConcurrencyLimits(20, 5);
```

### Setting a global User Agent
```typescript
import { setUserAgent } from "@klippa/nativescript-http";

// Add this line where you want to set the user agent.
setUserAgent("MyCoolApp");
```

### Certificate pinning

Please read about certificate pinning before you enable it.
It can have serious consequences. Good articles are [here](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-certificate-pinner/) and [here](https://infinum.com/the-capsized-eight/how-to-make-your-ios-apps-more-secure-with-ssl-pinning).

You can use this [question on Stack Overflow](https://stackoverflow.com/questions/40404963/how-do-i-get-public-key-hash-for-ssl-pinning) to learn how to get the certificate hashes.

```typescript
import { certificatePinningAdd, certificatePinningClear } from "@klippa/nativescript-http";

// Add this line where you want to pin the certificate to a specific domain. The second argument is the certificate hash chain.
// You can use *.mydomain.com to also use this for direct subdomains, and **.mydomain.com for any subdomain.
// Note: for iOS, *.publicobject.com also behaves as **.publicobject.com due to limitation in TrustKit.
// Note 2: for Android, if you use the older version of OkHttp, the **. prefix does not work.
certificatePinningAdd("mydomain.com", ["DCU5TkA8n3L8+QM7dyTjfRlxWibigF+1cxMzRhlJV4=", "Lh1dUR9y6Kja30RrAn7JKnbQG/uEtLMkBgFF2Fuihg=", "Vjs8r4z+80wjNcr1YKepWQboSIRi63WsWXhIMN+eWys="]);

// Use this to clear all certificate pins.
certificatePinningClear();
```


## Roadmap
 * Websockets
 * NativeScript ImageCache support

## License

The MIT License (MIT)

