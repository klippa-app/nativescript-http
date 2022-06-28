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
import {ImageSource} from "@nativescript/core/image-source";
import * as dialogs from "tns-core-modules/ui/dialogs";

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

        this.http.get("https://loripsum.net/api", {
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
            url: "https://via.placeholder.com/500",
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
            url: "wss://ws.postman-echo.com/raw",
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
        certificatePinningAdd("*.placeholder.com", ["DlYSp/cLxpoA6dBq3hszKK/r0p7Q/pnSRVQnAdQNf/o=", "FEzVOUp4dF3gI0ZVPRJhFbSJVXR+uQmMH65xhs1glH4=", "Y9mvm0exBk1JoQ57f9Vm28jKo5lFm/woKcVxrYxu80o="]);
        certificatePinningAdd("**.github.com", ["uyPYgclc5Jt69vKu92vci6etcBDY8UNTyrHQZJpVoZY=", "e0IRz5Tio3GA1Xs4fUVWmH1xHDiH2dMbVtCBSkOIdqM=", "r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E="]);
        certificatePinningAdd("loripsum.net", ["9lgc3b7Et90OtTYg2rJRAl18RhhQIuI/z9NCj27wSpc=", "jQJTbIh0grw0/1TkHSumWb+Fs0Ggogr621gT3PvPKG0=", "C5+lpZ7tcVwmwQIMcRtPbsQtWLABXhQzejna0wHFr8M="]);

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
