export { DownloadRequest, DownloadedData, DownloadError } from "@nativescript/core";
import { ImageCache as CommonImageCache, DownloadRequest as CommonDownloadRequest } from '@nativescript/core';
export declare class Cache extends CommonImageCache {
    constructor();
    _downloadCore(imageRequest: CommonDownloadRequest): void;
}
export declare class ImageCache extends Cache {
}
