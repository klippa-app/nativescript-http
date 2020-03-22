import {XhrFactory } from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as types from "@nativescript/core/utils/types";
import { request } from "..";
import { HttpRequestOptions, HttpResponse } from "@nativescript/core/http/http";

namespace XMLHttpRequestResponseType {
    export const empty = "";
    export const text = "text";
    export const json = "json";
    export const blob = "blob";
    export const arraybuffer = "arraybuffer";
}

// Copied from core xhr, sadly we couldn't extend it.
// Only used for Angular module.
export class NSHTTPXMLHttpRequest {
    public UNSENT = 0;
    public OPENED = 1;
    public HEADERS_RECEIVED = 2;
    public LOADING = 3;
    public DONE = 4;

    public onabort: (...args: any[]) => void;
    public onerror: (...args: any[]) => void;
    public onload: (...args: any[]) => void;
    public onloadend: (...args: any[]) => void;
    public onloadstart: (...args: any[]) => void;
    public onprogress: (...args: any[]) => void;

    private _options: HttpRequestOptions;
    private _readyState: number;
    private _status: number;
    private _response: any;
    private _responseTextReader: Function;
    private _headers: any;
    private _errorFlag: boolean;
    private _sendFlag: boolean;
    private _responseType: string = "";
    private _overrideMimeType: string;

    private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    public onreadystatechange: Function;

    public get upload() {
        return this;
    }

    public get readyState(): number {
        return this._readyState;
    }

    public get responseType(): string {
        return this._responseType;
    }

    public set responseType(value: string) {
        if (value === XMLHttpRequestResponseType.empty
            || value in XMLHttpRequestResponseType) {
            this._responseType = value;
        } else {
            throw new Error(`Response type of '${value}' not supported.`);
        }
    }

    public get responseText(): string {
        if (this._responseType !== XMLHttpRequestResponseType.empty
            && this._responseType !== XMLHttpRequestResponseType.text) {
            throw new Error(
                "Failed to read the 'responseText' property from 'XMLHttpRequest': " +
                "The value is only accessible if the object's 'responseType' is '' or 'text' " +
                `(was '${this._responseType}').`
            );
        }

        if (types.isFunction(this._responseTextReader)) {
            return this._responseTextReader();
        }

        return "";
    }

    public get response(): any {
        if (this._responseType === XMLHttpRequestResponseType.empty
            || this._responseType === XMLHttpRequestResponseType.text) {
            if (this._readyState !== this.LOADING && this._readyState !== this.DONE) {
                return "";
            } else {
                return this._response;
            }
        } else {
            if (this._readyState !== this.DONE) {
                return null;
            } else {
                return this._response;
            }
        }
    }

    public get status(): number {
        return this._status;
    }

    public get statusText(): string {
        if (this._readyState === this.UNSENT
            || this._readyState === this.OPENED
            || this._errorFlag) {
            return "";
        }

        return statuses[this._status];
    }

    constructor() {
        this._readyState = this.UNSENT;
    }

    private _loadResponse(r: HttpResponse) {
        this._status = r.statusCode;
        this._headers = r.headers;
        this._setReadyState(this.HEADERS_RECEIVED);

        this._setReadyState(this.LOADING);

        this._responseTextReader = () => r.content.toString();

        const contentType = this.getResponseHeader("Content-Type");
        const mimeType = (contentType && contentType.toLowerCase()) || "text/xml";
        const finalMimeType = this._overrideMimeType || mimeType;

        if (this._responseType === XMLHttpRequestResponseType.json) {
            this._response = r.content.toJSON();
        } else if (this._responseType === XMLHttpRequestResponseType.text
            || this._responseType === XMLHttpRequestResponseType.empty) {
            this._response = this.responseText;
        } else if (this._responseType === XMLHttpRequestResponseType.arraybuffer) {
            this._response = r.content.toArrayBuffer();
        } else if (this._responseType === XMLHttpRequestResponseType.blob) {
            this._response = new Blob([r.content.toArrayBuffer()], { type: finalMimeType });
        }

        this.emitEvent("progress");

        this._sendFlag = false;
        this._setReadyState(this.DONE);
    }

    private emitEvent(eventName: string, ...args: Array<any>) {
        if (types.isFunction(this["on" + eventName])) {
            this["on" + eventName](...args);
        }

        let handlers = this._listeners.get(eventName) || [];
        handlers.forEach((handler) => {
            handler(...args);
        });
    }

    private _setReadyState(value: number) {
        if (this._readyState !== value) {
            this._readyState = value;
            this.emitEvent("readystatechange");
        }

        if (this._readyState === this.DONE) {
            this.emitEvent("load");
            this.emitEvent("loadend");
        }
    }

    private _setRequestError(eventName: string, error?: any) {
        this._readyState = this.DONE;

        this._response = error;

        this.emitEvent("readystatechange");

        this.emitEvent(eventName, error);

        this.emitEvent("loadend");
    }

    public addEventListener(eventName: string, handler: Function) {
        if (["abort", "error", "load", "loadend", "loadstart", "progress", "readystatechange"].indexOf(eventName) === -1) {
            throw new Error("Event not supported: " + eventName);
        }

        let handlers = this._listeners.get(eventName) || [];
        handlers.push(handler);
        this._listeners.set(eventName, handlers);
    }

    public removeEventListener(eventName: string, toDetach: Function) {
        let handlers = this._listeners.get(eventName) || [];
        handlers = handlers.filter((handler) => handler !== toDetach);
        this._listeners.set(eventName, handlers);
    }

    public open(method: string, url: string, async?: boolean, user?: string, password?: string) {
        if (types.isString(method) && types.isString(url)) {
            this._options = { url: url, method: method };
            this._options.headers = {};

            if (types.isString(user)) {
                this._options.headers["user"] = user;
            }

            if (types.isString(password)) {
                this._options.headers["password"] = password;
            }

            this._setReadyState(this.OPENED);
        }
    }

    public abort() {
        this._response = null;
        this._responseTextReader = null;
        this._headers = null;
        this._status = null;

        if ((this._readyState === this.OPENED && this._sendFlag)
            || this._readyState === this.HEADERS_RECEIVED
            || this._readyState === this.LOADING) {
            this._errorFlag = true;
            this._sendFlag = false;
            this._setRequestError("abort");
        }

        if (this._readyState === this.DONE) {
            this._readyState = this.UNSENT;
        }
    }

    public send(data?: any) {
        this._errorFlag = false;
        this._response = null;
        this._responseTextReader = null;
        this._headers = null;
        this._status = null;

        if (this._readyState !== this.OPENED || this._sendFlag) {
            throw new Error(
                "Failed to execute 'send' on 'XMLHttpRequest': " +
                "The object's state must be OPENED."
            );
        }

        if (types.isString(data) && this._options.method !== "GET") {
            // The Android Java HTTP lib throws an exception if we provide a
            // a request body for GET requests, so we avoid doing that.
            // Browser implementations silently ignore it as well.
            this._options.content = data;
        } else if (data instanceof FormData) {
            this._options.content = (<FormData>data).toString();
        } else if (data instanceof Blob) {
            this.setRequestHeader("Content-Type", data.type);

            // @ts-ignore
            this._options.content = Blob.InternalAccessor.getBuffer(data);
        } else if (data instanceof ArrayBuffer) {
            this._options.content = data;
        }

        this._sendFlag = true;

        this.emitEvent("loadstart");

        request(this._options).then(r => {
            if (!this._errorFlag && this._sendFlag) {
                this._loadResponse(r);
            }
        }).catch(e => {
            this._errorFlag = true;
            this._sendFlag = false;
            this._setRequestError("error", e);
        });
    }

    public setRequestHeader(header: string, value: string) {
        if (this._readyState !== this.OPENED || this._sendFlag) {
            throw new Error(
                "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': " +
                "The object's state must be OPENED."
            );
        }

        if (types.isString(header) && types.isString(value)) {
            this._options.headers[header] = value;
        }
    }

    public getAllResponseHeaders(): string {
        if (this._readyState < 2 || this._errorFlag) {
            return "";
        }

        let result = "";

        for (let i in this._headers) {
            result += i + ": " + this._headers[i] + "\r\n";
        }

        return result.substr(0, result.length - 2);
    }

    public getResponseHeader(header: string): string {
        if (types.isString(header) && this._readyState > 1
            && this._headers
            && !this._errorFlag
        ) {
            header = header.toLowerCase();
            for (let i in this._headers) {
                if (i.toLowerCase() === header) {
                    return this._headers[i];
                }
            }
        }

        return null;
    }

    public overrideMimeType(mime: string) {
        if (this._readyState === this.LOADING || this._readyState === this.DONE) {
            throw new Error(
                "Failed to execute 'overrideMimeType' on 'XMLHttpRequest': " +
                "MimeType cannot be overridden when the state is LOADING or DONE."
            );
        }

        this._overrideMimeType = mime;
    }
}

const statuses = {
    100: "Continue",
    101: "Switching Protocols",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non - Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request - URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported"
};

/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 *
 */
@Injectable()
export class NSHTTPXhr implements XhrFactory {
    constructor() {}
    build(): any {
        return <any>(new NSHTTPXMLHttpRequest());
    }
}
