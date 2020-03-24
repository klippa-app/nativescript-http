import { Component, OnInit } from "@angular/core";
import { request, HTTPFormData, HTTPFormDataEntry } from "@klippa/nativescript-http";
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
        this.testHTTPHandling();
    }

    testHTTPHandling() {
        const blob = new Blob(["123"], {
            type: "image/png"
        });

        const file = new File(["123"], "Henkus.png", {
            type: "image/png"
        });

        // @ts-ignore
        const arrayBuffer = Blob.InternalAccessor.getBuffer(file).buffer.slice(0) as ArrayBuffer;

        const formData = new FormData();
        formData.append("Henkus", "cool");
        formData.append("Henkus", "bellen?");

        const httpFormData = new HTTPFormData();
        httpFormData.append("Henkus", "cool");
        httpFormData.append("Henkus", "bellen?");
        httpFormData.append("blob", blob);
        httpFormData.append("file", file);
        httpFormData.append("arrayBuffer", arrayBuffer);
        httpFormData.append("blobEntry", new HTTPFormDataEntry(blob, null, blob.type));
        httpFormData.append("fileEntry", new HTTPFormDataEntry(file, file.name, file.type));
        httpFormData.append("arrayBufferEntry", new HTTPFormDataEntry(arrayBuffer));

        const baseURL = "https://en9ugvtm1xi1.x.pipedream.net";

        request({
            url: baseURL + "/blob",
            method: "POST",

            // @ts-ignore
            content: blob,
        });

        request({
            url: baseURL + "/file",
            method: "POST",

            // @ts-ignore
            content: file,
        });

        request({
            url: baseURL + "/arrayBuffer",
            method: "POST",
            content: arrayBuffer,
        });


        request({
            url: baseURL + "/formData",
            method: "POST",
            content: formData,
        });

        request({
            url: baseURL + "/httpFormData",
            method: "POST",
            content: httpFormData,
        });
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
            this.contentText = "Error while loading json: " + e;
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
            this.contentText = "Error while loading image: " + e;
            this.hasContent = true;
            this.isLoading = false;
        });
    }
}
