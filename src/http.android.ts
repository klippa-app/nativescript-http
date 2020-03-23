import { HttpResponseEncoding, HttpRequestOptions, HttpResponse, Headers } from "@nativescript/core/http";
import { addHeader } from "@nativescript/core/http/http-request";
import { ImageSource } from "@nativescript/core/image-source/image-source";
import {
    getFilenameFromUrl,
    HTTPFormData,
    HTTPFormDataEntry,
} from "./http.common";
import * as fs from "tns-core-modules/file-system";
import { screen } from "tns-core-modules/platform";
import { NetworkAgent } from "tns-core-modules/debugger";
export {HTTPFormData, HTTPFormDataEntry } from "./http.common";

declare var global: any;

function parseJSON(source: string): any {
    const src = source.trim();
    if (src.lastIndexOf(")") === src.length - 1) {
        return JSON.parse(src.substring(src.indexOf("(") + 1, src.lastIndexOf(")")));
    }

    return JSON.parse(src);
}

let requestIdCounter = 0;
const pendingRequests = {};

let completeCallback: com.klippa.NativeScriptHTTP.Async.CompleteCallback;
function ensureCompleteCallback() {
    if (completeCallback) {
        return;
    }

    completeCallback = new com.klippa.NativeScriptHTTP.Async.CompleteCallback({
        onComplete: function (result: any, context: any) {
            // as a context we will receive the id of the request
            onRequestComplete(context, result);
        },
        onError: function (error: string, context: any) {
            onRequestError(error, context);
        },
    });
}

function onRequestComplete(requestId: number, result: com.klippa.NativeScriptHTTP.Async.Http.RequestResult) {
    const callbacks = pendingRequests[requestId];
    delete pendingRequests[requestId];

    if (result.error) {
        callbacks.rejectCallback(new Error(result.error.toString()));

        return;
    }

    // read the headers
    const headers: Headers = {};
    if (result.headers) {
        const jHeaders = result.headers;
        const length = jHeaders.size();
        let pair: com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair;
        for (let i = 0; i < length; i++) {
            pair = jHeaders.get(i);
            addHeader(headers, pair.key, pair.value);
        }
    }

    // send response data (for requestId) to network debugger
    if (global.__inspector && global.__inspector.isConnected) {
        NetworkAgent.responseReceived("okhttp3_" + requestId, result, headers);
    }

    callbacks.resolveCallback({
        content: {
            raw: result.raw,
            toArrayBuffer: () => Uint8Array.from(result.raw.toByteArray()).buffer,
            toString: (encoding?: HttpResponseEncoding) => {
                let str: string;
                if (encoding) {
                    str = decodeResponse(result.raw, encoding);
                } else {
                    str = result.responseAsString;
                }
                if (typeof str === "string") {
                    return str;
                } else {
                    throw new Error("Response content may not be converted to string");
                }
            },
            toJSON: (encoding?: HttpResponseEncoding) => {
                let str: string;
                if (encoding) {
                    str = decodeResponse(result.raw, encoding);
                } else {
                    str = result.responseAsString;
                }

                return parseJSON(str);
            },
            toImage: () => {
                return new Promise<any>((resolveImage, rejectImage) => {
                    if (result.responseAsImage != null) {
                        resolveImage(new ImageSource(result.responseAsImage));
                    }
                    else {
                        rejectImage(new Error("Response content may not be converted to an Image"));
                    }
                });
            },
            toFile: (destinationFilePath: string) => {
                if (!destinationFilePath) {
                    destinationFilePath = getFilenameFromUrl(callbacks.url);
                }
                let stream: java.io.FileOutputStream;
                try {
                    // ensure destination path exists by creating any missing parent directories
                    const file = fs.File.fromPath(destinationFilePath);

                    const javaFile = new java.io.File(destinationFilePath);
                    stream = new java.io.FileOutputStream(javaFile);
                    stream.write(result.raw.toByteArray());

                    return file;
                }
                catch (exception) {
                    throw new Error(`Cannot save file with path: ${destinationFilePath}.`);
                }
                finally {
                    if (stream) {
                        stream.close();
                    }
                }
            }
        },
        statusCode: result.statusCode,
        headers: headers
    });
}

function onRequestError(error: string, requestId: number) {
    const callbacks = pendingRequests[requestId];
    delete pendingRequests[requestId];
    if (callbacks) {
        callbacks.rejectCallback(new Error(error));
    }
}

function buildJavaOptions(options: HttpRequestOptions) {
    if (typeof options.url !== "string") {
        throw new Error("Http request must provide a valid url.");
    }

    const javaOptions = new com.klippa.NativeScriptHTTP.Async.Http.RequestOptions();

    javaOptions.url = options.url;

    let contentType: string;
    let mediaType: okhttp3.MediaType = null;
    if (options.headers) {
        for (let key in options.headers) {
            if (key.toLowerCase() === "content-type") {
                contentType = options.headers[key];
            }
        }

        if (contentType) {
            mediaType = okhttp3.MediaType.parse(contentType);
        }
    }

    if (typeof options.method === "string") {
        javaOptions.method = options.method;
    }


    if (typeof options.content === "string" || options.content instanceof FormData) {
        // Make sure we behave the same as the core http.
        if (!mediaType) {
            mediaType = okhttp3.MediaType.parse("application/x-www-form-urlencoded");
        }
        const nativeString = new java.lang.String(options.content.toString());
        javaOptions.content = okhttp3.RequestBody.create(nativeString, mediaType);
    } else if (options.content instanceof ArrayBuffer) {
        // Make sure we behave the same as the core http.
        if (!mediaType) {
            mediaType = okhttp3.MediaType.parse("application/x-www-form-urlencoded");
        }
        const typedArray = new Uint8Array(options.content as ArrayBuffer);
        const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
        javaOptions.content = okhttp3.RequestBody.create(nativeBuffer.array(), mediaType);
    } else {
        let matched = false;

        // We have to do it in this structure to make the ts-ignore work.
        // Normal HTTP Request structure does not allow these types.

        // This matches both Blob and File.
        // We ignore the name in the File object so we can ignore that type.
        // @ts-ignore
        if (!matched && options.content instanceof Blob) {
            // Try to set a mimetype if we have it.
            // @ts-ignore
            if (!mediaType && options.content.type) {

                // @ts-ignore
                mediaType = okhttp3.MediaType.parse(options.content.type);
            }

            // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
            // @ts-ignore
            const typedArray = new Uint8Array(Blob.InternalAccessor.getBuffer(options.content) as ArrayBuffer);
            const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
            javaOptions.content = okhttp3.RequestBody.create(nativeBuffer.array(), mediaType);

            matched = true;
        }

        // @ts-ignore
        if (!matched && options.content instanceof HTTPFormData) {
            matched = true;
            if (!mediaType) {
                mediaType = okhttp3.MediaType.parse("multipart/form-data");
            }

            const builder = new okhttp3.MultipartBody.Builder();
            builder.setType(mediaType);
            const contentValues = options.content as HTTPFormData;
            contentValues.forEach(((value, key) => {
                if (typeof value === "string") {
                    builder.addFormDataPart(key, value);
                } else if (value instanceof ArrayBuffer) {
                    const typedArray = new Uint8Array(value as ArrayBuffer);
                    const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
                    builder.addFormDataPart(key, null, okhttp3.RequestBody.create(nativeBuffer.array(), null));
                } else if (value instanceof Blob) {
                    let formDataPartMediaType = null;
                    if (value.type) {
                        formDataPartMediaType = okhttp3.MediaType.parse(value.type);
                    }

                    let filename = null;
                    if (value instanceof File) {
                        filename = value.name;
                    }

                    // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                    // @ts-ignore
                    const typedArray = new Uint8Array(Blob.InternalAccessor.getBuffer(value) as ArrayBuffer);
                    const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
                    builder.addFormDataPart(key, filename, okhttp3.RequestBody.create(nativeBuffer.array(), formDataPartMediaType));
                } else if (value instanceof HTTPFormDataEntry) {
                    let formDataPartMediaType = null;
                    if (value.type) {
                        formDataPartMediaType = okhttp3.MediaType.parse(value.type);
                    }

                    if (value.data instanceof ArrayBuffer) {
                        const typedArray = new Uint8Array(value.data as ArrayBuffer);
                        const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
                        builder.addFormDataPart(key, value.name, okhttp3.RequestBody.create(nativeBuffer.array(), formDataPartMediaType));
                    } else if (value.data instanceof Blob) {
                        // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                        // @ts-ignore
                        const typedArray = new Uint8Array(Blob.InternalAccessor.getBuffer(value.data) as ArrayBuffer);
                        const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
                        builder.addFormDataPart(key, value.name, okhttp3.RequestBody.create(nativeBuffer.array(), formDataPartMediaType));
                    } else {
                        // Support for native file objects.
                        builder.addFormDataPart(key, value.name, okhttp3.RequestBody.create(value.data, formDataPartMediaType));
                    }
                } else {
                    // Support for native file objects.
                    builder.addFormDataPart(key, null, okhttp3.RequestBody.create(value, null));
                }
            }));

            javaOptions.content = builder.build();
        }

        if (!matched && options.content) {
            // Assume options.content is a native object.
            javaOptions.content = okhttp3.RequestBody.create(options.content, mediaType);
        }
    }

    if (typeof options.timeout === "number") {
        javaOptions.timeout = options.timeout;
    }
    if (typeof options.dontFollowRedirects === "boolean") {
        javaOptions.dontFollowRedirects = options.dontFollowRedirects;
    }

    if (options.headers) {
        const arrayList = new java.util.ArrayList<com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair>();
        const pair = com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair;

        for (let key in options.headers) {
            arrayList.add(new pair(key, options.headers[key] + ""));
        }

        javaOptions.headers = arrayList;
    }

    // pass the maximum available image size to the request options in case we need a bitmap conversion
    const ourScreen = screen.mainScreen;
    javaOptions.screenWidth = ourScreen.widthPixels;
    javaOptions.screenHeight = ourScreen.heightPixels;

    return javaOptions;
}

export function request(options: HttpRequestOptions): Promise<HttpResponse> {
    if (options === undefined || options === null) {
        // TODO: Shouldn't we throw an error here - defensive programming
        return Promise.reject("No options given");
    }

    return new Promise<HttpResponse>((resolve, reject) => {
        try {
            // initialize the options
            const javaOptions = buildJavaOptions(options);

            // send request data to network debugger
            if (global.__inspector && global.__inspector.isConnected) {
                NetworkAgent.requestWillBeSent("okhttp3_" + requestIdCounter, options);
            }

            // remember the callbacks so that we can use them when the CompleteCallback is called
            const callbacks = {
                url: options.url,
                resolveCallback: resolve,
                rejectCallback: reject
            };
            pendingRequests[requestIdCounter] = callbacks;

            ensureCompleteCallback();
            // make the actual async call
            com.klippa.NativeScriptHTTP.Async.Http.MakeRequest(javaOptions, completeCallback, new java.lang.Integer(requestIdCounter));

            // increment the id counter
            requestIdCounter++;
        } catch (ex) {
            reject(ex);
        }
    });
}

function decodeResponse(raw: any, encoding?: HttpResponseEncoding) {
    let charsetName = "UTF-8";
    if (encoding === HttpResponseEncoding.GBK) {
        charsetName = "GBK";
    }

    return raw.toString(charsetName);
}

export function getString(arg: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const str = r.content.toString();
                    resolve(str);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getJSON<T>(arg: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const json = r.content.toJSON();
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getImage(arg: any): Promise<ImageSource> {
    return new Promise<any>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    resolve(r.content.toImage());
                } catch (err) {
                    reject(err);
                }
            }, err => {
                reject(err);
            });
    });
}

export function getFile(arg: any, destinationFilePath?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const file = r.content.toFile(destinationFilePath);
                    resolve(file);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getBinary(arg: any): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const arrayBuffer = r.content.toArrayBuffer();
                    resolve(arrayBuffer);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}
