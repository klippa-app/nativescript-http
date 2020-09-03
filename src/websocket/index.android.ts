import {HttpRequestOptions} from "@nativescript/core";
import {buildJavaOptions} from "../http.android";
import {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";
export {IWebsocketConnection, WebsocketCallbacks} from "./websocket.common";

export class WebsocketConnection implements IWebsocketConnection {
    constructor(private nativeConnection: okhttp3.WebSocket) {
    }

    queueSize(): number {
        return this.nativeConnection.queueSize();
    }

    send(text: string) {
        this.nativeConnection.send(text);
    }

    sendBinary(bytes: ArrayBuffer) {
        const typedArray = new Uint8Array(bytes as ArrayBuffer);
        const nativeBuffer = java.nio.ByteBuffer.wrap(Array.from(typedArray));
        const nativeByteString = okio.ByteString.of(nativeBuffer);
        this.nativeConnection.send(nativeByteString);
    }

    close(code: number, reason: string) {
        return this.nativeConnection.close(code, reason);
    }

    cancel() {
        this.nativeConnection.cancel();
    }
}

export function newWebsocketConnection(options: HttpRequestOptions, callbacks: WebsocketCallbacks): Promise<IWebsocketConnection> {
    return new Promise<IWebsocketConnection>((resolve, reject) => {
        try {
            // initialize the options
            const javaOptions = buildJavaOptions(options);

            @NativeClass()
            class OurListener extends okhttp3.WebSocketListener {
                onClosed(ws: okhttp3.WebSocket, code: number, reason: string) {
                    callbacks.onClosed(code, reason);
                }
                onMessage(ws: okhttp3.WebSocket, data: string | okio.ByteString) {
                    if (typeof data === "string") {
                        callbacks.onMessage(data);
                    } else {
                        const arrayBuffer = new Uint8Array(data.toByteArray()).buffer;
                        callbacks.onBinaryMessage(arrayBuffer);
                    }
                }
                onFailure(ws: okhttp3.WebSocket, t: java.lang.Throwable, response: okhttp3.Response) {
                    callbacks.onFailure(t.getMessage());
                }
                onOpen(ws: okhttp3.WebSocket, response: okhttp3.Response) {
                    callbacks.onOpen();
                }
                onClosing(ws: okhttp3.WebSocket, code: number, reason: string) {
                    callbacks.onClosing(code, reason);
                }
            }

            const listener = new OurListener();

            const websocket = com.klippa.NativeScriptHTTP.Async.Http.GetWebSocketConnection(javaOptions, listener);
            const websocketConnection = new WebsocketConnection(websocket);
            resolve(websocketConnection);
        } catch (e) {
            reject(e);
        }
    });
}
