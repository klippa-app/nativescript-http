import { HttpRequestOptions, HttpResponse } from "@nativescript/core/http";
import { ImageSource } from "@nativescript/core/image-source";

/**
 * Downloads the content from the specified URL as a string.
 * @param url The URL to request from.
 */
export declare function getString(url: string): Promise<string>;

/**
 * Downloads the content from the specified URL as a string.
 * @param options An object that specifies various request options.
 */
export declare function getString(options: HttpRequestOptions): Promise<string>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param url The URL to request from.
 */
export declare function getJSON<T>(url: string): Promise<T>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param options An object that specifies various request options.
 */
export declare function getJSON<T>(options: HttpRequestOptions): Promise<T>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param url The URL to request from.
 */
export declare function getImage(url: string): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param options An object that specifies various request options.
 */
export declare function getImage(options: HttpRequestOptions): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param url The URL to request from.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export declare function getFile(url: string, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param options An object that specifies various request options.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export declare function getFile(options: HttpRequestOptions, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param url The URL to request from.
 */
export declare function getBinary(url: string): Promise<ArrayBuffer>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param options An object that specifies various request options.
 */
export declare function getBinary(options: HttpRequestOptions): Promise<ArrayBuffer>;

/**
 * Makes a generic http request using the provided options and returns a HttpResponse Object.
 * @param options An object that specifies various request options.
 */
export declare function request(options: HttpRequestOptions): Promise<HttpResponse>;
export declare type HTTPFormDataEntryValue = HTTPFormDataEntry | FormDataEntryValue | ArrayBuffer | Blob | File | string | any;
export declare class HTTPFormDataEntry {
    data: any;
    name?: string;
    type?: string;
    constructor(data: any, name?: string, type?: string);
}
export declare class HTTPFormData implements FormData {
    private values;
    append(name: string, value: HTTPFormDataEntryValue): void;
    delete(name: string): void;
    get(name: string): HTTPFormDataEntryValue | null;
    getAll(name: string): HTTPFormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: HTTPFormDataEntryValue): void;
    forEach(callbackfn: (value: HTTPFormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

export declare function addHeader(headers: Headers, key: string, value: string): void;
