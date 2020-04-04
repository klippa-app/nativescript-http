import {HttpRequestOptions} from "@nativescript/core/http";
import {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";
import {getCurrentCertificatePinningInstance, getCurrentUserAgent, USER_AGENT, USER_AGENT_HEADER} from "../http.ios";
import * as types from "@nativescript/core/utils/types";
export {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";

const connections: Array<SRWebSocket> = new Array<SRWebSocket>();
const delegates: Array<SRWebSocketDelegateImpl> = new Array<SRWebSocketDelegateImpl>();

export class WebsocketConnection implements IWebsocketConnection {
    constructor(private nativeConnection: SRWebSocket) {
    }

    queueSize(): number {
        return 0;
    }

    send(text: string) {
        this.nativeConnection.send(text);
    }

    sendBinary(bytes: ArrayBuffer) {
        const buffer = bytes as ArrayBuffer;
        this.nativeConnection.send(NSData.dataWithData(buffer as any));
    }

    close(code: number, reason: string) {
        return this.nativeConnection.closeWithCodeReason(code, reason);
    }

    cancel() {
        this.nativeConnection.close();
    }
}

class SRWebSocketDelegateImpl extends NSObject implements SRWebSocketDelegate {
    public static ObjCProtocols = [SRWebSocketDelegate];
    public callbacks: WebsocketCallbacks;

    webSocketDidCloseWithCodeReasonWasClean(webSocket: SRWebSocket, code: number, reason: string, wasClean: boolean) {
        this.callbacks.onClosed(code, reason);
    }

    webSocketDidFailWithError(webSocket: SRWebSocket, error: NSError) {
        this.callbacks.onFailure(error.localizedDescription);
    }

    webSocketDidOpen(webSocket: SRWebSocket) {
        this.callbacks.onOpen();
    }

    webSocketDidReceiveMessage(webSocket: SRWebSocket, message: any) {
        if (message && message.bytes) {
            this.callbacks.onBinaryMessage(interop.bufferFromData(message));
        } else {
            this.callbacks.onMessage(message);
        }
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

        const delegate: SRWebSocketDelegateImpl = <SRWebSocketDelegateImpl>SRWebSocketDelegateImpl.new();
        delegate.callbacks = callbacks;
        const socket = SRWebSocket.alloc().initWithURLRequest(urlRequest);
        socket.delegate = delegate;
        socket.open();

        connections.push(socket);
        delegates.push(delegate);

        const websocketConnection = new WebsocketConnection(socket);
        resolve(websocketConnection);
    });
}
