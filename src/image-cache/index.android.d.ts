export { DownloadRequest, DownloadedData, DownloadError } from "@nativescript/core/ui/image-cache";
import * as common from "@nativescript/core/ui/image-cache";
export declare class Cache extends common.Cache {
    constructor();
    _downloadCore(imageRequest: common.DownloadRequest): void;
}
export declare class ImageCache extends Cache {
}
