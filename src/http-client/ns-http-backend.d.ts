import { HttpRequest, HttpEvent, HttpXhrBackend } from "@angular/common/http";
import { Observable } from "rxjs";
import { NSFileSystem } from "nativescript-angular/file-system/ns-file-system";
import { NSHTTPXhr } from "./xhr";
export declare class NsHttpBackEnd extends HttpXhrBackend {
    private nsFileSystem;
    constructor(xhrFactory: NSHTTPXhr, nsFileSystem: NSFileSystem);
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    private handleLocalFileRequest;
}
