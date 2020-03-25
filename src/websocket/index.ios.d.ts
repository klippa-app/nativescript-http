import { HttpRequestOptions } from "@nativescript/core/http";
import { IWebsocketConnection, WebsocketCallbacks } from "./websocket.common";
export { IWebsocketConnection, WebsocketCallbacks } from "./websocket.common";
export declare function newWebsocketConnection(options: HttpRequestOptions, callbacks: WebsocketCallbacks): Promise<IWebsocketConnection>;
