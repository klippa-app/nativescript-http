import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {
    request,
    setImageParseMethod,
    ImageParseMethod,
    clearCookies,
    setUserAgent,
    setConcurrencyLimits,
    certificatePinningAdd,
    certificatePinningClear
} from "@klippa/nativescript-http";

import { newWebsocketConnection, IWebsocketConnection } from "@klippa/nativescript-http/websocket";

import {HttpClient} from "@angular/common/http";
import {ImageSource} from "@nativescript/core";
import {Dialogs} from "@nativescript/core";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
    isLoading = false;
    hasContent = false;
    contentType = "";
    contentText = "";
    contentImage: ImageSource;
    websocket: IWebsocketConnection;

    constructor(protected http: HttpClient, private ngZone: NgZone) {

    }

    ngOnInit(): void {
        // Empty out the cookies whenever you want.
        clearCookies();

        // Set a custom user agent.
        setUserAgent("Klippa/HTTP Example App");

        // Setting concurrency limits, 20 at the same time, 2 to the same host.
        setConcurrencyLimits(20, 2);
    }

    ngOnDestroy(): void {
        if (this.websocket) {
            this.websocket.cancel();
        }
    }

    getText() {
        this.isLoading = true;

        this.http.get("https://5e1abf03f737076004bdc7e92a7f2096.m.pipedream.net/text", {
            responseType: "text",
        }).toPromise().then((res) => {
            this.contentType = "text";
            this.contentText = res;
            this.hasContent = true;
            this.isLoading = false;
        }).catch((e) => {
            this.contentType = "text";
            this.contentText = "Error while loading text: " + e.error;
            this.hasContent = true;
            this.isLoading = false;
        });
    }

    getJson() {
        this.isLoading = true;

        this.http.get("https://api.github.com/repos/klippa-app/nativescript-http", {
            responseType: "json",
        }).toPromise().then((res) => {
            const jsonObject = res;
            this.contentType = "text";
            this.contentText = JSON.stringify(jsonObject, null, 4);
            this.hasContent = true;
            this.isLoading = false;
        }).catch((e) => {
            this.contentType = "text";
            this.contentText = "Error while loading json: " + e.error;
            this.hasContent = true;
            this.isLoading = false;
        });
    }

    getImage() {
        this.isLoading = true;

        // Use this method when you want to use toImage() and the endpoint does not return a proper content type.
        setImageParseMethod(ImageParseMethod.ALWAYS);

        // Please don't download images using the Angular HTTP client.
        // The core HTTP request already decodes the image for you into an ImageSource on the background.
        // This makes image downloading way more efficient.
        request({
            url: "https://5e1abf03f737076004bdc7e92a7f2096.m.pipedream.net/image",
            method: "GET",
        }).then((res) => {
            res.content.toImage().then((image) => {
                this.contentType = "image";
                this.contentImage = image;
                this.hasContent = true;
                this.isLoading = false;
            });
        }).catch((e) => {
            this.contentType = "text";
            this.contentText = "Error while loading image: " + e;
            this.hasContent = true;
            this.isLoading = false;
        });
    }

    startWebSocket() {
        this.contentType = "text";
        this.contentText = "Connecting websocket...";
        this.hasContent = true;
        this.isLoading = true;

        newWebsocketConnection({
            url: "wss://echo.websocket.org",
            method: "GET",
        }, {
            // It's important to wrap callbacks in ngzone when you do anything binding related.
            // If you don't do this, Angular won't update the views.
            onClosed: (code: number, reason: string) => {
                this.ngZone.run(() => {
                    this.contentText += "\n - Websocket connection is closed: " + code + ", " + reason;
                    this.websocket = null;
                });
            },
            onFailure: (error) => {
                this.ngZone.run(() => {
                    this.contentType = "text";
                    this.contentText = "Error while connecting to websocket: " + error;
                    this.hasContent = true;
                    this.isLoading = false;
                    this.websocket = null;
                });
            },
            onOpen: () => {
                this.ngZone.run(() => {
                    this.contentType = "text";
                    this.contentText = " - Websocket connection is opened";
                    this.hasContent = true;
                    this.isLoading = false;
                });
            },
            onClosing: (code: number, reason: string) => {
                this.ngZone.run(() => {
                    this.contentText += "\n - Websocket connection is closing: " + code + ", " + reason;
                });
            },
            onMessage: (text: string) => {
                this.ngZone.run(() => {
                    this.contentText += "\n - Got message on websocket: " + text;
                });
            },
            onBinaryMessage: (data: ArrayBuffer) => {
                this.ngZone.run(() => {
                    this.contentText += "\n - Received binary message on websocket of length " + data.byteLength + ", content: " + String.fromCharCode.apply(null, Array.from(new Uint8Array(data)));
                });
            }
        }).then((webSocket) => {
            this.websocket = webSocket;
        });
    }

    sendMessage() {
        Dialogs.prompt({
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
