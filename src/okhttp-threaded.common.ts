import { knownFolders, path } from "tns-core-modules/file-system";
import { HttpRequestOptions, HttpResponse } from "@nativescript/core/http/http";

export declare function request(options: HttpRequestOptions): Promise<HttpResponse>;
export declare function addHeader(headers: Headers, key: string, value: string): void;
export function getFilenameFromUrl(url: string): string {
    const slashPos = url.lastIndexOf("/") + 1;
    const questionMarkPos = url.lastIndexOf("?");

    let actualFileName: string;
    if (questionMarkPos !== -1) {
        actualFileName = url.substring(slashPos, questionMarkPos);
    } else {
        actualFileName = url.substring(slashPos);
    }

    const result = path.join(knownFolders.documents().path, actualFileName);

    return result;
}

export class OkHTTPFormDataEntryCommon {
    data: any;
    fileName?: string;
    contentType?: string;
}

export type OkHTTPFormDataEntryValue = OkHTTPFormDataEntryCommon | FormDataEntryValue | any;

export class OkHTTPFormDataCommon implements FormData {
    private values: Map<string, Array<OkHTTPFormDataEntryValue>> = new Map<string, Array<OkHTTPFormDataEntryValue>>();

    append(name: string, value: string | Blob | OkHTTPFormDataEntryCommon, fileName?: string): void {
        if (!this.values.has(name)) {
            this.values.set(name, new Array<OkHTTPFormDataEntryValue>());
        }

        const values = this.values.get(name);
        if (value instanceof Blob) {
            let b: any = value;
            b.name = fileName;
            b.lastModifiedDate = new Date();
            values.push(<File>b);
        } else {
            values.push(value);
        }

        this.values.set(name, values);
    }

    delete(name: string): void {
        this.values.delete(name);
    }
    get(name: string): OkHTTPFormDataEntryValue | null {
        if (this.has(name)) {
            return this.values.get(name)[0];
        }

        return null;
    }
    getAll(name: string): OkHTTPFormDataEntryValue[] {
        const value = this.values.get(name);
        if (value) {
            return value;
        }
        return [];
    }
    has(name: string): boolean {
        return this.values.has(name);
    }
    set(name: string, value: string | Blob | OkHTTPFormDataEntryCommon, fileName?: string) {
        const values = new Array<OkHTTPFormDataEntryValue>();
        if (value instanceof Blob) {
            let b: any = value;
            b.name = fileName;
            b.lastModifiedDate = new Date();
            values.push(<File>b);
        } else {
            values.push(value);
        }
        this.values.set(name, values);
    }

    forEach(callbackfn: (value: OkHTTPFormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any) {
        this.values.forEach((mapVal, mapKey) => {
            mapVal.forEach((formVal) => {
                callbackfn(formVal, mapKey, this);
            });
        }, thisArg);
    }
}
