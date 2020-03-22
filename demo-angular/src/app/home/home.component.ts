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

        request({
            url: "https://loripsum.net/api",
            method: "GET",
        }).then((res) => {
            this.contentType = "text";
            this.contentText = res.content.toString();
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

        request({
            url: "https://api.github.com/repos/klippa-app/nativescript-http",
            method: "GET",
        }).then((res) => {
            const jsonObject = res.content.toJSON();
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
