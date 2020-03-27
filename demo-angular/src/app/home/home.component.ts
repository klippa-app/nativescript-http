import { Component, OnInit } from "@angular/core";
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
import {HttpClient} from "@angular/common/http";
import {ImageSource} from "@nativescript/core/image-source";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    isLoading = false;
    hasContent = false;
    contentType = "";
    contentText = "";
    contentImage: ImageSource;

    constructor(protected http: HttpClient) {

    }

    ngOnInit(): void {
        // Empty out the cookies whenever you want.
        clearCookies();

        // Set a custom user agent.
        setUserAgent("Klippa/HTTP Example App");

        // Setting concurrency limits, 20 at the same time, 2 to the same host.
        setConcurrencyLimits(20, 2);
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

    pinFake() {
        certificatePinningClear();
        // We add 2 fake certificate because Trustkit (iOS) requires a backup cert.
        certificatePinningAdd("*.placeholder.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        certificatePinningAdd("**.github.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        certificatePinningAdd("loripsum.net", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
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
