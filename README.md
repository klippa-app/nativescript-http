# nativescript-http

[![Build Status](https://travis-ci.org/klippa-app/nativescript-http.svg?branch=master)](https://travis-ci.org/klippa-app/nativescript-http)

A drop-in replacement for the core HTTP with important improvements like proper connection pooling and form data support.

## Installation

```javascript
tns plugin add @klippa/nativescript-http
```

## Usage 

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

### Angular
We also provide a drop-in replacement `NativeScriptHttpClientModule` from the `nativescript-angular` project.

In order to make Angular use our HTTP implementation, import our module like this:

```typescript
import { NativeScriptHttpClientModule } from "@klippa/nativescript-http/http-client";

@NgModule({
    imports: [
        NativeScriptHttpClientModule
    ]
```

From now on you can make requests using Angular's HttpClient service like explained [here](https://docs.nativescript.org/angular/ng-framework-modules/http).

## Form data
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

## Comparison with other NativeScript HTTP Clients

| Plugin | Android | iOS | Background threads | Supports form data | Proper connection pooling
| --- | --- | --- | --- | --- | --- |
| @nativescript/core/http | Yes, using Java HttpURLConnection | Yes, using NSMutableURLRequest | Yes | No | No, bad Android implementation |
| nativescript-background-http | Yes, using Java  gotev/android-upload-service library | Yes, using NSURLSession | Yes (with a service) | No | Unknown |
| nativescript-http-formdata | Yes, using Java okhttp3 | Yes, using OMGHTTPURLRQ | No | Yes | No, bad okhttp3 implementation |

## Implementation differences with NativeScript Core HTTP
 
 * We only try to parse the response as Image when the Content-Type starts with `image/`
 * We use a default timeout of 60s for connect/write/read, you can change this using the timeout option
 * While the code of Core HTTP looks like it supports FormData, it only supports key/value and not files, we do support it with our `HTTPFormDataCommon` class.
 
## License

The MIT License (MIT)

