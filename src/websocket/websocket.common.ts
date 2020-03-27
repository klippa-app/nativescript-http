export interface WebsocketCallbacks {
    /**
     * Invoked when both peers have indicated that no more messages will be transmitted and the connection has been successfully released.
     * No further calls to this callback will be made.
     * @param code
     * @param reason
     */
    onClosed: (code: number, reason: string) => void;

    /**
     * Invoked when a web socket has been closed due to an error reading from or writing to the network.
     * Both outgoing and incoming messages may have been lost. No further calls to this callback will be made.
     * @param error
     */
    onFailure: (error: string) => void;

    /**
     * Invoked when a web socket has been accepted by the remote peer and may begin transmitting messages.
     */
    onOpen: () => void;

    /**
     * Invoked when the remote peer has indicated that no more incoming messages will be transmitted.
     * @param code
     * @param reason
     */
    onClosing: (code: number, reason: string) => void;

    /**
     * Invoked when a text (type 0x1) message has been received.
     * @param text
     */
    onMessage: (text: string) => void;

    /**
     * Invoked when a binary (type 0x2) message has been received.
     * @param data
     */
    onBinaryMessage: (data: ArrayBuffer) => void;
}

export interface IWebsocketConnection {
    /**
     * Returns the size in bytes of all messages enqueued to be transmitted to the server.
     * This doesn’t include framing overhead. If compression is enabled, uncompressed messages size is used to calculate this value.
     * It also doesn’t include any bytes buffered by the operating system or network intermediaries.
     * This method returns 0 if no messages are waiting in the queue.
     * If may return a nonzero value after the web socket has been canceled;this indicates that enqueued messages were not transmitted.
     * Note: on iOS this value will always return 0.
     */
    queueSize(): number;

    /**
     * Attempts to enqueue text to be UTF-8 encoded and sent as a the data of a text (type 0x1).
     * @param text
     */
    send(text: string): void;

    /**
     * Attempts to enqueue bytes to be sent as a the data of a binary (type 0x2)
     * @param bytes
     */
    sendBinary(bytes: ArrayBuffer): void;

    /**
     * Attempts to initiate a graceful shutdown of this web socket.
     * Any already-enqueued messages will be transmitted before the close message is sent but subsequent calls to send will return false and their messages will not be enqueued.
     * Note: on iOS the reason is not used.
     * @param code
     * @param reason
     */
    close(code: number, reason: string): void;

    /**
     * Immediately and violently release resources held by this web socket, discarding any enqueued messages.
     * This does nothing if the web socket has already been closed or canceled.
     */
    cancel(): void;
}

