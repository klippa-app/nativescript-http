import { request } from "..";
export type { DownloadRequest, DownloadedData, DownloadError } from "@nativescript/core/ui/image-cache";
import * as common from "@nativescript/core/ui/image-cache";

export class Cache extends common.Cache {
    public _downloadCore(imageRequest: common.DownloadRequest) {
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
