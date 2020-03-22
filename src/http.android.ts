import { HttpResponseEncoding, HttpRequestOptions } from "@nativescript/core/http";
import { ImageSource } from "@nativescript/core/image-source/image-source";
import HttpResponse = org.apache.http.HttpResponse;
import {
    getFilenameFromUrl,
    HTTPFormDataCommon,
    HTTPFormDataEntryCommon
} from "./http.common";
import * as fs from "tns-core-modules/file-system";
import { screen } from "tns-core-modules/platform";
import { NetworkAgent } from "tns-core-modules/debugger";

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
    const headers: any = {};
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

    if (options.content instanceof FormData || options.content instanceof HTTPFormData) {
        const builder = new okhttp3.MultipartBody.Builder();
        builder.setType(okhttp3.MediaType.parse("multipart/form-data"));
        options.content.forEach(((value, key) => {
            if (typeof(value) === "string") {
                builder.addFormDataPart(key, value);
            } else if (value != null && typeof (value) !== "undefined" && !(value instanceof HTTPFormDataEntry)) {
                // Note: this should handle Blob/File items, but it does not. We need to convert the Blob to something native.
                // So far no good results with that in a sync way.
                const MEDIA_TYPE = okhttp3.MediaType.parse(value.type);
                builder.addFormDataPart(key, value.name, okhttp3.RequestBody.create(value, MEDIA_TYPE));
            } else if (value instanceof HTTPFormDataEntry) {
                const MEDIA_TYPE = okhttp3.MediaType.parse(value.contentType);
                builder.addFormDataPart(key, value.fileName, okhttp3.RequestBody.create(value.data, MEDIA_TYPE));
            }
        }));

        javaOptions.content = builder.build();
    } else if (typeof options.content === "string") {
        const nativeString = new java.lang.String(options.content.toString());
        javaOptions.content = okhttp3.RequestBody.create(nativeString, mediaType);
    } else if (options.content instanceof ArrayBuffer) {
        const typedArray = new Uint8Array(options.content as ArrayBuffer);
        const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
        javaOptions.content = okhttp3.RequestBody.create(nativeBuffer, mediaType);
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

export function addHeader(headers: Headers, key: string, value: string): void {
    if (!headers[key]) {
        headers[key] = value;
    } else if (Array.isArray(headers[key])) {
        (<string[]>headers[key]).push(value);
    } else {
        const values: string[] = [<string>headers[key]];
        values.push(value);
        headers[key] = values;
    }
}

export class HTTPFormDataEntry extends HTTPFormDataEntryCommon {}
export class HTTPFormData extends HTTPFormDataCommon {}


