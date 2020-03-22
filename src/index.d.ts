import { HttpRequestOptions, HttpResponse } from "@nativescript/core/http/http";

export declare function request(options: HttpRequestOptions): Promise<HttpResponse>;
export declare function addHeader(headers: Headers, key: string, value: string): void;
export declare function getFilenameFromUrl(url: string): string;
export declare type HTTPFormDataEntryValue = FormDataEntryValue | any;
export declare class HTTPFormDataEntry {
    data: any;
    fileName?: string;
    contentType?: string;
}
export declare class HTTPFormData implements FormData {
    private values;
    append(name: string, value: string | Blob | any, fileName?: string): void;
    delete(name: string): void;
    get(name: string): HTTPFormDataEntryValue | null;
    getAll(name: string): HTTPFormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob | any, fileName?: string): void;
    forEach(callbackfn: (value: HTTPFormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}
