import {HttpRequestOptions} from "@nativescript/core/http";
import {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";
import {getCurrentUserAgent, USER_AGENT, USER_AGENT_HEADER} from "../http.ios";
import * as types from "@nativescript/core/utils/types";
export {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";

const connections: Array<WebSocket> = new Array<WebSocket>();

export class WebsocketConnection implements IWebsocketConnection {
    constructor(private nativeConnection: WebSocketClient) {
    }

    queueSize(): number {
        return 0;
    }

    send(text: string) {
        this.nativeConnection.write(text);
    }

    sendBinary(bytes: ArrayBuffer) {
        const buffer = bytes as ArrayBuffer;
        this.nativeConnection.write(NSData.dataWithData(buffer as any));
    }

    close(code: number, reason: string) {
        return this.nativeConnection.disconnect(code);
    }

    cancel() {
        this.nativeConnection.forceDisconnect();
    }
}

export function newWebsocketConnection(options: HttpRequestOptions, callbacks: WebsocketCallbacks): Promise<IWebsocketConnection> {
    return new Promise<IWebsocketConnection>((resolve, reject) => {
        const urlRequest = NSMutableURLRequest.requestWithURL(
            NSURL.URLWithString(options.url));

        let userAgent: string;
        if (options.headers) {
            for (let key in options.headers) {
                if (key.toLowerCase() === "user-agent") {
                    userAgent = options.headers[key];
                }
            }
        }

        if (!userAgent) {
            if (!options.headers) {
                options.headers = {};
            }

            options.headers[USER_AGENT_HEADER] = getCurrentUserAgent() ? getCurrentUserAgent() : USER_AGENT;
        }

        if (options.headers) {
            for (let header in options.headers) {
                urlRequest.setValueForHTTPHeaderField(options.headers[header] + "", header);
            }
        }

        if (types.isNumber(options.timeout)) {
            urlRequest.timeoutInterval = options.timeout / 1000;
        }

        // @todo: add certificate pinner.
        const socket = WebSocket.alloc().initWithRequest(urlRequest);
        socket.onEvent = (event) => {
            // @todo: implement handlers.
        };

        socket.connect();
        connections.push(socket);
        const websocketConnection = new WebsocketConnection(socket);
        resolve(websocketConnection);
    });
}
