<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
        </ActionBar>

        <GridLayout rows="auto, *" columns="*">
            <GridLayout row="0" rows="auto" columns="*, *, *, auto" v-show="!websocket">
                <Button col="0" text="Text" @tap="getText"></Button>
                <Button col="1" text="JSON" @tap="getJson"></Button>
                <Button col="2" text="Image" @tap="getImage"></Button>
                <Button col="3" text="Connect WebSocket" @tap="startWebSocket"></Button>
            </GridLayout>

            <GridLayout row="0" rows="auto" columns="*, *, *" v-show="websocket && !isLoading">
                <Button col="0" text="Send text" @tap="sendMessage"></Button>
                <Button col="1" text="Send binary" @tap="sendBinary"></Button>
                <Button col="2" text="Disconnect" @tap="disconnectWebsocket"></Button>
            </GridLayout>

            <GridLayout row="1" rows="*" columns="*" style="border-width: 1; border-color: #e0e0e0; margin: 10; padding: 10;">
                <ActivityIndicator :visibility="isLoading ? 'visible' : 'collapse'" :busy="isLoading"></ActivityIndicator>
                <Label :visibility="!hasContent && !isLoading ? 'visible' : 'collapse'" text="Content comes here" horizontalAlignment="center" verticalAlignment="center"></Label>
                <Label :visibility="hasContent && !isLoading && contentType == 'text' ? 'visible' : 'collapse'" :text="contentText" textWrap="true" horizontalAlignment="center" verticalAlignment="center"></Label>
                <Image :visibility="hasContent && !isLoading && contentType == 'image' ? 'visible' : 'collapse'" :src="contentImage" horizontalAlignment="center" verticalAlignment="center" stretch="none" ></Image>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import { request, setImageParseMethod, ImageParseMethod, clearCookies, setUserAgent, setConcurrencyLimits } from "@klippa/nativescript-http";
    import { newWebsocketConnection } from "@klippa/nativescript-http/websocket";
    import * as dialogs from "tns-core-modules/ui/dialogs";

    export default {
        data() {
            return {
                isLoading: false,
                hasContent: false,
                contentType: "",
                contentText: "",
                contentImage: null,
                websocket: null,
                hasWebSocket: false
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
            startWebSocket() {
                this.contentType = "text";
                this.contentText = "Connecting websocket...";
                this.hasContent = true;
                this.isLoading = true;

                newWebsocketConnection({
                    url: "wss://echo.websocket.org",
                    method: "GET",
                }, {
                    onClosed: (code, reason) => {
                        this.contentText += "\n - Websocket connection is closed: " + code + ", " + reason;
                        this.websocket = null;
                    },
                    onFailure: (error) => {
                        this.contentType = "text";
                        this.contentText = "Error while connecting to websocket: " + error;
                        this.hasContent = true;
                        this.isLoading = false;
                        this.websocket = null;
                    },
                    onOpen: () => {
                        this.contentType = "text";
                        this.contentText = " - Websocket connection is opened";
                        this.hasContent = true;
                        this.isLoading = false;
                    },
                    onClosing: (code, reason) => {
                        this.contentText += "\n - Websocket connection is closing: " + code + ", " + reason;
                    },
                    onMessage: (text) => {
                        this.contentText += "\n - Got message on websocket: " + text;
                    },
                    onBinaryMessage: (data) => {
                        this.contentText += "\n - Received binary message on websocket of length " + data.byteLength + ", content: " + String.fromCharCode.apply(null, Array.from(new Uint8Array(data)));
                    }
                }).then((webSocket) => {
                    this.websocket = webSocket;
                });
            },
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
            },
            sendBinary() {
                if (this.websocket) {
                    const blob = new Blob(["binaryFileContent"], {
                        type: "image/png",
                    });

                    // @ts-ignore
                    this.websocket.sendBinary(Blob.InternalAccessor.getBuffer(blob).buffer.slice(0));
                }
            },
            disconnectWebsocket() {
                if (this.websocket) {
                    this.websocket.close(1000, "Goodbye");
                }
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
