<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
        </ActionBar>

        <GridLayout rows="auto, auto, *" columns="*">
            <GridLayout row="0" rows="auto" columns="*, *, *">
                <Button col="0" text="Get text" @tap="getText"></Button>
                <Button col="1" text="Get JSON" @tap="getJson"></Button>
                <Button col="2" text="Get Image" @tap="getImage"></Button>
            </GridLayout>

            <GridLayout row="1" rows="auto" columns="*, *, *">
                <Button col="0" text="Pin fake cert" @tap="pinFake"></Button>
                <Button col="1" text="Pin good cert" @tap="pinGood"></Button>
                <Button col="2" text="Clear pins" @tap="clearPins"></Button>
            </GridLayout>

            <GridLayout row="2" rows="*" columns="*" style="border-width: 1; border-color: #e0e0e0; margin: 10; padding: 10;">
                <ActivityIndicator :visibility="isLoading ? 'visible' : 'collapse'" :busy="isLoading"></ActivityIndicator>
                <Label :visibility="!hasContent && !isLoading ? 'visible' : 'collapse'" text="Content comes here" horizontalAlignment="center" verticalAlignment="center"></Label>
                <Label :visibility="hasContent && !isLoading && contentType == 'text' ? 'visible' : 'collapse'" :text="contentText" textWrap="true" horizontalAlignment="center" verticalAlignment="center"></Label>
                <Image :visibility="hasContent && !isLoading && contentType == 'image' ? 'visible' : 'collapse'" :src="contentImage" horizontalAlignment="center" verticalAlignment="center" stretch="none" ></Image>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
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

    export default {
        data() {
            return {
                isLoading: false,
                hasContent: false,
                contentType: "",
                contentText: "",
                contentImage: null
            }
        },
        mounted() {
            // Empty out the cookies whenever you want.
            clearCookies();

            // Set a custom user agent.
            setUserAgent("Klippa/HTTP Example App");

            // Setting concurrency limits, 20 at the same time, 2 to the same host.
            setConcurrencyLimits(20, 2);
        },
        methods: {
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
            },
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
                    this.contentText = "Error while loading json: " + e;
                    this.hasContent = true;
                    this.isLoading = false;
                });
            },
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
            },
            pinFake() {
                certificatePinningClear();
                certificatePinningAdd("*.placeholder.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
                certificatePinningAdd("**.github.com", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
                certificatePinningAdd("loripsum.net", ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
                this.contentType = "text";
                this.contentText = "Fake certificates pinned, try to do a request";
                this.hasContent = true;
                this.isLoading = false;
            },
            pinGood() {
                certificatePinningClear();
                certificatePinningAdd("*.placeholder.com", ["CDCU5TkA8n3L8+QM7dyTjfRlxWibigF+1cxMzRhlJV4=", "YLh1dUR9y6Kja30RrAn7JKnbQG/uEtLMkBgFF2Fuihg=", "Vjs8r4z+80wjNcr1YKepWQboSIRi63WsWXhIMN+eWys="]);
                certificatePinningAdd("**.github.com", ["ORH27mxcLwxnNpR7e0i6pdDPWLXdpeWgr5bEfFVbxW8=", "k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws=", "WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18="]);
                certificatePinningAdd("loripsum.net", ["7ReOzYJ7YC1mMc2CWTuaMDuzynt8xZ+HDQ6K8o+4okk=", "YLh1dUR9y6Kja30RrAn7JKnbQG/uEtLMkBgFF2Fuihg=", "Vjs8r4z+80wjNcr1YKepWQboSIRi63WsWXhIMN+eWys="]);

                this.contentType = "text";
                this.contentText = "Good certificates pinned, try to do a request";
                this.hasContent = true;
                this.isLoading = false;
            },
            clearPins() {
                certificatePinningClear();
                this.contentType = "text";
                this.contentText = "Certificate pins cleared, try to do a request";
                this.hasContent = true;
                this.isLoading = false;
            }
        },
        computed: {
            message() {
                return "Blank {N}-Vue app";
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
