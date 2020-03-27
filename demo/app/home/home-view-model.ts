import { Observable } from "tns-core-modules/data/observable";

import {
    request,
    setImageParseMethod,
    ImageParseMethod,
    certificatePinningAdd,
    certificatePinningClear
} from "@klippa/nativescript-http";

import { ImageSource } from "@nativescript/core/image-source";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { newWebsocketConnection, IWebsocketConnection } from "@klippa/nativescript-http/websocket";

export class HomeViewModel extends Observable {
    isLoading = false;
    hasContent = false;
    contentType = "";
    contentText = "";
    contentImage: ImageSource;
    websocket: IWebsocketConnection;
    hasWebSocket = false;

    constructor() {
        super();
    }

    getText() {
        this.set("isLoading", true);

        request({
            url: "https://loripsum.net/api",
            method: "GET",
        }).then((res) => {
            this.set("contentType", "text");
            this.set("contentText", res.content.toString());
            this.set("hasContent", true);
            this.set("isLoading", false);
        }).catch((e) => {
            this.set("contentType", "text");
            this.set("contentText", "Error while loading text: " + e);
            this.set("hasContent", true);
            this.set("isLoading", false);
        });
    }

    getJson() {
        this.set("isLoading", true);

        request({
            url: "https://api.github.com/repos/klippa-app/nativescript-http",
            method: "GET",
        }).then((res) => {
            const jsonObject = res.content.toJSON();
            this.set("contentType", "text");
            this.set("contentText", JSON.stringify(jsonObject, null, 4));
            this.set("hasContent", true);
            this.set("isLoading", false);
        }).catch((e) => {
            this.set("contentType", "text");
            this.set("contentText", "Error while loading JSON: " + e);
            this.set("hasContent", true);
            this.set("isLoading", false);
        });
    }

    getImage() {
        this.set("isLoading", true);

        // Use this method when you want to use toImage() and the endpoint does not return a proper content type.
        setImageParseMethod(ImageParseMethod.ALWAYS);

        request({
            url: "https://via.placeholder.com/500",
            method: "GET",
        }).then((res) => {
            res.content.toImage().then((image) => {
                this.set("contentType", "image");
                this.set("contentImage", image);
                this.set("hasContent", true);
                this.set("isLoading", false);
            });
        }).catch((e) => {
            this.set("contentType", "text");
            this.set("contentText", "Error while loading image: " + e);
            this.set("hasContent", true);
            this.set("isLoading", false);
        });
    }

    startWebSocket() {
        this.set("contentType", "text");
        this.set("contentText", "Connecting websocket...");
        this.set("hasContent", true);
        this.set("isLoading", true);

        newWebsocketConnection({
            url: "wss://echo.websocket.org",
            method: "GET",
        }, {
            // It's important to wrap callbacks in ngzone when you do anything binding related.
            // If you don't do this, Angular won't update the views.
            onClosed: (code: number, reason: string) => {
                this.set("contentText", this.get("contentText") + "\n - Websocket connection is closed: " + code + ", " + reason);
                this.websocket = null;
                this.set("hasWebSocket", false);
            },
            onFailure: (error) => {
                this.set("contentType", "text");
                this.set("contentText", "Error while connecting to websocket: " + error);
                this.set("hasContent", true);
                this.set("isLoading", false);
                this.websocket = null;
                this.set("hasWebSocket", false);
            },
            onOpen: () => {
                this.set("contentType", "text");
                this.set("contentText", " - Websocket connection is opened");
                this.set("hasContent", true);
                this.set("isLoading", false);
            },
            onClosing: (code: number, reason: string) => {
                this.set("contentText", this.get("contentText") + "\n - Websocket connection is closing: " + code + ", " + reason);
            },
            onMessage: (text: string) => {
                this.set("contentText", this.get("contentText") + "\n - Got message on websocket: " + text);
            },
            onBinaryMessage: (data: ArrayBuffer) => {
                this.set("contentText", this.get("contentText") + "\n - Received binary message on websocket of length " + data.byteLength + ", content: " + String.fromCharCode.apply(null, Array.from(new Uint8Array(data))));
            }
        }).then((webSocket) => {
            this.websocket = webSocket;
            this.set("hasWebSocket", true);
        });
    }

    sendMessage() {
        dialogs.prompt({
            title: "Enter message",
            message: "Enter the message you want to send. The websocket server will echo the message back to you.",
            okButtonText: "Send message"
        }).then((res) => {
            if (res.result) {
                if (this.websocket) {
                    this.websocket.send(res.text);
                }
            }
        });
    }

    sendBinary() {
        if (this.websocket) {
            const blob = new Blob(["binaryFileContent"], {
                type: "image/png",
            });

            // @ts-ignore
            this.websocket.sendBinary(Blob.InternalAccessor.getBuffer(blob).buffer.slice(0) as ArrayBuffer);
        }
    }

    disconnectWebsocket() {
        if (this.websocket) {
            this.websocket.close(1000, "Goodbye");
        }
    }

    pinFake() {
        certificatePinningClear();
        // We add 2 fake certificate because Trustkit (iOS) requires a backup cert.
        certificatePinningAdd("*.placeholder.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        certificatePinningAdd("**.github.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        certificatePinningAdd("loripsum.net", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        this.contentType = "text";
        this.contentText = "Fake certificates pinned, try to do a request";
        this.hasContent = true;
        this.isLoading = false;
    }

    pinGood() {
        certificatePinningClear();
        certificatePinningAdd("*.placeholder.com", ["CDCU5TkA8n3L8+QM7dyTjfRlxWibigF+1cxMzRhlJV4=", "YLh1dUR9y6Kja30RrAn7JKnbQG/uEtLMkBgFF2Fuihg=", "Vjs8r4z+80wjNcr1YKepWQboSIRi63WsWXhIMN+eWys="]);
        certificatePinningAdd("**.github.com", ["ORH27mxcLwxnNpR7e0i6pdDPWLXdpeWgr5bEfFVbxW8=", "k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws=", "WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18="]);
        certificatePinningAdd("loripsum.net", ["7ReOzYJ7YC1mMc2CWTuaMDuzynt8xZ+HDQ6K8o+4okk=", "YLh1dUR9y6Kja30RrAn7JKnbQG/uEtLMkBgFF2Fuihg=", "Vjs8r4z+80wjNcr1YKepWQboSIRi63WsWXhIMN+eWys="]);

        this.contentType = "text";
        this.contentText = "Good certificates pinned, try to do a request";
        this.hasContent = true;
        this.isLoading = false;
    }

    clearPins() {
        certificatePinningClear();
        this.contentType = "text";
        this.contentText = "Certificate pins cleared, try to do a request";
        this.hasContent = true;
        this.isLoading = false;
    }
}
