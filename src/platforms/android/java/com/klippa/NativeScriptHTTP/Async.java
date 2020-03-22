package com.klippa.NativeScriptHTTP;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Stack;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class Async {
    static final String TAG = "Async";
    static ThreadPoolExecutor executor = null;

    static ThreadPoolExecutor threadPoolExecutor() {
        if (executor == null) {
            int NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors();
            ThreadFactory backgroundPriorityThreadFactory = new PriorityThreadFactory(android.os.Process.THREAD_PRIORITY_BACKGROUND);

            executor = new ThreadPoolExecutor(
                    NUMBER_OF_CORES * 2,
                    NUMBER_OF_CORES * 2,
                    60L,
                    TimeUnit.SECONDS,
                    new LinkedBlockingQueue<Runnable>(),
                    backgroundPriorityThreadFactory
            );
        }

        return executor;
    }

    public interface CompleteCallback {
        void onComplete(Object result, Object tag);

        void onError(String error, Object tag);
    }

    static class PriorityThreadFactory implements ThreadFactory {
        private final int mThreadPriority;

        public PriorityThreadFactory(int threadPriority) {
            mThreadPriority = threadPriority;
        }

        @Override
        public Thread newThread(final Runnable runnable) {
            Runnable wrapperRunnable = new Runnable() {
                @Override
                public void run() {
                    try {
                        android.os.Process.setThreadPriority(mThreadPriority);
                    } catch (Throwable t) {

                    }
                    runnable.run();
                }
            };
            return new Thread(wrapperRunnable);
        }
    }

    public static class Http {
        private static final String GET_METHOD = "GET";
        private static final String DELETE_METHOD = "DELETE";
        private static final String HEAD_METHOD = "HEAD";
        private static OkHttpClient client;

        public static void MakeRequest(final RequestOptions options, final CompleteCallback callback, final Object context) {
            if (client == null) {
                client = new OkHttpClient.Builder()
                    .writeTimeout(60, TimeUnit.SECONDS)
                    .readTimeout(60, TimeUnit.SECONDS)
                    .cookieJar(new MemoryCookieJar())
                    .connectTimeout(60, TimeUnit.SECONDS)
                    .build();
            }

            final android.os.Handler mHandler = new android.os.Handler();
            threadPoolExecutor().execute(new Runnable() {
                @Override
                public void run() {
                    final HttpRequestTask task = new HttpRequestTask(callback, context);
                    final RequestResult result = task.doInBackground(options);
                    mHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            task.onPostExecute(result);
                        }
                    });
                }
            });
        }

        public static class KeyValuePair {
            public String key;
            public String value;

            public KeyValuePair(String key, String value) {
                this.key = key;
                this.value = value;
            }
        }

        public static class RequestOptions {
            public String url;
            public String method;
            public ArrayList<KeyValuePair> headers;
            public RequestBody content;
            public int timeout = -1;
            public int screenWidth = -1;
            public int screenHeight = -1;
            public boolean dontFollowRedirects = false;

            public void addHeaders(Request.Builder requestBuilder) {
                if (this.headers == null) {
                    return;
                }

                for (KeyValuePair pair : this.headers) {
                    String key = pair.key.toString();
                    requestBuilder.addHeader(key, pair.value.toString());
                }
            }
        }

        public static class RequestResult {
            public ByteArrayOutputStream raw;
            public ArrayList<KeyValuePair> headers = new ArrayList<KeyValuePair>();
            public int statusCode;
            public String responseAsString;
            public Bitmap responseAsImage;
            public Exception error;
            public String url;
            public String statusText;

            public void getHeaders(Response response) {
                Headers headers = response.headers();
                if (headers == null) {
                    // no headers, this may happen if there is no internet connection currently available
                    return;
                }

                int size = headers.size();
                if (size == 0) {
                    return;
                }

                for (int i = 0; i < headers.size(); i++) {
                    this.headers.add(new KeyValuePair(headers.name(i), headers.value(i)));
                }
            }

            public void readResponseStream(Response response, Stack<Closeable> openedStreams, RequestOptions options) throws IOException {
                ResponseBody responseBody = response.body();
                if (responseBody == null) {
                    // responseBody can be null in case of no body.
                    return;
                }

                int contentLength = ((int) responseBody.contentLength());
                InputStream inStream = responseBody.byteStream();

                openedStreams.push(inStream);

                BufferedInputStream buffer = new BufferedInputStream(inStream, 4096);
                openedStreams.push(buffer);

                ByteArrayOutputStream2 responseStream = contentLength != -1 ? new ByteArrayOutputStream2(contentLength) : new ByteArrayOutputStream2();
                openedStreams.push(responseStream);

                byte[] buff = new byte[4096];
                int read = -1;
                while ((read = buffer.read(buff, 0, buff.length)) != -1) {
                    responseStream.write(buff, 0, read);
                }

                this.raw = responseStream;
                buff = null;

                // Only decode as image with proper content type.
                MediaType contentType = responseBody.contentType();
                if (contentType != null && contentType.toString().startsWith("image/")) {
                    // make the byte array conversion here, not in the JavaScript
                    // world for better performance
                    // since we do not have some explicit way to determine whether
                    // the content-type is image
                    try {
                        // TODO: Generally this approach will not work for very
                        // large files
                        BitmapFactory.Options bitmapOptions = new BitmapFactory.Options();
                        bitmapOptions.inJustDecodeBounds = true;

                        // check the size of the bitmap first
                        BitmapFactory.decodeByteArray(responseStream.buf(), 0, responseStream.size(), bitmapOptions);
                        if (bitmapOptions.outWidth > 0 && bitmapOptions.outHeight > 0) {
                            int scale = 1;
                            final int height = bitmapOptions.outHeight;
                            final int width = bitmapOptions.outWidth;

                            if ((options.screenWidth > 0 && bitmapOptions.outWidth > options.screenWidth) ||
                                    (options.screenHeight > 0 && bitmapOptions.outHeight > options.screenHeight)) {
                                final int halfHeight = height / 2;
                                final int halfWidth = width / 2;

                                // scale down the image since it is larger than the
                                // screen resolution
                                while ((halfWidth / scale) > options.screenWidth && (halfHeight / scale) > options.screenHeight) {
                                    scale *= 2;
                                }
                            }

                            bitmapOptions.inJustDecodeBounds = false;
                            bitmapOptions.inSampleSize = scale;
                            this.responseAsImage = BitmapFactory.decodeByteArray(responseStream.buf(), 0, responseStream.size(), bitmapOptions);
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to decode byte array, Exception: " + e.getMessage());
                    }
                }

                if (this.responseAsImage == null) {
                    // convert to string
                    this.responseAsString = responseStream.toString();
                }
            }

            public static final class ByteArrayOutputStream2 extends ByteArrayOutputStream {
                public ByteArrayOutputStream2() {
                    super();
                }

                public ByteArrayOutputStream2(int size) {
                    super(size);
                }

                /**
                 * Returns the internal buffer of this ByteArrayOutputStream, without copying.
                 */
                public synchronized byte[] buf() {
                    return this.buf;
                }
            }
        }

        static class HttpRequestTask {
            private CompleteCallback callback;
            private Object context;

            public HttpRequestTask(CompleteCallback callback, Object context) {
                this.callback = callback;
                this.context = context;
            }

            protected RequestResult doInBackground(RequestOptions... params) {
                RequestResult result = new RequestResult();
                Stack<Closeable> openedStreams = new Stack<Closeable>();

                try {
                    OkHttpClient.Builder clientBuilder = client.newBuilder();
                    RequestOptions options = params[0];

                    Request.Builder requestBuilder = new Request.Builder();
                    requestBuilder.url(options.url);

                    // set the request method
                    String requestMethod = options.method != null ? options.method.toUpperCase(Locale.ENGLISH) : GET_METHOD;
                    requestBuilder.method(requestMethod, options.content);

                    // add the headers
                    options.addHeaders(requestBuilder);

                    // apply timeout
                    if (options.timeout > 0) {
                        clientBuilder.writeTimeout(options.timeout, TimeUnit.MILLISECONDS);
                        clientBuilder.readTimeout(options.timeout, TimeUnit.MILLISECONDS);
                        clientBuilder.connectTimeout(options.timeout, TimeUnit.MILLISECONDS);
                    }

                    // don't follow redirect (30x) responses; by default, HttpURLConnection follows them.
                    if (options.dontFollowRedirects) {
                        clientBuilder.followRedirects(false);
                    }

                    // Do not attempt to write the content (body) for DELETE method, Java will throw directly
                    if (!requestMethod.equals(DELETE_METHOD)) {
                        //options.writeCont ent(connection, openedStreams);
                    }

                    OkHttpClient requestClient = clientBuilder.build();
                    Request request = requestBuilder.build();


                    Response response = requestClient.newCall(request).execute();
                    Log.i("OkHTTP", response.toString());
                    // close the opened streams (saves copy-paste implementation
                    // in each method that throws IOException)
                    this.closeOpenedStreams(openedStreams);

                    // build the result
                    result.getHeaders(response);
                    result.url = options.url;
                    result.statusCode = response.code();
                    result.statusText = response.message();
                    if (!requestMethod.equals(HEAD_METHOD)) {
                       result.readResponseStream(response, openedStreams, options);
                    }

                    // close the opened streams (saves copy-paste implementation
                    // in each method that throws IOException)
                    this.closeOpenedStreams(openedStreams);

                    return result;
                } catch (Exception e) // TODO: Catch all exceptions?
                {
                    result.error = e;

                    return result;
                } finally {
                    try {
                        this.closeOpenedStreams(openedStreams);
                    } catch (IOException e) {
                        Log.e(TAG, "Failed to close opened streams, IOException: " + e.getMessage());
                    }
                }
            }

            protected void onPostExecute(final RequestResult result) {
                if (result != null) {
                    this.callback.onComplete(result, this.context);
                } else {
                    this.callback.onError("HttpRequestTask returns no result.", this.context);
                }
            }

            private void closeOpenedStreams(Stack<Closeable> streams) throws IOException {
                while (streams.size() > 0) {
                    Closeable stream = streams.pop();
                    stream.close();
                }
            }
        }
    }
}
