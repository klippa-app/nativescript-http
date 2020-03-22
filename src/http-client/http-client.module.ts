import { NgModule } from "@angular/core";

import { HttpClientModule, HttpBackend } from "@angular/common/http";

import { NSFileSystem } from "nativescript-angular/file-system/ns-file-system";
import { NsHttpBackEnd } from "./ns-http-backend";
import {NSHTTPXhr} from "./xhr";

@NgModule({
    providers: [
        NSFileSystem,
        NsHttpBackEnd,
        NSHTTPXhr,
        { provide: HttpBackend, useExisting: NsHttpBackEnd },
    ],
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ]
})
export class NativeScriptHttpClientModule {
}
