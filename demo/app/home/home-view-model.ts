import { Observable } from "tns-core-modules/data/observable";
import {request } from "@klippa/nativescript-http";
import {ImageSource} from "@nativescript/core/image-source";

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
}
