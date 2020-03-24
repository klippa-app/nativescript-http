# nativescript-http

[![Build Status](https://travis-ci.org/klippa-app/nativescript-http.svg?branch=master)](https://travis-ci.org/klippa-app/nativescript-http)

**A drop-in replacement for the core HTTP with important improvements like proper connection pooling and form data support.**

## Features
* Modern TLS & SSL security features
* Shared connection pooling reduces request latency
* Control over concurrency
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

## Warning
The iOS implementation is not complete yet, it misses the multipart form data functionality.
The Android implementation is finished.

## Installation

```javascript
tns plugin add @klippa/nativescript-http
```

## Usage 

### Automatically use this plugin for all HTTP calls

Since this is a drop-in replacement for the [core HTTP](https://docs.nativescript.org/ns-framework-modules/http),
we can automatically use this plugin for all HTTP calls in NativeScript that use the XHR framework to do HTTP calls, this includes:
 * Any JavaScript/Angular plugin that was created for the browser
   * Axios
   * Angular HTTPClient
 * Any NativeScript http method
   * request
   * fetch
   * getString, getJSON, getImage, getFile, getBinary
 * Any NativeScript plugin that uses above methods internally

The way to do this is quite simple, we only have to import a plugin and add the plugin to the `plugins` array in the `webpack.config.js` file:

```js
// Add on top of page.
const NativeScriptHTTPPlugin = require("@klippa/nativescript-http/webpack");

// ... code

// Add our plugin on top.
plugins: [
            new NativeScriptHTTPPlugin(),
            // ... other plugins
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

Note: this only works on Android for now.

## Comparison with other NativeScript HTTP Clients

| Plugin | Android | iOS | Background threads | Supports form data | Proper connection pooling | Can replace core http
| --- | --- | --- | --- | --- | --- | --- |
| @nativescript/core/http | Yes, using Java HttpURLConnection | Yes, using NSMutableURLRequest | Yes | No | No, bad Android implementation | - |
| nativescript-background-http | Yes, using Java  gotev/android-upload-service library | Yes, using NSURLSession | Yes (with a service) | No | Unknown | No |
| nativescript-http-formdata | Yes, using Java okhttp3 | Yes, using OMGHTTPURLRQ | No | Yes | No, bad okhttp3 implementation | No |
| nativescript-okhttp | Yes, using Java okhttp3 | No | No | No | No, bad okhttp3 implementation | No |
| nativescript-https | Yes, using Java okhttp3 | Yes, using AFNetworking | Yes | No | Yes, shared client | Yes, by manually replacing calls, data structures are the same |
| @klippa/nativescript-http | Yes, using Java okhttp3 | Yes, using NSURLSession | Yes | Yes | Yes, shared client | Yes, automatically and manually |

## Implementation differences with NativeScript Core HTTP
 
 * We only try to parse the response as Image when the Content-Type starts with `image/`
 * We use a default timeout of 60s for connect/write/read, you can change this using the timeout option
 * While the code of Core HTTP looks like it supports FormData, it only supports key/value and not files, we do support it with our `HTTPFormData` class.
 
## API

### Controlling image decode (Android only)
Note: only has affect on Android, on iOS this only happens when you use toImage().
```
import { setImageParseMethod, ImageParseMethod } from "@klippa/nativescript-http";

// Add this line where you want to change the image parse mode.
// Options are: NEVER/CONTENTTYPE/ALWAYS.
setImageParseMethod(ImageParseMethod.ALWAYS);
```

### Controlling cookies
Clear all cookies:
```
import { clearCookies } from "@klippa/nativescript-http";

// Add this line where you want to clear cookies.
clearCookies();
```

### Controlling concurrency limits
Note: only has affect on Android.
```
import { setConcurrencyLimits } from "@klippa/nativescript-http";

// Add this line where you want to set the concurrency limits.
// First argument is total limit, second per domain.
setConcurrencyLimits(20, 5);
```

### Setting a global User Agent
```
import { setUserAgent } from "@klippa/nativescript-http";

// Add this line where you want to set the user agent.
setUserAgent("MyCoolApp");
```

## Roadmap
 * SSL Pinning
 * Websockets

## License

The MIT License (MIT)

