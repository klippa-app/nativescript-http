import { Observable } from "tns-core-modules/data/observable";

import {
    request,
    setImageParseMethod,
    ImageParseMethod,
    certificatePinningAdd,
    certificatePinningClear
} from "@klippa/nativescript-http";

import { ImageSource } from "@nativescript/core/image-source";

export class HomeViewModel extends Observable {
    isLoading = false;
    hasContent = false;
    contentType = "";
    contentText = "";
    contentImage: ImageSource;

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
