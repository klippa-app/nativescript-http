import {HttpRequestOptions} from "@nativescript/core/http";
import {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";
export {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";

export function newWebsocketConnection(options: HttpRequestOptions, callbacks: WebsocketCallbacks): Promise<IWebsocketConnection> {
    return new Promise<IWebsocketConnection>((resolve, reject) => {
        reject("Not implemented");
    });
}
