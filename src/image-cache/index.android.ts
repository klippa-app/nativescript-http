import { request } from "../http.android";
export { DownloadRequest, DownloadedData, DownloadError } from "@nativescript/core";
import {ImageCache as CommonImageCache, DownloadRequest as CommonDownloadRequest} from '@nativescript/core';

export class Cache extends CommonImageCache {
    constructor() {
        super();
    }

    public _downloadCore(imageRequest: CommonDownloadRequest) {
        request({
            url: imageRequest.url,
            method: "GET",
            // @ts-ignore
            forceImageParsing: true
        }).then((imageRes) => {
            imageRes.content.toImage().then((image) => {
                // @ts-ignore
                this._onDownloadCompleted(imageRequest.key, image.android);
            }).catch((err) => {
                // @ts-ignore
                this._onDownloadError(imageRequest.key, new Error(err));

            });
        }).catch((err) => {
            // @ts-ignore
            this._onDownloadError(imageRequest.key, new Error(err));
        });
    }
}

export class ImageCache extends Cache {}
