import { Component, OnInit } from "@angular/core";
import {request } from "@klippa/nativescript-http";
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
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
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
            this.contentText = "Error while loading text: " + e;
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
            this.contentText = "Error while loading text: " + e;
            this.hasContent = true;
            this.isLoading = false;
        });
    }

    getImage() {
        this.isLoading = true;

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
            this.contentText = "Error while loading text: " + e;
            this.hasContent = true;
            this.isLoading = false;
        });
    }
}
