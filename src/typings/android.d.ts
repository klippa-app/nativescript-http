/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module klippa {
		export module NativeScriptHTTP {
			export class Async {
				public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async>;
				public constructor();
			}
			export module Async {
				export class CompleteCallback {
					public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.CompleteCallback>;
					/**
					 * Constructs a new instance of the com.klippa.NativeScriptHTTP.Async$CompleteCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onComplete(param0: any, param1: any): void;
						onError(param0: string, param1: any): void;
					});
					public constructor();
					public onComplete(param0: any, param1: any): void;
					public onError(param0: string, param1: any): void;
				}
				export class Http {
					public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http>;
					public static SetConcurrencyLimits(param0: number, param1: number): void;
					public static ClearCookies(): void;
					public static MakeRequest(param0: com.klippa.NativeScriptHTTP.Async.Http.RequestOptions, param1: com.klippa.NativeScriptHTTP.Async.CompleteCallback, param2: any): void;
					public constructor();
					public static InitClient(): void;
					public static GetWebSocketConnection(param0: com.klippa.NativeScriptHTTP.Async.Http.RequestOptions, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
					public static SetImageParseMethod(param0: com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod): void;
				}
				export module Http {
					export class HttpRequestTask {
						public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.HttpRequestTask>;
						public constructor(param0: com.klippa.NativeScriptHTTP.Async.CompleteCallback, param1: any);
						public parseResponse(param0: okhttp3.Response, param1: native.Array<com.klippa.NativeScriptHTTP.Async.Http.RequestOptions>): com.klippa.NativeScriptHTTP.Async.Http.RequestResult;
						public buildClient(param0: native.Array<com.klippa.NativeScriptHTTP.Async.Http.RequestOptions>): okhttp3.OkHttpClient;
						public buildRequest(param0: native.Array<com.klippa.NativeScriptHTTP.Async.Http.RequestOptions>): okhttp3.Request;
						public onPostExecute(param0: com.klippa.NativeScriptHTTP.Async.Http.RequestResult): void;
					}
					export class ImageParseMethod {
						public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod>;
						public static NEVER: com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod;
						public static CONTENTTYPE: com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod;
						public static ALWAYS: com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod;
						public static values(): native.Array<com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod>;
						public static valueOf(param0: string): com.klippa.NativeScriptHTTP.Async.Http.ImageParseMethod;
					}
					export class KeyValuePair {
						public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair>;
						public key: string;
						public value: string;
						public constructor(param0: string, param1: string);
					}
					export class RequestOptions {
						public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.RequestOptions>;
						public url: string;
						public method: string;
						public headers: java.util.ArrayList<com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair>;
						public content: okhttp3.RequestBody;
						public timeout: number;
						public screenWidth: number;
						public screenHeight: number;
						public dontFollowRedirects: boolean;
						public constructor();
						public addHeaders(param0: okhttp3.Request.Builder): void;
					}
					export class RequestResult {
						public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.RequestResult>;
						public raw: java.io.ByteArrayOutputStream;
						public headers: java.util.ArrayList<com.klippa.NativeScriptHTTP.Async.Http.KeyValuePair>;
						public statusCode: number;
						public responseAsString: string;
						public responseAsImage: globalAndroid.graphics.Bitmap;
						public error: java.lang.Exception;
						public url: string;
						public statusText: string;
						public getHeaders(param0: okhttp3.Response): void;
						public constructor();
						public readResponseStream(param0: okhttp3.Response, param1: java.util.Stack<java.io.Closeable>, param2: com.klippa.NativeScriptHTTP.Async.Http.RequestOptions): void;
					}
					export module RequestResult {
						export class ByteArrayOutputStream2 {
							public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.Http.RequestResult.ByteArrayOutputStream2>;
							public constructor();
							public buf(): native.Array<number>;
							public constructor(param0: number);
						}
					}
				}
				export class PriorityThreadFactory {
					public static class: java.lang.Class<com.klippa.NativeScriptHTTP.Async.PriorityThreadFactory>;
					public newThread(param0: java.lang.Runnable): java.lang.Thread;
					public constructor(param0: number);
				}
			}
		}
	}
}

declare module com {
	export module klippa {
		export module NativeScriptHTTP {
			export class CookieCache extends java.lang.Iterable<okhttp3.Cookie> {
				public static class: java.lang.Class<com.klippa.NativeScriptHTTP.CookieCache>;
				/**
				 * Constructs a new instance of the com.klippa.NativeScriptHTTP.CookieCache interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					addAll(param0: java.util.Collection<okhttp3.Cookie>): void;
					clear(): void;
				});
				public constructor();
				public addAll(param0: java.util.Collection<okhttp3.Cookie>): void;
				public clear(): void;
			}
		}
	}
}

declare module com {
	export module klippa {
		export module NativeScriptHTTP {
			export class IdentifiableCookie {
				public static class: java.lang.Class<com.klippa.NativeScriptHTTP.IdentifiableCookie>;
				public hashCode(): number;
				public equals(param0: any): boolean;
			}
		}
	}
}

declare module com {
	export module klippa {
		export module NativeScriptHTTP {
			export class MemoryCookieJar extends okhttp3.CookieJar {
				public static class: java.lang.Class<com.klippa.NativeScriptHTTP.MemoryCookieJar>;
				public loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
				public saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module klippa {
		export module NativeScriptHTTP {
			export class SetCookieCache extends com.klippa.NativeScriptHTTP.CookieCache {
				public static class: java.lang.Class<com.klippa.NativeScriptHTTP.SetCookieCache>;
				public addAll(param0: java.util.Collection<okhttp3.Cookie>): void;
				public clear(): void;
				public iterator(): java.util.Iterator<okhttp3.Cookie>;
				public constructor();
			}
			export module SetCookieCache {
				export class SetCookieCacheIterator extends java.util.Iterator<okhttp3.Cookie> {
					public static class: java.lang.Class<com.klippa.NativeScriptHTTP.SetCookieCache.SetCookieCacheIterator>;
					public next(): okhttp3.Cookie;
					public constructor(param0: com.klippa.NativeScriptHTTP.SetCookieCache);
					public hasNext(): boolean;
					public remove(): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export class Address {
		public static class: java.lang.Class<okhttp3.Address>;
		/** @deprecated */
		public proxyAuthenticator(): okhttp3.Authenticator;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		public proxy(): java.net.Proxy;
		public equals(param0: any): boolean;
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public equalsNonHostDollarokhttp(param0: okhttp3.Address): boolean;
		/** @deprecated */
		public proxySelector(): java.net.ProxySelector;
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public protocols(): java.util.List<okhttp3.Protocol>;
		public protocols(): java.util.List<okhttp3.Protocol>;
		public dns(): okhttp3.Dns;
		public proxyAuthenticator(): okhttp3.Authenticator;
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public hashCode(): number;
		public constructor(param0: string, param1: number, param2: okhttp3.Dns, param3: javax.net.SocketFactory, param4: javax.net.ssl.SSLSocketFactory, param5: javax.net.ssl.HostnameVerifier, param6: okhttp3.CertificatePinner, param7: okhttp3.Authenticator, param8: java.net.Proxy, param9: java.util.List<any>, param10: java.util.List<okhttp3.ConnectionSpec>, param11: java.net.ProxySelector);
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		/** @deprecated */
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public url(): okhttp3.HttpUrl;
		public proxySelector(): java.net.ProxySelector;
		public url(): okhttp3.HttpUrl;
		public toString(): string;
		/** @deprecated */
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public dns(): okhttp3.Dns;
		public socketFactory(): javax.net.SocketFactory;
		/** @deprecated */
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		/** @deprecated */
		public socketFactory(): javax.net.SocketFactory;
	}
}

declare module okhttp3 {
	export class Authenticator {
		public static class: java.lang.Class<okhttp3.Authenticator>;
		/**
		 * Constructs a new instance of the okhttp3.Authenticator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
			<clinit>(): void;
		});
		public constructor();
		public static NONE: okhttp3.Authenticator;
		public static Companion: okhttp3.Authenticator.Companion;
		public authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
	}
	export module Authenticator {
		export class Companion {
			public static class: java.lang.Class<okhttp3.Authenticator.Companion>;
		}
		export module Companion {
			export class AuthenticatorNone extends okhttp3.Authenticator {
				public static class: java.lang.Class<okhttp3.Authenticator.Companion.AuthenticatorNone>;
				public authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export class Cache {
		public static class: java.lang.Class<okhttp3.Cache>;
		public static Companion: okhttp3.Cache.Companion;
		public trackConditionalCacheHitDollarokhttp(): void;
		public close(): void;
		public directory(): java.io.File;
		public writeAbortCount(): number;
		public constructor(param0: java.io.File, param1: number);
		public constructor(param0: java.io.File, param1: number, param2: okhttp3.internal.io.FileSystem);
		/** @deprecated */
		public directory(): java.io.File;
		public isClosed(): boolean;
		public delete(): void;
		public putDollarokhttp(param0: okhttp3.Response): okhttp3.internal.cache.CacheRequest;
		public size(): number;
		public updateDollarokhttp(param0: okhttp3.Response, param1: okhttp3.Response): void;
		public trackResponseDollarokhttp(param0: okhttp3.internal.cache.CacheStrategy): void;
		public urls(): java.util.Iterator<string>;
		public maxSize(): number;
		public getWriteSuccessCountDollarokhttp(): number;
		public getCacheDollarokhttp(): okhttp3.internal.cache.DiskLruCache;
		public getDollarokhttp(param0: okhttp3.Request): okhttp3.Response;
		public static key(param0: okhttp3.HttpUrl): string;
		public setWriteAbortCountDollarokhttp(param0: number): void;
		public setWriteSuccessCountDollarokhttp(param0: number): void;
		public evictAll(): void;
		public networkCount(): number;
		public getWriteAbortCountDollarokhttp(): number;
		public requestCount(): number;
		public flush(): void;
		public removeDollarokhttp(param0: okhttp3.Request): void;
		public initialize(): void;
		public writeSuccessCount(): number;
		public hitCount(): number;
	}
	export module Cache {
		export class CacheResponseBody extends okhttp3.ResponseBody {
			public static class: java.lang.Class<okhttp3.Cache.CacheResponseBody>;
			public contentLength(): number;
			public source(): okio.BufferedSource;
			public contentType(): okhttp3.MediaType;
			public getSnapshotDollarokhttp(): okhttp3.internal.cache.DiskLruCache.Snapshot;
			public constructor();
			public constructor(param0: okhttp3.internal.cache.DiskLruCache.Snapshot, param1: string, param2: string);
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.Cache.Companion>;
			public varyMatches(param0: okhttp3.Response, param1: okhttp3.Headers, param2: okhttp3.Request): boolean;
			public readIntDollarokhttp(param0: okio.BufferedSource): number;
			public varyHeaders(param0: okhttp3.Response): okhttp3.Headers;
			public key(param0: okhttp3.HttpUrl): string;
			public hasVaryAll(param0: okhttp3.Response): boolean;
		}
		export class Entry {
			public static class: java.lang.Class<okhttp3.Cache.Entry>;
			public static Companion: okhttp3.Cache.Entry.Companion;
			public matches(param0: okhttp3.Request, param1: okhttp3.Response): boolean;
			public constructor(param0: okhttp3.Response);
			public constructor(param0: okio.Source);
			public response(param0: okhttp3.internal.cache.DiskLruCache.Snapshot): okhttp3.Response;
			public writeTo(param0: okhttp3.internal.cache.DiskLruCache.Editor): void;
		}
		export module Entry {
			export class Companion {
				public static class: java.lang.Class<okhttp3.Cache.Entry.Companion>;
			}
		}
		export class RealCacheRequest extends okhttp3.internal.cache.CacheRequest {
			public static class: java.lang.Class<okhttp3.Cache.RealCacheRequest>;
			public body(): okio.Sink;
			public setDoneDollarokhttp(param0: boolean): void;
			public abort(): void;
			public getDoneDollarokhttp(): boolean;
			public constructor(param0: okhttp3.internal.cache.DiskLruCache.Editor);
		}
	}
}

declare module okhttp3 {
	export class CacheControl {
		public static class: java.lang.Class<okhttp3.CacheControl>;
		public static FORCE_NETWORK: okhttp3.CacheControl;
		public static FORCE_CACHE: okhttp3.CacheControl;
		public static Companion: okhttp3.CacheControl.Companion;
		/** @deprecated */
		public mustRevalidate(): boolean;
		public maxStaleSeconds(): number;
		public toString(): string;
		public mustRevalidate(): boolean;
		public static parse(param0: okhttp3.Headers): okhttp3.CacheControl;
		/** @deprecated */
		public maxAgeSeconds(): number;
		/** @deprecated */
		public sMaxAgeSeconds(): number;
		/** @deprecated */
		public noTransform(): boolean;
		/** @deprecated */
		public noStore(): boolean;
		public minFreshSeconds(): number;
		public onlyIfCached(): boolean;
		public noCache(): boolean;
		public noTransform(): boolean;
		/** @deprecated */
		public minFreshSeconds(): number;
		/** @deprecated */
		public onlyIfCached(): boolean;
		public isPrivate(): boolean;
		/** @deprecated */
		public noCache(): boolean;
		public immutable(): boolean;
		/** @deprecated */
		public immutable(): boolean;
		public sMaxAgeSeconds(): number;
		/** @deprecated */
		public maxStaleSeconds(): number;
		public noStore(): boolean;
		public maxAgeSeconds(): number;
		public isPublic(): boolean;
	}
	export module CacheControl {
		export class Builder {
			public static class: java.lang.Class<okhttp3.CacheControl.Builder>;
			public noCache(): okhttp3.CacheControl.Builder;
			public maxStale(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public immutable(): okhttp3.CacheControl.Builder;
			public onlyIfCached(): okhttp3.CacheControl.Builder;
			public minFresh(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public maxAge(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public build(): okhttp3.CacheControl;
			public constructor();
			public noStore(): okhttp3.CacheControl.Builder;
			public noTransform(): okhttp3.CacheControl.Builder;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.CacheControl.Companion>;
			public parse(param0: okhttp3.Headers): okhttp3.CacheControl;
		}
	}
}

declare module okhttp3 {
	export class Call {
		public static class: java.lang.Class<okhttp3.Call>;
		/**
		 * Constructs a new instance of the okhttp3.Call interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			request(): okhttp3.Request;
			execute(): okhttp3.Response;
			enqueue(param0: okhttp3.Callback): void;
			cancel(): void;
			isExecuted(): boolean;
			isCanceled(): boolean;
			timeout(): okio.Timeout;
			clone(): okhttp3.Call;
		});
		public constructor();
		public isExecuted(): boolean;
		public clone(): okhttp3.Call;
		public request(): okhttp3.Request;
		public execute(): okhttp3.Response;
		public isCanceled(): boolean;
		public enqueue(param0: okhttp3.Callback): void;
		public cancel(): void;
		public timeout(): okio.Timeout;
	}
	export module Call {
		export class Factory {
			public static class: java.lang.Class<okhttp3.Call.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.Call$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				newCall(param0: okhttp3.Request): okhttp3.Call;
			});
			public constructor();
			public newCall(param0: okhttp3.Request): okhttp3.Call;
		}
	}
}

declare module okhttp3 {
	export class Callback {
		public static class: java.lang.Class<okhttp3.Callback>;
		/**
		 * Constructs a new instance of the okhttp3.Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			onFailure(param0: okhttp3.Call, param1: java.io.IOException): void;
			onResponse(param0: okhttp3.Call, param1: okhttp3.Response): void;
		});
		public constructor();
		public onResponse(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public onFailure(param0: okhttp3.Call, param1: java.io.IOException): void;
	}
}

declare module okhttp3 {
	export class CertificatePinner {
		public static class: java.lang.Class<okhttp3.CertificatePinner>;
		public static DEFAULT: okhttp3.CertificatePinner;
		public static Companion: okhttp3.CertificatePinner.Companion;
		public getCertificateChainCleanerDollarokhttp(): okhttp3.internal.tls.CertificateChainCleaner;
		public withCertificateChainCleanerDollarokhttp(param0: okhttp3.internal.tls.CertificateChainCleaner): okhttp3.CertificatePinner;
		public equals(param0: any): boolean;
		public static pin(param0: java.security.cert.Certificate): string;
		/** @deprecated */
		public check(param0: string, param1: native.Array<java.security.cert.Certificate>): void;
		public hashCode(): number;
		public findMatchingPinsDollarokhttp(param0: string): java.util.List<okhttp3.CertificatePinner.Pin>;
		public checkDollarokhttp(param0: string, param1: kotlin.jvm.functions.Function0<any>): void;
		public check(param0: string, param1: java.util.List<any>): void;
		public constructor(param0: java.util.Set<okhttp3.CertificatePinner.Pin>, param1: okhttp3.internal.tls.CertificateChainCleaner);
	}
	export module CertificatePinner {
		export class Builder {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Builder>;
			public build(): okhttp3.CertificatePinner;
			public add(param0: string, param1: native.Array<string>): okhttp3.CertificatePinner.Builder;
			public constructor();
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Companion>;
			public pin(param0: java.security.cert.Certificate): string;
			public newPinDollarokhttp(param0: string, param1: string): okhttp3.CertificatePinner.Pin;
			public toSha1ByteStringDollarokhttp(param0: java.security.cert.X509Certificate): okio.ByteString;
			public toSha256ByteStringDollarokhttp(param0: java.security.cert.X509Certificate): okio.ByteString;
		}
		export class Pin {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Pin>;
			public equals(param0: any): boolean;
			public matches(param0: string): boolean;
			public toString(): string;
			public component3(): okio.ByteString;
			public getHash(): okio.ByteString;
			public constructor(param0: string, param1: string, param2: okio.ByteString);
			public getHashAlgorithm(): string;
			public copy(param0: string, param1: string, param2: okio.ByteString): okhttp3.CertificatePinner.Pin;
			public component2(): string;
			public hashCode(): number;
		}
	}
}

declare module okhttp3 {
	export class Challenge {
		public static class: java.lang.Class<okhttp3.Challenge>;
		public equals(param0: any): boolean;
		public scheme(): string;
		/** @deprecated */
		public scheme(): string;
		public toString(): string;
		public constructor(param0: string, param1: java.util.Map<string,string>);
		public withCharset(param0: java.nio.charset.Charset): okhttp3.Challenge;
		public realm(): string;
		public constructor(param0: string, param1: string);
		public authParams(): java.util.Map<string,string>;
		public charset(): java.nio.charset.Charset;
		/** @deprecated */
		public charset(): java.nio.charset.Charset;
		/** @deprecated */
		public authParams(): java.util.Map<string,string>;
		public hashCode(): number;
		/** @deprecated */
		public realm(): string;
	}
}

declare module okhttp3 {
	export class CipherSuite {
		public static class: java.lang.Class<okhttp3.CipherSuite>;
		public static TLS_RSA_WITH_NULL_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_DES_CBC_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_3DES_EDE_CBC_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_RC4_40_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_NULL_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_SEED_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_EMPTY_RENEGOTIATION_INFO_SCSV: okhttp3.CipherSuite;
		public static TLS_FALLBACK_SCSV: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_CCM_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_CCM_8_SHA256: okhttp3.CipherSuite;
		public static Companion: okhttp3.CipherSuite.Companion;
		public javaName(): string;
		public static forJavaName(param0: string): okhttp3.CipherSuite;
		/** @deprecated */
		public javaName(): string;
		public toString(): string;
	}
	export module CipherSuite {
		export class Companion {
			public static class: java.lang.Class<okhttp3.CipherSuite.Companion>;
			public forJavaName(param0: string): okhttp3.CipherSuite;
			public getORDER_BY_NAMEDollarokhttp(): java.util.Comparator<string>;
		}
	}
}

declare module okhttp3 {
	export class Connection {
		public static class: java.lang.Class<okhttp3.Connection>;
		/**
		 * Constructs a new instance of the okhttp3.Connection interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			route(): okhttp3.Route;
			socket(): java.net.Socket;
			handshake(): okhttp3.Handshake;
			protocol(): okhttp3.Protocol;
		});
		public constructor();
		public route(): okhttp3.Route;
		public protocol(): okhttp3.Protocol;
		public handshake(): okhttp3.Handshake;
		public socket(): java.net.Socket;
	}
}

declare module okhttp3 {
	export class ConnectionPool {
		public static class: java.lang.Class<okhttp3.ConnectionPool>;
		public constructor();
		public connectionCount(): number;
		public getDelegateDollarokhttp(): okhttp3.internal.connection.RealConnectionPool;
		public evictAll(): void;
		public idleConnectionCount(): number;
		public constructor(param0: okhttp3.internal.connection.RealConnectionPool);
		public constructor(param0: number, param1: number, param2: java.util.concurrent.TimeUnit);
	}
}

declare module okhttp3 {
	export class ConnectionSpec {
		public static class: java.lang.Class<okhttp3.ConnectionSpec>;
		public static RESTRICTED_TLS: okhttp3.ConnectionSpec;
		public static MODERN_TLS: okhttp3.ConnectionSpec;
		public static COMPATIBLE_TLS: okhttp3.ConnectionSpec;
		public static CLEARTEXT: okhttp3.ConnectionSpec;
		public static Companion: okhttp3.ConnectionSpec.Companion;
		/** @deprecated */
		public supportsTlsExtensions(): boolean;
		public cipherSuites(): java.util.List<okhttp3.CipherSuite>;
		public equals(param0: any): boolean;
		public tlsVersions(): java.util.List<okhttp3.TlsVersion>;
		public supportsTlsExtensions(): boolean;
		public toString(): string;
		public constructor(param0: boolean, param1: boolean, param2: native.Array<string>, param3: native.Array<string>);
		/** @deprecated */
		public cipherSuites(): java.util.List<okhttp3.CipherSuite>;
		public hashCode(): number;
		public isCompatible(param0: javax.net.ssl.SSLSocket): boolean;
		public applyDollarokhttp(param0: javax.net.ssl.SSLSocket, param1: boolean): void;
		public isTls(): boolean;
		/** @deprecated */
		public tlsVersions(): java.util.List<okhttp3.TlsVersion>;
	}
	export module ConnectionSpec {
		export class Builder {
			public static class: java.lang.Class<okhttp3.ConnectionSpec.Builder>;
			public tlsVersions(param0: native.Array<string>): okhttp3.ConnectionSpec.Builder;
			public build(): okhttp3.ConnectionSpec;
			public constructor(param0: boolean);
			public getSupportsTlsExtensionsDollarokhttp(): boolean;
			public constructor(param0: okhttp3.ConnectionSpec);
			public setTlsVersionsDollarokhttp(param0: native.Array<string>): void;
			public setSupportsTlsExtensionsDollarokhttp(param0: boolean): void;
			public setCipherSuitesDollarokhttp(param0: native.Array<string>): void;
			/** @deprecated */
			public supportsTlsExtensions(param0: boolean): okhttp3.ConnectionSpec.Builder;
			public getTlsVersionsDollarokhttp(): native.Array<string>;
			public getTlsDollarokhttp(): boolean;
			public cipherSuites(param0: native.Array<string>): okhttp3.ConnectionSpec.Builder;
			public setTlsDollarokhttp(param0: boolean): void;
			public cipherSuites(param0: native.Array<okhttp3.CipherSuite>): okhttp3.ConnectionSpec.Builder;
			public allEnabledCipherSuites(): okhttp3.ConnectionSpec.Builder;
			public tlsVersions(param0: native.Array<okhttp3.TlsVersion>): okhttp3.ConnectionSpec.Builder;
			public allEnabledTlsVersions(): okhttp3.ConnectionSpec.Builder;
			public getCipherSuitesDollarokhttp(): native.Array<string>;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.ConnectionSpec.Companion>;
		}
	}
}

declare module okhttp3 {
	export class Cookie {
		public static class: java.lang.Class<okhttp3.Cookie>;
		public static Companion: okhttp3.Cookie.Companion;
		public equals(param0: any): boolean;
		public matches(param0: okhttp3.HttpUrl): boolean;
		/** @deprecated */
		public hostOnly(): boolean;
		/** @deprecated */
		public expiresAt(): number;
		public httpOnly(): boolean;
		/** @deprecated */
		public path(): string;
		public expiresAt(): number;
		/** @deprecated */
		public name(): string;
		public toStringDollarokhttp(param0: boolean): string;
		public hashCode(): number;
		/** @deprecated */
		public persistent(): boolean;
		/** @deprecated */
		public domain(): string;
		public secure(): boolean;
		/** @deprecated */
		public httpOnly(): boolean;
		public domain(): string;
		public static parseAll(param0: okhttp3.HttpUrl, param1: okhttp3.Headers): java.util.List<okhttp3.Cookie>;
		/** @deprecated */
		public secure(): boolean;
		public toString(): string;
		/** @deprecated */
		public value(): string;
		public persistent(): boolean;
		public static parse(param0: okhttp3.HttpUrl, param1: string): okhttp3.Cookie;
		public hostOnly(): boolean;
		public name(): string;
		public path(): string;
		public value(): string;
	}
	export module Cookie {
		export class Builder {
			public static class: java.lang.Class<okhttp3.Cookie.Builder>;
			public domain(param0: string): okhttp3.Cookie.Builder;
			public hostOnlyDomain(param0: string): okhttp3.Cookie.Builder;
			public value(param0: string): okhttp3.Cookie.Builder;
			public httpOnly(): okhttp3.Cookie.Builder;
			public secure(): okhttp3.Cookie.Builder;
			public expiresAt(param0: number): okhttp3.Cookie.Builder;
			public build(): okhttp3.Cookie;
			public name(param0: string): okhttp3.Cookie.Builder;
			public constructor();
			public path(param0: string): okhttp3.Cookie.Builder;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.Cookie.Companion>;
			public parseDollarokhttp(param0: number, param1: okhttp3.HttpUrl, param2: string): okhttp3.Cookie;
			public parse(param0: okhttp3.HttpUrl, param1: string): okhttp3.Cookie;
			public parseAll(param0: okhttp3.HttpUrl, param1: okhttp3.Headers): java.util.List<okhttp3.Cookie>;
		}
	}
}

declare module okhttp3 {
	export class CookieJar {
		public static class: java.lang.Class<okhttp3.CookieJar>;
		/**
		 * Constructs a new instance of the okhttp3.CookieJar interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
			loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
			<clinit>(): void;
		});
		public constructor();
		public static NO_COOKIES: okhttp3.CookieJar;
		public static Companion: okhttp3.CookieJar.Companion;
		public loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
		public saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
	}
	export module CookieJar {
		export class Companion {
			public static class: java.lang.Class<okhttp3.CookieJar.Companion>;
		}
		export module Companion {
			export class NoCookies extends okhttp3.CookieJar {
				public static class: java.lang.Class<okhttp3.CookieJar.Companion.NoCookies>;
				public loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
				public saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export class Credentials {
		public static class: java.lang.Class<okhttp3.Credentials>;
		public static INSTANCE: okhttp3.Credentials;
		public static basic(param0: string, param1: string, param2: java.nio.charset.Charset): string;
		public static basic(param0: string, param1: string): string;
	}
}

declare module okhttp3 {
	export class Dispatcher {
		public static class: java.lang.Class<okhttp3.Dispatcher>;
		public constructor();
		public setMaxRequestsPerHost(param0: number): void;
		public constructor(param0: java.util.concurrent.ExecutorService);
		public queuedCallsCount(): number;
		/** @deprecated */
		public executorService(): java.util.concurrent.ExecutorService;
		public finishedDollarokhttp(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
		public runningCallsCount(): number;
		public runningCalls(): java.util.List<okhttp3.Call>;
		public cancelAll(): void;
		public queuedCalls(): java.util.List<okhttp3.Call>;
		public setMaxRequests(param0: number): void;
		public getMaxRequestsPerHost(): number;
		public executedDollarokhttp(param0: okhttp3.internal.connection.RealCall): void;
		public executorService(): java.util.concurrent.ExecutorService;
		public setIdleCallback(param0: java.lang.Runnable): void;
		public getIdleCallback(): java.lang.Runnable;
		public enqueueDollarokhttp(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
		public getMaxRequests(): number;
		public finishedDollarokhttp(param0: okhttp3.internal.connection.RealCall): void;
	}
}

declare module okhttp3 {
	export class Dns {
		public static class: java.lang.Class<okhttp3.Dns>;
		/**
		 * Constructs a new instance of the okhttp3.Dns interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			lookup(param0: string): java.util.List<java.net.InetAddress>;
			<clinit>(): void;
		});
		public constructor();
		public static SYSTEM: okhttp3.Dns;
		public static Companion: okhttp3.Dns.Companion;
		public lookup(param0: string): java.util.List<java.net.InetAddress>;
	}
	export module Dns {
		export class Companion {
			public static class: java.lang.Class<okhttp3.Dns.Companion>;
		}
		export module Companion {
			export class DnsSystem extends okhttp3.Dns {
				public static class: java.lang.Class<okhttp3.Dns.Companion.DnsSystem>;
				public lookup(param0: string): java.util.List<java.net.InetAddress>;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export abstract class EventListener {
		public static class: java.lang.Class<okhttp3.EventListener>;
		public static NONE: okhttp3.EventListener;
		public static Companion: okhttp3.EventListener.Companion;
		public connectFailed(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: okhttp3.Protocol, param4: java.io.IOException): void;
		public proxySelectStart(param0: okhttp3.Call, param1: okhttp3.HttpUrl): void;
		public proxySelectEnd(param0: okhttp3.Call, param1: okhttp3.HttpUrl, param2: java.util.List<java.net.Proxy>): void;
		public connectionReleased(param0: okhttp3.Call, param1: okhttp3.Connection): void;
		public dnsEnd(param0: okhttp3.Call, param1: string, param2: java.util.List<java.net.InetAddress>): void;
		public secureConnectEnd(param0: okhttp3.Call, param1: okhttp3.Handshake): void;
		public dnsStart(param0: okhttp3.Call, param1: string): void;
		public connectEnd(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: okhttp3.Protocol): void;
		public requestHeadersEnd(param0: okhttp3.Call, param1: okhttp3.Request): void;
		public connectStart(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy): void;
		public callFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public constructor();
		public callStart(param0: okhttp3.Call): void;
		public responseBodyEnd(param0: okhttp3.Call, param1: number): void;
		public responseFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public callEnd(param0: okhttp3.Call): void;
		public secureConnectStart(param0: okhttp3.Call): void;
		public responseHeadersEnd(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public canceled(param0: okhttp3.Call): void;
		public connectionAcquired(param0: okhttp3.Call, param1: okhttp3.Connection): void;
		public responseBodyStart(param0: okhttp3.Call): void;
		public requestBodyEnd(param0: okhttp3.Call, param1: number): void;
		public requestFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public requestHeadersStart(param0: okhttp3.Call): void;
		public requestBodyStart(param0: okhttp3.Call): void;
		public responseHeadersStart(param0: okhttp3.Call): void;
	}
	export module EventListener {
		export class Companion {
			public static class: java.lang.Class<okhttp3.EventListener.Companion>;
		}
		export class Factory {
			public static class: java.lang.Class<okhttp3.EventListener.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.EventListener$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				create(param0: okhttp3.Call): okhttp3.EventListener;
			});
			public constructor();
			public create(param0: okhttp3.Call): okhttp3.EventListener;
		}
	}
}

declare module okhttp3 {
	export class FormBody extends okhttp3.RequestBody {
		public static class: java.lang.Class<okhttp3.FormBody>;
		public static Companion: okhttp3.FormBody.Companion;
		public value(param0: number): string;
		public constructor();
		public encodedValue(param0: number): string;
		public name(param0: number): string;
		public size(): number;
		public constructor(param0: java.util.List<string>, param1: java.util.List<string>);
		public encodedName(param0: number): string;
		public contentType(): okhttp3.MediaType;
		public writeTo(param0: okio.BufferedSink): void;
		public contentLength(): number;
		/** @deprecated */
		public size(): number;
	}
	export module FormBody {
		export class Builder {
			public static class: java.lang.Class<okhttp3.FormBody.Builder>;
			public addEncoded(param0: string, param1: string): okhttp3.FormBody.Builder;
			public constructor(param0: java.nio.charset.Charset);
			public constructor();
			public add(param0: string, param1: string): okhttp3.FormBody.Builder;
			public build(): okhttp3.FormBody;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.FormBody.Companion>;
		}
	}
}

declare module okhttp3 {
	export class Handshake {
		public static class: java.lang.Class<okhttp3.Handshake>;
		public static Companion: okhttp3.Handshake.Companion;
		/** @deprecated */
		public tlsVersion(): okhttp3.TlsVersion;
		public equals(param0: any): boolean;
		public localCertificates(): java.util.List<java.security.cert.Certificate>;
		public peerCertificates(): java.util.List<java.security.cert.Certificate>;
		public toString(): string;
		public peerPrincipal(): java.security.Principal;
		public static get(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: java.util.List<any>): okhttp3.Handshake;
		/** @deprecated */
		public cipherSuite(): okhttp3.CipherSuite;
		public static get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
		/** @deprecated */
		public peerPrincipal(): java.security.Principal;
		/** @deprecated */
		public localPrincipal(): java.security.Principal;
		public constructor(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: kotlin.jvm.functions.Function0<any>);
		public hashCode(): number;
		/** @deprecated */
		public localCertificates(): java.util.List<java.security.cert.Certificate>;
		public localPrincipal(): java.security.Principal;
		public tlsVersion(): okhttp3.TlsVersion;
		/** @deprecated */
		public peerCertificates(): java.util.List<java.security.cert.Certificate>;
		public cipherSuite(): okhttp3.CipherSuite;
	}
	export module Handshake {
		export class Companion {
			public static class: java.lang.Class<okhttp3.Handshake.Companion>;
			public get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
			public get(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: java.util.List<any>): okhttp3.Handshake;
			/** @deprecated */
			public get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
		}
	}
}

declare module okhttp3 {
	export class Headers extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Headers>;
		public static Companion: okhttp3.Headers.Companion;
		public value(param0: number): string;
		public equals(param0: any): boolean;
		public newBuilder(): okhttp3.Headers.Builder;
		public getInstant(param0: string): java.time.Instant;
		public toString(): string;
		public get(param0: string): string;
		public values(param0: string): java.util.List<string>;
		public names(): java.util.Set<string>;
		public static of(param0: java.util.Map<string,string>): okhttp3.Headers;
		public name(param0: number): string;
		public size(): number;
		public iterator(): java.util.Iterator<kotlin.Pair<string,string>>;
		public hashCode(): number;
		public toMultimap(): java.util.Map<string,java.util.List<string>>;
		public getDate(param0: string): java.util.Date;
		public byteCount(): number;
		public static of(param0: native.Array<string>): okhttp3.Headers;
		/** @deprecated */
		public size(): number;
	}
	export module Headers {
		export class Builder {
			public static class: java.lang.Class<okhttp3.Headers.Builder>;
			public get(param0: string): string;
			public build(): okhttp3.Headers;
			public set(param0: string, param1: java.time.Instant): okhttp3.Headers.Builder;
			public getNamesAndValuesDollarokhttp(): java.util.List<string>;
			public set(param0: string, param1: string): okhttp3.Headers.Builder;
			public addAll(param0: okhttp3.Headers): okhttp3.Headers.Builder;
			public constructor();
			public addLenientDollarokhttp(param0: string, param1: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: string): okhttp3.Headers.Builder;
			public removeAll(param0: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: java.time.Instant): okhttp3.Headers.Builder;
			public set(param0: string, param1: java.util.Date): okhttp3.Headers.Builder;
			public add(param0: string): okhttp3.Headers.Builder;
			public addUnsafeNonAscii(param0: string, param1: string): okhttp3.Headers.Builder;
			public addLenientDollarokhttp(param0: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: java.util.Date): okhttp3.Headers.Builder;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.Headers.Companion>;
			/** @deprecated */
			public of(param0: native.Array<string>): okhttp3.Headers;
			public of(param0: native.Array<string>): okhttp3.Headers;
			public of(param0: java.util.Map<string,string>): okhttp3.Headers;
			/** @deprecated */
			public of(param0: java.util.Map<string,string>): okhttp3.Headers;
		}
	}
}

declare module okhttp3 {
	export class HttpUrl {
		public static class: java.lang.Class<okhttp3.HttpUrl>;
		public static USERNAME_ENCODE_SET: string;
		public static PASSWORD_ENCODE_SET: string;
		public static PATH_SEGMENT_ENCODE_SET: string;
		public static PATH_SEGMENT_ENCODE_SET_URI: string;
		public static QUERY_ENCODE_SET: string;
		public static QUERY_COMPONENT_REENCODE_SET: string;
		public static QUERY_COMPONENT_ENCODE_SET: string;
		public static QUERY_COMPONENT_ENCODE_SET_URI: string;
		public static FORM_ENCODE_SET: string;
		public static FRAGMENT_ENCODE_SET: string;
		public static FRAGMENT_ENCODE_SET_URI: string;
		public static Companion: okhttp3.HttpUrl.Companion;
		public static get(param0: java.net.URI): okhttp3.HttpUrl;
		public equals(param0: any): boolean;
		public topPrivateDomain(): string;
		public queryParameterName(param0: number): string;
		/** @deprecated */
		public queryParameterNames(): java.util.Set<string>;
		public queryParameterNames(): java.util.Set<string>;
		/** @deprecated */
		public port(): number;
		public encodedPassword(): string;
		public query(): string;
		/** @deprecated */
		public pathSegments(): java.util.List<string>;
		/** @deprecated */
		public username(): string;
		/** @deprecated */
		public encodedUsername(): string;
		public static get(param0: string): okhttp3.HttpUrl;
		public pathSize(): number;
		public isHttps(): boolean;
		/** @deprecated */
		public host(): string;
		public newBuilder(): okhttp3.HttpUrl.Builder;
		public port(): number;
		public encodedFragment(): string;
		public redact(): string;
		/** @deprecated */
		public scheme(): string;
		public toString(): string;
		public fragment(): string;
		public uri(): java.net.URI;
		/** @deprecated */
		public encodedQuery(): string;
		public queryParameterValue(param0: number): string;
		/** @deprecated */
		public encodedFragment(): string;
		public host(): string;
		public static get(param0: java.net.URL): okhttp3.HttpUrl;
		/** @deprecated */
		public password(): string;
		public url(): java.net.URL;
		public querySize(): number;
		public static defaultPort(param0: string): number;
		public scheme(): string;
		/** @deprecated */
		public uri(): java.net.URI;
		public constructor(param0: string, param1: string, param2: string, param3: string, param4: number, param5: java.util.List<string>, param6: java.util.List<string>, param7: string, param8: string);
		public queryParameter(param0: string): string;
		/** @deprecated */
		public encodedPathSegments(): java.util.List<string>;
		public password(): string;
		public hashCode(): number;
		public resolve(param0: string): okhttp3.HttpUrl;
		public encodedPathSegments(): java.util.List<string>;
		public encodedQuery(): string;
		public encodedPath(): string;
		/** @deprecated */
		public pathSize(): number;
		/** @deprecated */
		public encodedPath(): string;
		public encodedUsername(): string;
		public queryParameterValues(param0: string): java.util.List<string>;
		/** @deprecated */
		public fragment(): string;
		public newBuilder(param0: string): okhttp3.HttpUrl.Builder;
		/** @deprecated */
		public query(): string;
		public pathSegments(): java.util.List<string>;
		public static parse(param0: string): okhttp3.HttpUrl;
		/** @deprecated */
		public url(): java.net.URL;
		/** @deprecated */
		public encodedPassword(): string;
		/** @deprecated */
		public querySize(): number;
		public username(): string;
	}
	export module HttpUrl {
		export class Builder {
			public static class: java.lang.Class<okhttp3.HttpUrl.Builder>;
			public static INVALID_HOST: string;
			public static Companion: okhttp3.HttpUrl.Builder.Companion;
			public addPathSegment(param0: string): okhttp3.HttpUrl.Builder;
			public addEncodedPathSegment(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public setQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public setEncodedQueryNamesAndValuesDollarokhttp(param0: java.util.List<string>): void;
			public getEncodedQueryNamesAndValuesDollarokhttp(): java.util.List<string>;
			public getEncodedPathSegmentsDollarokhttp(): java.util.List<string>;
			public encodedFragment(param0: string): okhttp3.HttpUrl.Builder;
			public username(param0: string): okhttp3.HttpUrl.Builder;
			public parseDollarokhttp(param0: okhttp3.HttpUrl, param1: string): okhttp3.HttpUrl.Builder;
			public setEncodedFragmentDollarokhttp(param0: string): void;
			public addPathSegments(param0: string): okhttp3.HttpUrl.Builder;
			public setPortDollarokhttp(param0: number): void;
			public getHostDollarokhttp(): string;
			public encodedPath(param0: string): okhttp3.HttpUrl.Builder;
			public getSchemeDollarokhttp(): string;
			public setSchemeDollarokhttp(param0: string): void;
			public encodedPassword(param0: string): okhttp3.HttpUrl.Builder;
			public addEncodedPathSegments(param0: string): okhttp3.HttpUrl.Builder;
			public encodedQuery(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedUsernameDollarokhttp(param0: string): void;
			public getPortDollarokhttp(): number;
			public host(param0: string): okhttp3.HttpUrl.Builder;
			public removeAllEncodedQueryParameters(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedPathSegment(param0: number, param1: string): okhttp3.HttpUrl.Builder;
			public setHostDollarokhttp(param0: string): void;
			public reencodeForUriDollarokhttp(): okhttp3.HttpUrl.Builder;
			public constructor();
			public encodedUsername(param0: string): okhttp3.HttpUrl.Builder;
			public password(param0: string): okhttp3.HttpUrl.Builder;
			public getEncodedUsernameDollarokhttp(): string;
			public getEncodedPasswordDollarokhttp(): string;
			public getEncodedFragmentDollarokhttp(): string;
			public port(param0: number): okhttp3.HttpUrl.Builder;
			public toString(): string;
			public addQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public addEncodedQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public query(param0: string): okhttp3.HttpUrl.Builder;
			public setPathSegment(param0: number, param1: string): okhttp3.HttpUrl.Builder;
			public removeAllQueryParameters(param0: string): okhttp3.HttpUrl.Builder;
			public scheme(param0: string): okhttp3.HttpUrl.Builder;
			public removePathSegment(param0: number): okhttp3.HttpUrl.Builder;
			public fragment(param0: string): okhttp3.HttpUrl.Builder;
			public build(): okhttp3.HttpUrl;
			public setEncodedPasswordDollarokhttp(param0: string): void;
		}
		export module Builder {
			export class Companion {
				public static class: java.lang.Class<okhttp3.HttpUrl.Builder.Companion>;
			}
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.HttpUrl.Companion>;
			public toPathStringDollarokhttp(param0: java.util.List<string>, param1: java.lang.StringBuilder): void;
			/** @deprecated */
			public parse(param0: string): okhttp3.HttpUrl;
			public defaultPort(param0: string): number;
			public get(param0: java.net.URL): okhttp3.HttpUrl;
			public get(param0: java.net.URI): okhttp3.HttpUrl;
			public toQueryNamesAndValuesDollarokhttp(param0: string): java.util.List<string>;
			/** @deprecated */
			public get(param0: string): okhttp3.HttpUrl;
			public percentDecodeDollarokhttp(param0: string, param1: number, param2: number, param3: boolean): string;
			public canonicalizeDollarokhttp(param0: string, param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean, param8: java.nio.charset.Charset): string;
			public toQueryStringDollarokhttp(param0: java.util.List<string>, param1: java.lang.StringBuilder): void;
			public get(param0: string): okhttp3.HttpUrl;
			public parse(param0: string): okhttp3.HttpUrl;
			/** @deprecated */
			public get(param0: java.net.URL): okhttp3.HttpUrl;
			/** @deprecated */
			public get(param0: java.net.URI): okhttp3.HttpUrl;
		}
	}
}

declare module okhttp3 {
	export class Interceptor {
		public static class: java.lang.Class<okhttp3.Interceptor>;
		/**
		 * Constructs a new instance of the okhttp3.Interceptor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
			<clinit>(): void;
		});
		public constructor();
		public static Companion: okhttp3.Interceptor.Companion;
		public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
	}
	export module Interceptor {
		export class Chain {
			public static class: java.lang.Class<okhttp3.Interceptor.Chain>;
			/**
			 * Constructs a new instance of the okhttp3.Interceptor$Chain interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				request(): okhttp3.Request;
				proceed(param0: okhttp3.Request): okhttp3.Response;
				connection(): okhttp3.Connection;
				call(): okhttp3.Call;
				connectTimeoutMillis(): number;
				withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				readTimeoutMillis(): number;
				withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				writeTimeoutMillis(): number;
				withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			});
			public constructor();
			public request(): okhttp3.Request;
			public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public call(): okhttp3.Call;
			public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public readTimeoutMillis(): number;
			public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public proceed(param0: okhttp3.Request): okhttp3.Response;
			public connection(): okhttp3.Connection;
			public connectTimeoutMillis(): number;
			public writeTimeoutMillis(): number;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.Interceptor.Companion>;
			public invoke(param0: kotlin.jvm.functions.Function1<any,okhttp3.Response>): okhttp3.Interceptor;
		}
	}
}

declare module okhttp3 {
	export class MediaType {
		public static class: java.lang.Class<okhttp3.MediaType>;
		public static Companion: okhttp3.MediaType.Companion;
		public type(): string;
		public charset(): java.nio.charset.Charset;
		public equals(param0: any): boolean;
		public subtype(): string;
		public charset(param0: java.nio.charset.Charset): java.nio.charset.Charset;
		public hashCode(): number;
		public static get(param0: string): okhttp3.MediaType;
		public static parse(param0: string): okhttp3.MediaType;
		public toString(): string;
		/** @deprecated */
		public type(): string;
		/** @deprecated */
		public subtype(): string;
	}
	export module MediaType {
		export class Companion {
			public static class: java.lang.Class<okhttp3.MediaType.Companion>;
			public parse(param0: string): okhttp3.MediaType;
			public get(param0: string): okhttp3.MediaType;
			/** @deprecated */
			public parse(param0: string): okhttp3.MediaType;
			/** @deprecated */
			public get(param0: string): okhttp3.MediaType;
		}
	}
}

declare module okhttp3 {
	export class MultipartBody extends okhttp3.RequestBody {
		public static class: java.lang.Class<okhttp3.MultipartBody>;
		public static MIXED: okhttp3.MediaType;
		public static ALTERNATIVE: okhttp3.MediaType;
		public static DIGEST: okhttp3.MediaType;
		public static PARALLEL: okhttp3.MediaType;
		public static FORM: okhttp3.MediaType;
		public static Companion: okhttp3.MultipartBody.Companion;
		public constructor();
		/** @deprecated */
		public type(): okhttp3.MediaType;
		/** @deprecated */
		public boundary(): string;
		public parts(): java.util.List<okhttp3.MultipartBody.Part>;
		public type(): okhttp3.MediaType;
		public writeTo(param0: okio.BufferedSink): void;
		public boundary(): string;
		public size(): number;
		/** @deprecated */
		public parts(): java.util.List<okhttp3.MultipartBody.Part>;
		public contentType(): okhttp3.MediaType;
		public constructor(param0: okio.ByteString, param1: okhttp3.MediaType, param2: java.util.List<okhttp3.MultipartBody.Part>);
		public part(param0: number): okhttp3.MultipartBody.Part;
		public contentLength(): number;
		/** @deprecated */
		public size(): number;
	}
	export module MultipartBody {
		export class Builder {
			public static class: java.lang.Class<okhttp3.MultipartBody.Builder>;
			public setType(param0: okhttp3.MediaType): okhttp3.MultipartBody.Builder;
			public addPart(param0: okhttp3.MultipartBody.Part): okhttp3.MultipartBody.Builder;
			public build(): okhttp3.MultipartBody;
			public addPart(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public addPart(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public addFormDataPart(param0: string, param1: string): okhttp3.MultipartBody.Builder;
			public addFormDataPart(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public constructor();
			public constructor(param0: string);
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.MultipartBody.Companion>;
			public appendQuotedStringDollarokhttp(param0: java.lang.StringBuilder, param1: string): void;
		}
		export class Part {
			public static class: java.lang.Class<okhttp3.MultipartBody.Part>;
			public static Companion: okhttp3.MultipartBody.Part.Companion;
			public headers(): okhttp3.Headers;
			/** @deprecated */
			public headers(): okhttp3.Headers;
			/** @deprecated */
			public body(): okhttp3.RequestBody;
			public static create(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static createFormData(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static create(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static createFormData(param0: string, param1: string): okhttp3.MultipartBody.Part;
			public body(): okhttp3.RequestBody;
		}
		export module Part {
			export class Companion {
				public static class: java.lang.Class<okhttp3.MultipartBody.Part.Companion>;
				public createFormData(param0: string, param1: string): okhttp3.MultipartBody.Part;
				public createFormData(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
				public create(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
				public create(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			}
		}
	}
}

declare module okhttp3 {
	export class OkHttpClient implements okhttp3.Call.Factory, okhttp3.WebSocket.Factory {
		public static class: java.lang.Class<okhttp3.OkHttpClient>;
		public static Companion: okhttp3.OkHttpClient.Companion;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		/** @deprecated */
		public proxyAuthenticator(): okhttp3.Authenticator;
		/** @deprecated */
		public callTimeoutMillis(): number;
		public connectionPool(): okhttp3.ConnectionPool;
		public cache(): okhttp3.Cache;
		/** @deprecated */
		public protocols(): java.util.List<okhttp3.Protocol>;
		/** @deprecated */
		public dispatcher(): okhttp3.Dispatcher;
		public dns(): okhttp3.Dns;
		public proxyAuthenticator(): okhttp3.Authenticator;
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public callTimeoutMillis(): number;
		public connectTimeoutMillis(): number;
		public newBuilder(): okhttp3.OkHttpClient.Builder;
		/** @deprecated */
		public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
		/** @deprecated */
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public constructor();
		public followRedirects(): boolean;
		public interceptors(): java.util.List<okhttp3.Interceptor>;
		/** @deprecated */
		public connectTimeoutMillis(): number;
		/** @deprecated */
		public dns(): okhttp3.Dns;
		public socketFactory(): javax.net.SocketFactory;
		public retryOnConnectionFailure(): boolean;
		public constructor(param0: okhttp3.OkHttpClient.Builder);
		/** @deprecated */
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public proxy(): java.net.Proxy;
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public proxySelector(): java.net.ProxySelector;
		public clone(): any;
		public dispatcher(): okhttp3.Dispatcher;
		/** @deprecated */
		public interceptors(): java.util.List<okhttp3.Interceptor>;
		public certificateChainCleaner(): okhttp3.internal.tls.CertificateChainCleaner;
		public protocols(): java.util.List<okhttp3.Protocol>;
		/** @deprecated */
		public followSslRedirects(): boolean;
		/** @deprecated */
		public writeTimeoutMillis(): number;
		/** @deprecated */
		public cache(): okhttp3.Cache;
		/** @deprecated */
		public connectionPool(): okhttp3.ConnectionPool;
		/** @deprecated */
		public retryOnConnectionFailure(): boolean;
		public cookieJar(): okhttp3.CookieJar;
		public pingIntervalMillis(): number;
		/** @deprecated */
		public pingIntervalMillis(): number;
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public eventListenerFactory(): okhttp3.EventListener.Factory;
		/** @deprecated */
		public certificatePinner(): okhttp3.CertificatePinner;
		public proxySelector(): java.net.ProxySelector;
		/** @deprecated */
		public cookieJar(): okhttp3.CookieJar;
		public readTimeoutMillis(): number;
		public authenticator(): okhttp3.Authenticator;
		public getRouteDatabase(): okhttp3.internal.connection.RouteDatabase;
		/** @deprecated */
		public authenticator(): okhttp3.Authenticator;
		public writeTimeoutMillis(): number;
		/** @deprecated */
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		public newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
		public followSslRedirects(): boolean;
		/** @deprecated */
		public readTimeoutMillis(): number;
		/** @deprecated */
		public followRedirects(): boolean;
		public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
		public eventListenerFactory(): okhttp3.EventListener.Factory;
		public x509TrustManager(): javax.net.ssl.X509TrustManager;
		public newCall(param0: okhttp3.Request): okhttp3.Call;
		/** @deprecated */
		public socketFactory(): javax.net.SocketFactory;
	}
	export module OkHttpClient {
		export class Builder {
			public static class: java.lang.Class<okhttp3.OkHttpClient.Builder>;
			public getCookieJarDollarokhttp(): okhttp3.CookieJar;
			public addInterceptor(param0: okhttp3.Interceptor): okhttp3.OkHttpClient.Builder;
			public getRetryOnConnectionFailureDollarokhttp(): boolean;
			public connectionPool(param0: okhttp3.ConnectionPool): okhttp3.OkHttpClient.Builder;
			public setProxyDollarokhttp(param0: java.net.Proxy): void;
			public setReadTimeoutDollarokhttp(param0: number): void;
			public getDispatcherDollarokhttp(): okhttp3.Dispatcher;
			public getNetworkInterceptorsDollarokhttp(): java.util.List<okhttp3.Interceptor>;
			public getProxyAuthenticatorDollarokhttp(): okhttp3.Authenticator;
			public readTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public connectionSpecs(param0: java.util.List<okhttp3.ConnectionSpec>): okhttp3.OkHttpClient.Builder;
			public setConnectTimeoutDollarokhttp(param0: number): void;
			public setDnsDollarokhttp(param0: okhttp3.Dns): void;
			public protocols(param0: java.util.List<any>): okhttp3.OkHttpClient.Builder;
			public eventListener(param0: okhttp3.EventListener): okhttp3.OkHttpClient.Builder;
			public getProxyDollarokhttp(): java.net.Proxy;
			public proxyAuthenticator(param0: okhttp3.Authenticator): okhttp3.OkHttpClient.Builder;
			public followRedirects(param0: boolean): okhttp3.OkHttpClient.Builder;
			public setFollowSslRedirectsDollarokhttp(param0: boolean): void;
			public getSslSocketFactoryOrNullDollarokhttp(): javax.net.ssl.SSLSocketFactory;
			public callTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public cookieJar(param0: okhttp3.CookieJar): okhttp3.OkHttpClient.Builder;
			public getFollowSslRedirectsDollarokhttp(): boolean;
			public connectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public getCallTimeoutDollarokhttp(): number;
			public pingInterval(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public constructor();
			public setCookieJarDollarokhttp(param0: okhttp3.CookieJar): void;
			public dispatcher(param0: okhttp3.Dispatcher): okhttp3.OkHttpClient.Builder;
			public socketFactory(param0: javax.net.SocketFactory): okhttp3.OkHttpClient.Builder;
			public retryOnConnectionFailure(param0: boolean): okhttp3.OkHttpClient.Builder;
			public writeTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public authenticator(param0: okhttp3.Authenticator): okhttp3.OkHttpClient.Builder;
			public hostnameVerifier(param0: javax.net.ssl.HostnameVerifier): okhttp3.OkHttpClient.Builder;
			public constructor(param0: okhttp3.OkHttpClient);
			public setHostnameVerifierDollarokhttp(param0: javax.net.ssl.HostnameVerifier): void;
			public getWriteTimeoutDollarokhttp(): number;
			public setX509TrustManagerOrNullDollarokhttp(param0: javax.net.ssl.X509TrustManager): void;
			public getProtocolsDollarokhttp(): java.util.List<okhttp3.Protocol>;
			/** @deprecated */
			public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): okhttp3.OkHttpClient.Builder;
			public certificatePinner(param0: okhttp3.CertificatePinner): okhttp3.OkHttpClient.Builder;
			public getCacheDollarokhttp(): okhttp3.Cache;
			public getReadTimeoutDollarokhttp(): number;
			public setSslSocketFactoryOrNullDollarokhttp(param0: javax.net.ssl.SSLSocketFactory): void;
			public setEventListenerFactoryDollarokhttp(param0: okhttp3.EventListener.Factory): void;
			public interceptors(): java.util.List<okhttp3.Interceptor>;
			public getInterceptorsDollarokhttp(): java.util.List<okhttp3.Interceptor>;
			public setCertificateChainCleanerDollarokhttp(param0: okhttp3.internal.tls.CertificateChainCleaner): void;
			public readTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public getConnectTimeoutDollarokhttp(): number;
			public dns(param0: okhttp3.Dns): okhttp3.OkHttpClient.Builder;
			public callTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public getConnectionSpecsDollarokhttp(): java.util.List<okhttp3.ConnectionSpec>;
			public writeTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public eventListenerFactory(param0: okhttp3.EventListener.Factory): okhttp3.OkHttpClient.Builder;
			public pingInterval(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public setFollowRedirectsDollarokhttp(param0: boolean): void;
			public setWriteTimeoutDollarokhttp(param0: number): void;
			public build(): okhttp3.OkHttpClient;
			public setConnectionPoolDollarokhttp(param0: okhttp3.ConnectionPool): void;
			public getProxySelectorDollarokhttp(): java.net.ProxySelector;
			public setSocketFactoryDollarokhttp(param0: javax.net.SocketFactory): void;
			public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
			public getHostnameVerifierDollarokhttp(): javax.net.ssl.HostnameVerifier;
			public cache(param0: okhttp3.Cache): okhttp3.OkHttpClient.Builder;
			public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory, param1: javax.net.ssl.X509TrustManager): okhttp3.OkHttpClient.Builder;
			public addNetworkInterceptor(param0: kotlin.jvm.functions.Function1<any,okhttp3.Response>): okhttp3.OkHttpClient.Builder;
			public getConnectionPoolDollarokhttp(): okhttp3.ConnectionPool;
			public followSslRedirects(param0: boolean): okhttp3.OkHttpClient.Builder;
			public setCallTimeoutDollarokhttp(param0: number): void;
			public setCertificatePinnerDollarokhttp(param0: okhttp3.CertificatePinner): void;
			public setRouteDatabaseDollarokhttp(param0: okhttp3.internal.connection.RouteDatabase): void;
			public getAuthenticatorDollarokhttp(): okhttp3.Authenticator;
			public getX509TrustManagerOrNullDollarokhttp(): javax.net.ssl.X509TrustManager;
			public setProtocolsDollarokhttp(param0: java.util.List<any>): void;
			public getPingIntervalDollarokhttp(): number;
			public setCacheDollarokhttp(param0: okhttp3.Cache): void;
			public connectTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public setRetryOnConnectionFailureDollarokhttp(param0: boolean): void;
			public setProxyAuthenticatorDollarokhttp(param0: okhttp3.Authenticator): void;
			public proxySelector(param0: java.net.ProxySelector): okhttp3.OkHttpClient.Builder;
			public addInterceptor(param0: kotlin.jvm.functions.Function1<any,okhttp3.Response>): okhttp3.OkHttpClient.Builder;
			public getEventListenerFactoryDollarokhttp(): okhttp3.EventListener.Factory;
			public setAuthenticatorDollarokhttp(param0: okhttp3.Authenticator): void;
			public getSocketFactoryDollarokhttp(): javax.net.SocketFactory;
			public getCertificateChainCleanerDollarokhttp(): okhttp3.internal.tls.CertificateChainCleaner;
			public setPingIntervalDollarokhttp(param0: number): void;
			public addNetworkInterceptor(param0: okhttp3.Interceptor): okhttp3.OkHttpClient.Builder;
			public setDispatcherDollarokhttp(param0: okhttp3.Dispatcher): void;
			public getFollowRedirectsDollarokhttp(): boolean;
			public setProxySelectorDollarokhttp(param0: java.net.ProxySelector): void;
			public setConnectionSpecsDollarokhttp(param0: java.util.List<okhttp3.ConnectionSpec>): void;
			public getCertificatePinnerDollarokhttp(): okhttp3.CertificatePinner;
			public proxy(param0: java.net.Proxy): okhttp3.OkHttpClient.Builder;
			public getDnsDollarokhttp(): okhttp3.Dns;
			public getRouteDatabaseDollarokhttp(): okhttp3.internal.connection.RouteDatabase;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.OkHttpClient.Companion>;
			public getDEFAULT_CONNECTION_SPECSDollarokhttp(): java.util.List<okhttp3.ConnectionSpec>;
			public getDEFAULT_PROTOCOLSDollarokhttp(): java.util.List<okhttp3.Protocol>;
		}
	}
}

declare module okhttp3 {
	export class Protocol {
		public static class: java.lang.Class<okhttp3.Protocol>;
		public static HTTP_1_0: okhttp3.Protocol;
		public static HTTP_1_1: okhttp3.Protocol;
		public static SPDY_3: okhttp3.Protocol;
		public static HTTP_2: okhttp3.Protocol;
		public static H2_PRIOR_KNOWLEDGE: okhttp3.Protocol;
		public static QUIC: okhttp3.Protocol;
		public static Companion: okhttp3.Protocol.Companion;
		public static valueOf(param0: string): okhttp3.Protocol;
		public static get(param0: string): okhttp3.Protocol;
		public toString(): string;
		public static values(): native.Array<okhttp3.Protocol>;
	}
	export module Protocol {
		export class Companion {
			public static class: java.lang.Class<okhttp3.Protocol.Companion>;
			public get(param0: string): okhttp3.Protocol;
		}
	}
}

declare module okhttp3 {
	export class Request {
		public static class: java.lang.Class<okhttp3.Request>;
		/** @deprecated */
		public url(): okhttp3.HttpUrl;
		public tag(): any;
		public headers(): okhttp3.Headers;
		public newBuilder(): okhttp3.Request.Builder;
		public constructor(param0: okhttp3.HttpUrl, param1: string, param2: okhttp3.Headers, param3: okhttp3.RequestBody, param4: java.util.Map<java.lang.Class<any>,any>);
		public url(): okhttp3.HttpUrl;
		public cacheControl(): okhttp3.CacheControl;
		public method(): string;
		public toString(): string;
		public header(param0: string): string;
		public headers(param0: string): java.util.List<string>;
		/** @deprecated */
		public body(): okhttp3.RequestBody;
		/** @deprecated */
		public cacheControl(): okhttp3.CacheControl;
		/** @deprecated */
		public method(): string;
		public getTagsDollarokhttp(): java.util.Map<java.lang.Class<any>,any>;
		public tag(param0: java.lang.Class): any;
		public body(): okhttp3.RequestBody;
		public isHttps(): boolean;
		/** @deprecated */
		public headers(): okhttp3.Headers;
	}
	export module Request {
		export class Builder {
			public static class: java.lang.Class<okhttp3.Request.Builder>;
			public setMethodDollarokhttp(param0: string): void;
			public url(param0: okhttp3.HttpUrl): okhttp3.Request.Builder;
			public tag(param0: any): okhttp3.Request.Builder;
			public url(param0: java.net.URL): okhttp3.Request.Builder;
			public header(param0: string, param1: string): okhttp3.Request.Builder;
			public constructor(param0: okhttp3.Request);
			public put(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public setBodyDollarokhttp(param0: okhttp3.RequestBody): void;
			public get(): okhttp3.Request.Builder;
			public getUrlDollarokhttp(): okhttp3.HttpUrl;
			public post(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public getTagsDollarokhttp(): java.util.Map<java.lang.Class<any>,any>;
			public method(param0: string, param1: okhttp3.RequestBody): okhttp3.Request.Builder;
			public url(param0: string): okhttp3.Request.Builder;
			public setHeadersDollarokhttp(param0: okhttp3.Headers.Builder): void;
			public removeHeader(param0: string): okhttp3.Request.Builder;
			public head(): okhttp3.Request.Builder;
			public setTagsDollarokhttp(param0: java.util.Map<java.lang.Class<any>,any>): void;
			public setUrlDollarokhttp(param0: okhttp3.HttpUrl): void;
			public getMethodDollarokhttp(): string;
			public tag(param0: java.lang.Class, param1: any): okhttp3.Request.Builder;
			public headers(param0: okhttp3.Headers): okhttp3.Request.Builder;
			public delete(): okhttp3.Request.Builder;
			public constructor();
			public addHeader(param0: string, param1: string): okhttp3.Request.Builder;
			public getBodyDollarokhttp(): okhttp3.RequestBody;
			public delete(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public patch(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public build(): okhttp3.Request;
			public getHeadersDollarokhttp(): okhttp3.Headers.Builder;
			public cacheControl(param0: okhttp3.CacheControl): okhttp3.Request.Builder;
		}
	}
}

declare module okhttp3 {
	export abstract class RequestBody {
		public static class: java.lang.Class<okhttp3.RequestBody>;
		public static Companion: okhttp3.RequestBody.Companion;
		public constructor();
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.RequestBody;
		public isOneShot(): boolean;
		public static create(param0: native.Array<number>, param1: okhttp3.MediaType, param2: number, param3: number): okhttp3.RequestBody;
		public static create(param0: native.Array<number>, param1: okhttp3.MediaType): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: java.io.File): okhttp3.RequestBody;
		public writeTo(param0: okio.BufferedSink): void;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: native.Array<number>): okhttp3.RequestBody;
		public static create(param0: java.io.File, param1: okhttp3.MediaType): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: string): okhttp3.RequestBody;
		public static create(param0: native.Array<number>, param1: okhttp3.MediaType, param2: number): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: native.Array<number>, param2: number): okhttp3.RequestBody;
		public static create(param0: string, param1: okhttp3.MediaType): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: native.Array<number>, param2: number, param3: number): okhttp3.RequestBody;
		public contentType(): okhttp3.MediaType;
		public contentLength(): number;
		public isDuplex(): boolean;
		public static create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.RequestBody;
		public static create(param0: native.Array<number>): okhttp3.RequestBody;
	}
	export module RequestBody {
		export class Companion {
			public static class: java.lang.Class<okhttp3.RequestBody.Companion>;
			public create(param0: native.Array<number>, param1: okhttp3.MediaType, param2: number, param3: number): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: java.io.File): okhttp3.RequestBody;
			public create(param0: java.io.File, param1: okhttp3.MediaType): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: native.Array<number>): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: string): okhttp3.RequestBody;
			public create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.RequestBody;
			public create(param0: native.Array<number>): okhttp3.RequestBody;
			public create(param0: native.Array<number>, param1: okhttp3.MediaType, param2: number): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.RequestBody;
			public create(param0: string, param1: okhttp3.MediaType): okhttp3.RequestBody;
			public create(param0: native.Array<number>, param1: okhttp3.MediaType): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: native.Array<number>, param2: number): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: native.Array<number>, param2: number, param3: number): okhttp3.RequestBody;
		}
	}
}

declare module okhttp3 {
	export class Response {
		public static class: java.lang.Class<okhttp3.Response>;
		public headers(): okhttp3.Headers;
		public close(): void;
		public sentRequestAtMillis(): number;
		public cacheControl(): okhttp3.CacheControl;
		public exchange(): okhttp3.internal.connection.Exchange;
		public peekBody(param0: number): okhttp3.ResponseBody;
		public handshake(): okhttp3.Handshake;
		/** @deprecated */
		public request(): okhttp3.Request;
		/** @deprecated */
		public code(): number;
		public header(param0: string, param1: string): string;
		public header(param0: string): string;
		/** @deprecated */
		public priorResponse(): okhttp3.Response;
		/** @deprecated */
		public networkResponse(): okhttp3.Response;
		public body(): okhttp3.ResponseBody;
		public networkResponse(): okhttp3.Response;
		public trailers(): okhttp3.Headers;
		/** @deprecated */
		public cacheControl(): okhttp3.CacheControl;
		public request(): okhttp3.Request;
		public code(): number;
		public protocol(): okhttp3.Protocol;
		/** @deprecated */
		public protocol(): okhttp3.Protocol;
		/** @deprecated */
		public headers(): okhttp3.Headers;
		public priorResponse(): okhttp3.Response;
		/** @deprecated */
		public body(): okhttp3.ResponseBody;
		public cacheResponse(): okhttp3.Response;
		public constructor(param0: okhttp3.Request, param1: okhttp3.Protocol, param2: string, param3: number, param4: okhttp3.Handshake, param5: okhttp3.Headers, param6: okhttp3.ResponseBody, param7: okhttp3.Response, param8: okhttp3.Response, param9: okhttp3.Response, param10: number, param11: number, param12: okhttp3.internal.connection.Exchange);
		/** @deprecated */
		public sentRequestAtMillis(): number;
		public toString(): string;
		public isSuccessful(): boolean;
		/** @deprecated */
		public receivedResponseAtMillis(): number;
		/** @deprecated */
		public cacheResponse(): okhttp3.Response;
		public headers(param0: string): java.util.List<string>;
		public newBuilder(): okhttp3.Response.Builder;
		/** @deprecated */
		public message(): string;
		public message(): string;
		public challenges(): java.util.List<okhttp3.Challenge>;	
		public receivedResponseAtMillis(): number;
		public isRedirect(): boolean;
		/** @deprecated */
		public handshake(): okhttp3.Handshake;
	}
	export module Response {
		export class Builder {
			public static class: java.lang.Class<okhttp3.Response.Builder>;
			public cacheResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public setBodyDollarokhttp(param0: okhttp3.ResponseBody): void;
			public getExchangeDollarokhttp(): okhttp3.internal.connection.Exchange;
			public setCacheResponseDollarokhttp(param0: okhttp3.Response): void;
			public request(param0: okhttp3.Request): okhttp3.Response.Builder;
			public sentRequestAtMillis(param0: number): okhttp3.Response.Builder;
			public setMessageDollarokhttp(param0: string): void;
			public getPriorResponseDollarokhttp(): okhttp3.Response;
			public priorResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public setPriorResponseDollarokhttp(param0: okhttp3.Response): void;
			public initExchangeDollarokhttp(param0: okhttp3.internal.connection.Exchange): void;
			public getProtocolDollarokhttp(): okhttp3.Protocol;
			public removeHeader(param0: string): okhttp3.Response.Builder;
			public setHandshakeDollarokhttp(param0: okhttp3.Handshake): void;
			public setRequestDollarokhttp(param0: okhttp3.Request): void;
			public getSentRequestAtMillisDollarokhttp(): number;
			public setReceivedResponseAtMillisDollarokhttp(param0: number): void;
			public setHeadersDollarokhttp(param0: okhttp3.Headers.Builder): void;
			public getRequestDollarokhttp(): okhttp3.Request;
			public setNetworkResponseDollarokhttp(param0: okhttp3.Response): void;
			public getCacheResponseDollarokhttp(): okhttp3.Response;
			public protocol(param0: okhttp3.Protocol): okhttp3.Response.Builder;
			public receivedResponseAtMillis(param0: number): okhttp3.Response.Builder;
			public body(param0: okhttp3.ResponseBody): okhttp3.Response.Builder;
			public message(param0: string): okhttp3.Response.Builder;
			public constructor(param0: okhttp3.Response);
			public setExchangeDollarokhttp(param0: okhttp3.internal.connection.Exchange): void;
			public header(param0: string, param1: string): okhttp3.Response.Builder;
			public getMessageDollarokhttp(): string;
			public headers(param0: okhttp3.Headers): okhttp3.Response.Builder;
			public setCodeDollarokhttp(param0: number): void;
			public getBodyDollarokhttp(): okhttp3.ResponseBody;
			public networkResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public constructor();
			public getReceivedResponseAtMillisDollarokhttp(): number;
			public setProtocolDollarokhttp(param0: okhttp3.Protocol): void;
			public handshake(param0: okhttp3.Handshake): okhttp3.Response.Builder;
			public getCodeDollarokhttp(): number;
			public addHeader(param0: string, param1: string): okhttp3.Response.Builder;
			public getHeadersDollarokhttp(): okhttp3.Headers.Builder;
			public setSentRequestAtMillisDollarokhttp(param0: number): void;
			public getNetworkResponseDollarokhttp(): okhttp3.Response;
			public code(param0: number): okhttp3.Response.Builder;
			public build(): okhttp3.Response;
			public getHandshakeDollarokhttp(): okhttp3.Handshake;
		}
	}
}

declare module okhttp3 {
	export abstract class ResponseBody {
		public static class: java.lang.Class<okhttp3.ResponseBody>;
		public static Companion: okhttp3.ResponseBody.Companion;
		public constructor();
		public byteStream(): java.io.InputStream;
		public bytes(): native.Array<number>;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: number, param2: okio.BufferedSource): okhttp3.ResponseBody;
		public close(): void;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.ResponseBody;
		public byteString(): okio.ByteString;
		public static create(param0: native.Array<number>, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		public source(): okio.BufferedSource;
		public static create(param0: string, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		public static create(param0: okio.BufferedSource, param1: okhttp3.MediaType, param2: number): okhttp3.ResponseBody;
		public charStream(): java.io.Reader;
		public static create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		public contentType(): okhttp3.MediaType;
		public string(): string;
		public contentLength(): number;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: string): okhttp3.ResponseBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: native.Array<number>): okhttp3.ResponseBody;
	}
	export module ResponseBody {
		export class BomAwareReader {
			public static class: java.lang.Class<okhttp3.ResponseBody.BomAwareReader>;
			public read(param0: native.Array<string>, param1: number, param2: number): number;
			public constructor(param0: okio.BufferedSource, param1: java.nio.charset.Charset);
			public close(): void;
		}
		export class Companion {
			public static class: java.lang.Class<okhttp3.ResponseBody.Companion>;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.ResponseBody;
			public create(param0: native.Array<number>, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: string): okhttp3.ResponseBody;
			public create(param0: okio.BufferedSource, param1: okhttp3.MediaType, param2: number): okhttp3.ResponseBody;
			public create(param0: string, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			public create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: native.Array<number>): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: number, param2: okio.BufferedSource): okhttp3.ResponseBody;
		}
	}
}

declare module okhttp3 {
	export class Route {
		public static class: java.lang.Class<okhttp3.Route>;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		public proxy(): java.net.Proxy;
		public equals(param0: any): boolean;
		public constructor(param0: okhttp3.Address, param1: java.net.Proxy, param2: java.net.InetSocketAddress);
		public address(): okhttp3.Address;
		public hashCode(): number;
		/** @deprecated */
		public socketAddress(): java.net.InetSocketAddress;
		public toString(): string;
		/** @deprecated */
		public address(): okhttp3.Address;
		public requiresTunnel(): boolean;
		public socketAddress(): java.net.InetSocketAddress;
	}
}

declare module okhttp3 {
	export class TlsVersion {
		public static class: java.lang.Class<okhttp3.TlsVersion>;
		public static TLS_1_3: okhttp3.TlsVersion;
		public static TLS_1_2: okhttp3.TlsVersion;
		public static TLS_1_1: okhttp3.TlsVersion;
		public static TLS_1_0: okhttp3.TlsVersion;
		public static SSL_3_0: okhttp3.TlsVersion;
		public static Companion: okhttp3.TlsVersion.Companion;
		public javaName(): string;
		/** @deprecated */
		public javaName(): string;
		public static values(): native.Array<okhttp3.TlsVersion>;
		public static valueOf(param0: string): okhttp3.TlsVersion;
		public static forJavaName(param0: string): okhttp3.TlsVersion;
	}
	export module TlsVersion {
		export class Companion {
			public static class: java.lang.Class<okhttp3.TlsVersion.Companion>;
			public forJavaName(param0: string): okhttp3.TlsVersion;
		}
	}
}

declare module okhttp3 {
	export class WebSocket {
		public static class: java.lang.Class<okhttp3.WebSocket>;
		/**
		 * Constructs a new instance of the okhttp3.WebSocket interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			request(): okhttp3.Request;
			queueSize(): number;
			send(param0: string): boolean;
			send(param0: okio.ByteString): boolean;
			close(param0: number, param1: string): boolean;
			cancel(): void;
		});
		public constructor();
		public send(param0: string): boolean;
		public send(param0: okio.ByteString): boolean;
		public close(param0: number, param1: string): boolean;
		public request(): okhttp3.Request;
		public queueSize(): number;
		public cancel(): void;
	}
	export module WebSocket {
		export class Factory {
			public static class: java.lang.Class<okhttp3.WebSocket.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.WebSocket$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
			});
			public constructor();
			public newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
		}
	}
}

declare module okhttp3 {
	export abstract class WebSocketListener {
		public static class: java.lang.Class<okhttp3.WebSocketListener>;
		public constructor();
		public onClosed(param0: okhttp3.WebSocket, param1: number, param2: string): void;
		public onMessage(param0: okhttp3.WebSocket, param1: okio.ByteString): void;
		public onFailure(param0: okhttp3.WebSocket, param1: java.lang.Throwable, param2: okhttp3.Response): void;
		public onOpen(param0: okhttp3.WebSocket, param1: okhttp3.Response): void;
		public onClosing(param0: okhttp3.WebSocket, param1: number, param2: string): void;
		public onMessage(param0: okhttp3.WebSocket, param1: string): void;
	}
}

declare module okhttp3 {
	export module internal {
		export class HostnamesKt {
			public static class: java.lang.Class<okhttp3.internal.HostnamesKt>;
			public static toCanonicalHost(param0: string): string;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export class Internal {
			public static class: java.lang.Class<okhttp3.internal.Internal>;
			public static cacheGet(param0: okhttp3.Cache, param1: okhttp3.Request): okhttp3.Response;
			public static addHeaderLenient(param0: okhttp3.Headers.Builder, param1: string, param2: string): okhttp3.Headers.Builder;
			public static parseCookie(param0: number, param1: okhttp3.HttpUrl, param2: string): okhttp3.Cookie;
			public static applyConnectionSpec(param0: okhttp3.ConnectionSpec, param1: javax.net.ssl.SSLSocket, param2: boolean): void;
			public static cookieToString(param0: okhttp3.Cookie, param1: boolean): string;
			public static addHeaderLenient(param0: okhttp3.Headers.Builder, param1: string): okhttp3.Headers.Builder;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export class Util {
			public static class: java.lang.Class<okhttp3.internal.Util>;
			public static EMPTY_BYTE_ARRAY: native.Array<number>;
			public static EMPTY_HEADERS: okhttp3.Headers;
			public static EMPTY_RESPONSE: okhttp3.ResponseBody;
			public static EMPTY_REQUEST: okhttp3.RequestBody;
			public static UTC: java.util.TimeZone;
			public static assertionsEnabled: boolean;
			public static okHttpName: string;
			public static toHostHeader(param0: okhttp3.HttpUrl, param1: boolean): string;
			public static toHeaderList(param0: okhttp3.Headers): java.util.List<okhttp3.internal.http2.Header>;
			public static canReuseConnectionFor(param0: okhttp3.HttpUrl, param1: okhttp3.HttpUrl): boolean;
			public static toLongOrDefault(param0: string, param1: number): number;
			public static format(param0: string, param1: native.Array<any>): string;
			public static headersContentLength(param0: okhttp3.Response): number;
			public static addIfAbsent(param0: java.util.List, param1: any): void;
			public static canParseAsIpAddress(param0: string): boolean;
			public static isHealthy(param0: java.net.Socket, param1: okio.BufferedSource): boolean;
			public static asFactory(param0: okhttp3.EventListener): okhttp3.EventListener.Factory;
			public static indexOfNonWhitespace(param0: string, param1: number): number;
			public static parseHexDigit(param0: string): number;
			public static readBomAsCharset(param0: okio.BufferedSource, param1: java.nio.charset.Charset): java.nio.charset.Charset;
			public static indexOf(param0: native.Array<string>, param1: string, param2: java.util.Comparator<string>): number;
			public static concat(param0: native.Array<string>, param1: string): native.Array<string>;
			public static indexOfLastNonAsciiWhitespace(param0: string, param1: number, param2: number): number;
			public static hasIntersection(param0: native.Array<string>, param1: native.Array<string>, param2: java.util.Comparator<any>): boolean;
			public static discard(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
			public static skipAll(param0: okio.Buffer, param1: number): number;
			public static toHexString(param0: number): string;
			public static toImmutableList(param0: java.util.List): java.util.List;
			public static assertThreadHoldsLock(param0: any): void;
			public static notify(param0: any): void;
			public static threadFactory(param0: string, param1: boolean): java.util.concurrent.ThreadFactory;
			public static immutableListOf(param0: native.Array<any>): java.util.List;
			public static skipAll(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
			public static intersect(param0: native.Array<string>, param1: native.Array<string>, param2: java.util.Comparator<any>): native.Array<string>;
			public static checkOffsetAndCount(param0: number, param1: number, param2: number): void;
			public static readFieldOrNull(param0: any, param1: java.lang.Class, param2: string): any;
			public static indexOfFirstNonAsciiWhitespace(param0: string, param1: number, param2: number): number;
			public static toNonNegativeInt(param0: string, param1: number): number;
			public static indexOfControlOrNonAscii(param0: string): number;
			public static wait(param0: any): void;
			public static delimiterOffset(param0: string, param1: string, param2: number, param3: number): number;
			public static ignoreIoExceptions(param0: kotlin.jvm.functions.Function0<kotlin.Unit>): void;
			public static closeQuietly(param0: java.io.Closeable): void;
			public static trimSubstring(param0: string, param1: number, param2: number): string;
			public static closeQuietly(param0: java.net.Socket): void;
			public static checkDuration(param0: string, param1: number, param2: java.util.concurrent.TimeUnit): number;
			public static toImmutableMap(param0: java.util.Map): java.util.Map;
			public static notifyAll(param0: any): void;
			public static readMedium(param0: okio.BufferedSource): number;
			public static toHeaders(param0: java.util.List<okhttp3.internal.http2.Header>): okhttp3.Headers;
			public static peerName(param0: java.net.Socket): string;
			public static assertThreadDoesntHoldLock(param0: any): void;
			public static closeQuietly(param0: java.net.ServerSocket): void;
			public static and(param0: number, param1: number): number;
			public static writeMedium(param0: okio.BufferedSink, param1: number): void;
			public static threadName(param0: string, param1: kotlin.jvm.functions.Function0<kotlin.Unit>): void;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export class Version {
			public static class: java.lang.Class<okhttp3.internal.Version>;
			public static userAgent: string;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheInterceptor extends okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheInterceptor>;
				public static Companion: okhttp3.internal.cache.CacheInterceptor.Companion;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public getCacheDollarokhttp(): okhttp3.Cache;
				public constructor(param0: okhttp3.Cache);
			}
			export module CacheInterceptor {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheInterceptor.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheRequest {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheRequest>;
				/**
				 * Constructs a new instance of the okhttp3.internal.cache.CacheRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					body(): okio.Sink;
					abort(): void;
				});
				public constructor();
				public abort(): void;
				public body(): okio.Sink;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheStrategy {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy>;
				public static Companion: okhttp3.internal.cache.CacheStrategy.Companion;
				public getNetworkRequest(): okhttp3.Request;
				public getCacheResponse(): okhttp3.Response;
				public constructor(param0: okhttp3.Request, param1: okhttp3.Response);
			}
			export module CacheStrategy {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy.Companion>;
					public isCacheable(param0: okhttp3.Response, param1: okhttp3.Request): boolean;
				}
				export class Factory {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy.Factory>;
					public compute(): okhttp3.internal.cache.CacheStrategy;
					public constructor(param0: number, param1: okhttp3.Request, param2: okhttp3.Response);
					public getRequestDollarokhttp(): okhttp3.Request;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class DiskLruCache {
				public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache>;
				public static JOURNAL_FILE: string;
				public static JOURNAL_FILE_TEMP: string;
				public static JOURNAL_FILE_BACKUP: string;
				public static MAGIC: string;
				public static VERSION_1: string;
				public static ANY_SEQUENCE_NUMBER: number;
				public static LEGAL_KEY_PATTERN: kotlin.text.Regex;
				public static CLEAN: string;
				public static DIRTY: string;
				public static REMOVE: string;
				public static READ: string;
				public static Companion: okhttp3.internal.cache.DiskLruCache.Companion;
				public remove(param0: string): boolean;
				public getClosedDollarokhttp(): boolean;
				public edit(param0: string, param1: number): okhttp3.internal.cache.DiskLruCache.Editor;
				public getDirectory(): java.io.File;
				public getValueCountDollarokhttp(): number;
				public get(param0: string): okhttp3.internal.cache.DiskLruCache.Snapshot;
				public flush(): void;
				public constructor(param0: okhttp3.internal.io.FileSystem, param1: java.io.File, param2: number, param3: number, param4: number, param5: okhttp3.internal.concurrent.TaskRunner);
				public trimToSize(): void;
				public delete(): void;
				public getLruEntriesDollarokhttp(): java.util.LinkedHashMap<string,okhttp3.internal.cache.DiskLruCache.Entry>;
				public evictAll(): void;
				public rebuildJournalDollarokhttp(): void;
				public close(): void;
				public snapshots(): java.util.Iterator<okhttp3.internal.cache.DiskLruCache.Snapshot>;
				public isClosed(): boolean;
				public size(): number;
				public setMaxSize(param0: number): void;
				public setClosedDollarokhttp(param0: boolean): void;
				public edit(param0: string): okhttp3.internal.cache.DiskLruCache.Editor;
				public initialize(): void;
				public removeEntryDollarokhttp(param0: okhttp3.internal.cache.DiskLruCache.Entry): boolean;
				public completeEditDollarokhttp(param0: okhttp3.internal.cache.DiskLruCache.Editor, param1: boolean): void;
				public getMaxSize(): number;
				public getFileSystemDollarokhttp(): okhttp3.internal.io.FileSystem;
			}
			export module DiskLruCache {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Companion>;
				}
				export class Editor {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Editor>;
					public detachDollarokhttp(): void;
					public newSource(param0: number): okio.Source;
					public commit(): void;
					public newSink(param0: number): okio.Sink;
					public getEntryDollarokhttp(): okhttp3.internal.cache.DiskLruCache.Entry;
					public getWrittenDollarokhttp(): native.Array<boolean>;
					public constructor(param0: okhttp3.internal.cache.DiskLruCache.Entry);
					public abort(): void;
				}
				export class Entry {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Entry>;
					public getReadableDollarokhttp(): boolean;
					public constructor(param0: string);
					public getLengthsDollarokhttp(): native.Array<number>;
					public snapshotDollarokhttp(): okhttp3.internal.cache.DiskLruCache.Snapshot;
					public setReadableDollarokhttp(param0: boolean): void;
					public writeLengthsDollarokhttp(param0: okio.BufferedSink): void;
					public setSequenceNumberDollarokhttp(param0: number): void;
					public setLengthsDollarokhttp(param0: java.util.List<string>): void;
					public setCurrentEditorDollarokhttp(param0: okhttp3.internal.cache.DiskLruCache.Editor): void;
					public getCleanFilesDollarokhttp(): java.util.List<java.io.File>;
					public getSequenceNumberDollarokhttp(): number;
					public getKeyDollarokhttp(): string;
					public getDirtyFilesDollarokhttp(): java.util.List<java.io.File>;
					public getCurrentEditorDollarokhttp(): okhttp3.internal.cache.DiskLruCache.Editor;
				}
				export class Snapshot {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Snapshot>;
					public constructor(param0: string, param1: number, param2: java.util.List<any>, param3: native.Array<number>);
					public close(): void;
					public key(): string;
					public getLength(param0: number): number;
					public edit(): okhttp3.internal.cache.DiskLruCache.Editor;
					public getSource(param0: number): okio.Source;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class FaultHidingSink {
				public static class: java.lang.Class<okhttp3.internal.cache.FaultHidingSink>;
				public close(): void;
				public getOnException(): kotlin.jvm.functions.Function1<java.io.IOException,kotlin.Unit>;
				public constructor(param0: okio.Sink, param1: kotlin.jvm.functions.Function1<any,kotlin.Unit>);
				public write(param0: okio.Buffer, param1: number): void;
				public flush(): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache2 {
			export class FileOperator {
				public static class: java.lang.Class<okhttp3.internal.cache2.FileOperator>;
				public write(param0: number, param1: okio.Buffer, param2: number): void;
				public read(param0: number, param1: okio.Buffer, param2: number): void;
				public constructor(param0: java.nio.channels.FileChannel);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache2 {
			export class Relay {
				public static class: java.lang.Class<okhttp3.internal.cache2.Relay>;
				public static PREFIX_CLEAN: okio.ByteString;
				public static PREFIX_DIRTY: okio.ByteString;
				public static Companion: okhttp3.internal.cache2.Relay.Companion;
				public commit(param0: number): void;
				public newSource(): okio.Source;
				public getUpstreamReader(): java.lang.Thread;
				public getUpstreamBuffer(): okio.Buffer;
				public setComplete(param0: boolean): void;
				public getSourceCount(): number;
				public metadata(): okio.ByteString;
				public setFile(param0: java.io.RandomAccessFile): void;
				public getUpstreamPos(): number;
				public isClosed(): boolean;
				public getComplete(): boolean;
				public getFile(): java.io.RandomAccessFile;
				public getBufferMaxSize(): number;
				public setUpstream(param0: okio.Source): void;
				public setUpstreamReader(param0: java.lang.Thread): void;
				public setSourceCount(param0: number): void;
				public getBuffer(): okio.Buffer;
				public getUpstream(): okio.Source;
				public setUpstreamPos(param0: number): void;
			}
			export module Relay {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.cache2.Relay.Companion>;
					public edit(param0: java.io.File, param1: okio.Source, param2: okio.ByteString, param3: number): okhttp3.internal.cache2.Relay;
					public read(param0: java.io.File): okhttp3.internal.cache2.Relay;
				}
				export class RelaySource {
					public static class: java.lang.Class<okhttp3.internal.cache2.Relay.RelaySource>;
					public constructor(param0: okhttp3.internal.cache2.Relay);
					public close(): void;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export abstract class Task {
				public static class: java.lang.Class<okhttp3.internal.concurrent.Task>;
				public getNextExecuteNanoTimeDollarokhttp(): number;
				public runOnce(): number;
				public setNextExecuteNanoTimeDollarokhttp(param0: number): void;
				public setQueueDollarokhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public constructor(param0: string, param1: boolean);
				public getQueueDollarokhttp(): okhttp3.internal.concurrent.TaskQueue;
				public getCancelable(): boolean;
				public initQueueDollarokhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public getName(): string;
				public toString(): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export class TaskLoggerKt {
				public static class: java.lang.Class<okhttp3.internal.concurrent.TaskLoggerKt>;
				public static taskLog(param0: okhttp3.internal.concurrent.Task, param1: okhttp3.internal.concurrent.TaskQueue, param2: kotlin.jvm.functions.Function0<string>): void;
				public static formatDuration(param0: number): string;
				public static logElapsed(param0: okhttp3.internal.concurrent.Task, param1: okhttp3.internal.concurrent.TaskQueue, param2: kotlin.jvm.functions.Function0): any;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export class TaskQueue {
				public static class: java.lang.Class<okhttp3.internal.concurrent.TaskQueue>;
				public getActiveTaskDollarokhttp(): okhttp3.internal.concurrent.Task;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: string);
				public getNameDollarokhttp(): string;
				public toString(): string;
				public scheduleAndDecideDollarokhttp(param0: okhttp3.internal.concurrent.Task, param1: number, param2: boolean): boolean;
				public schedule(param0: string, param1: number, param2: kotlin.jvm.functions.Function0<java.lang.Long>): void;
				public getFutureTasksDollarokhttp(): java.util.List<okhttp3.internal.concurrent.Task>;
				public getTaskRunnerDollarokhttp(): okhttp3.internal.concurrent.TaskRunner;
				public shutdown(): void;
				public getCancelActiveTaskDollarokhttp(): boolean;
				public getScheduledTasks(): java.util.List<okhttp3.internal.concurrent.Task>;
				public cancelAll(): void;
				public getShutdownDollarokhttp(): boolean;
				public execute(param0: string, param1: number, param2: boolean, param3: kotlin.jvm.functions.Function0<kotlin.Unit>): void;
				public setShutdownDollarokhttp(param0: boolean): void;
				public setActiveTaskDollarokhttp(param0: okhttp3.internal.concurrent.Task): void;
				public idleLatch(): java.util.concurrent.CountDownLatch;
				public cancelAllAndDecideDollarokhttp(): boolean;
				public schedule(param0: okhttp3.internal.concurrent.Task, param1: number): void;
				public setCancelActiveTaskDollarokhttp(param0: boolean): void;
			}
			export module TaskQueue {
				export class AwaitIdleTask extends okhttp3.internal.concurrent.Task {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskQueue.AwaitIdleTask>;
					public runOnce(): number;
					public constructor();
					public constructor(param0: string, param1: boolean);
					public getLatch(): java.util.concurrent.CountDownLatch;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export class TaskRunner {
				public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner>;
				public static INSTANCE: okhttp3.internal.concurrent.TaskRunner;
				public static Companion: okhttp3.internal.concurrent.TaskRunner.Companion;
				public kickCoordinatorDollarokhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public activeQueues(): java.util.List<okhttp3.internal.concurrent.TaskQueue>;
				public getBackend(): okhttp3.internal.concurrent.TaskRunner.Backend;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner.Backend);
				public awaitTaskToRun(): okhttp3.internal.concurrent.Task;
				public newQueue(): okhttp3.internal.concurrent.TaskQueue;
			}
			export module TaskRunner {
				export class Backend {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.Backend>;
					/**
					 * Constructs a new instance of the okhttp3.internal.concurrent.TaskRunner$Backend interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
						nanoTime(): number;
						coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
						coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
						execute(param0: java.lang.Runnable): void;
					});
					public constructor();
					public coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
					public execute(param0: java.lang.Runnable): void;
					public coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public nanoTime(): number;
				}
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.Companion>;
					public getLogger(): java.util.logging.Logger;
				}
				export class RealBackend extends okhttp3.internal.concurrent.TaskRunner.Backend {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.RealBackend>;
					public coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
					public execute(param0: java.lang.Runnable): void;
					public shutdown(): void;
					public coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public constructor(param0: java.util.concurrent.ThreadFactory);
					public beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public nanoTime(): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ConnectInterceptor extends okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.connection.ConnectInterceptor>;
				public static INSTANCE: okhttp3.internal.connection.ConnectInterceptor;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ConnectionSpecSelector {
				public static class: java.lang.Class<okhttp3.internal.connection.ConnectionSpecSelector>;
				public constructor(param0: java.util.List<okhttp3.ConnectionSpec>);
				public configureSecureSocket(param0: javax.net.ssl.SSLSocket): okhttp3.ConnectionSpec;
				public connectionFailed(param0: java.io.IOException): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class Exchange {
				public static class: java.lang.Class<okhttp3.internal.connection.Exchange>;
				public finishRequest(): void;
				public getCallDollarokhttp(): okhttp3.internal.connection.RealCall;
				public trailers(): okhttp3.Headers;
				public getEventListenerDollarokhttp(): okhttp3.EventListener;
				public isDuplexDollarokhttp(): boolean;
				public getConnectionDollarokhttp(): okhttp3.internal.connection.RealConnection;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public newWebSocketStreams(): okhttp3.internal.ws.RealWebSocket.Streams;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public responseHeadersStart(): void;
				public noRequestBody(): void;
				public isCoalescedConnectionDollarokhttp(): boolean;
				public detachWithViolence(): void;
				public openResponseBody(param0: okhttp3.Response): okhttp3.ResponseBody;
				public responseHeadersEnd(param0: okhttp3.Response): void;
				public webSocketUpgradeFailed(): void;
				public constructor(param0: okhttp3.internal.connection.RealCall, param1: okhttp3.EventListener, param2: okhttp3.internal.connection.ExchangeFinder, param3: okhttp3.internal.http.ExchangeCodec);
				public createRequestBody(param0: okhttp3.Request, param1: boolean): okio.Sink;
				public cancel(): void;
				public flushRequest(): void;
				public noNewExchangesOnConnection(): void;
				public bodyComplete(param0: number, param1: boolean, param2: boolean, param3: java.io.IOException): java.io.IOException;
			}
			export module Exchange {
				export class RequestBodySink {
					public static class: java.lang.Class<okhttp3.internal.connection.Exchange.RequestBodySink>;
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public constructor(param0: okio.Sink, param1: number);
				}
				export class ResponseBodySource {
					public static class: java.lang.Class<okhttp3.internal.connection.Exchange.ResponseBodySource>;
					public constructor(param0: okio.Source, param1: number);
					public close(): void;
					public complete(param0: java.io.IOException): java.io.IOException;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ExchangeFinder {
				public static class: java.lang.Class<okhttp3.internal.connection.ExchangeFinder>;
				public getAddressDollarokhttp(): okhttp3.Address;
				public connectingConnection(): okhttp3.internal.connection.RealConnection;
				public find(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.http.ExchangeCodec;
				public retryAfterFailure(): boolean;
				public constructor(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Address, param2: okhttp3.internal.connection.RealCall, param3: okhttp3.EventListener);
				public trackFailure(param0: java.io.IOException): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealCall extends okhttp3.Call {
				public static class: java.lang.Class<okhttp3.internal.connection.RealCall>;
				public request(): okhttp3.Request;
				public initExchangeDollarokhttp(param0: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.connection.Exchange;
				public timeoutEarlyExit(): void;
				public acquireConnectionNoEvents(param0: okhttp3.internal.connection.RealConnection): void;
				public getResponseWithInterceptorChainDollarokhttp(): okhttp3.Response;
				public redactedUrlDollarokhttp(): string;
				public isCanceled(): boolean;
				public timeout(): okio.Timeout;
				public releaseConnectionNoEventsDollarokhttp(): java.net.Socket;
				public cancel(): void;
				public execute(): okhttp3.Response;
				public getConnection(): okhttp3.internal.connection.RealConnection;
				public noMoreExchangesDollarokhttp(param0: java.io.IOException): java.io.IOException;
				public getForWebSocket(): boolean;
				public enqueue(param0: okhttp3.Callback): void;
				public enterNetworkInterceptorExchange(param0: okhttp3.Request, param1: boolean): void;
				public messageDoneDollarokhttp(param0: okhttp3.internal.connection.Exchange, param1: boolean, param2: boolean, param3: java.io.IOException): java.io.IOException;
				public retryAfterFailure(): boolean;
				public timeout(): okio.AsyncTimeout;
				public getClient(): okhttp3.OkHttpClient;
				public clone(): okhttp3.internal.connection.RealCall;
				public exitNetworkInterceptorExchangeDollarokhttp(param0: boolean): void;
				public clone(): okhttp3.Call;
				public getOriginalRequest(): okhttp3.Request;
				public setConnection(param0: okhttp3.internal.connection.RealConnection): void;
				public getInterceptorScopedExchangeDollarokhttp(): okhttp3.internal.connection.Exchange;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.Request, param2: boolean);
				public isExecuted(): boolean;
			}
			export module RealCall {
				export class AsyncCall {
					public static class: java.lang.Class<okhttp3.internal.connection.RealCall.AsyncCall>;
					public reuseCallsPerHostFrom(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
					public getCallsPerHost(): java.util.concurrent.atomic.AtomicInteger;
					public executeOn(param0: java.util.concurrent.ExecutorService): void;
					public run(): void;
					public getRequest(): okhttp3.Request;
					public constructor(param0: okhttp3.Callback);
					public getCall(): okhttp3.internal.connection.RealCall;
					public getHost(): string;
				}
				export class CallReference extends java.lang.ref.WeakReference<okhttp3.internal.connection.RealCall> {
					public static class: java.lang.Class<okhttp3.internal.connection.RealCall.CallReference>;
					public getCallStackTrace(): any;
					public constructor(param0: okhttp3.internal.connection.RealCall, param1: any);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealConnection extends okhttp3.internal.http2.Http2Connection.Listener implements okhttp3.Connection {
				public static class: java.lang.Class<okhttp3.internal.connection.RealConnection>;
				public static IDLE_CONNECTION_HEALTHY_NS: number;
				public static Companion: okhttp3.internal.connection.RealConnection.Companion;
				public newWebSocketStreamsDollarokhttp(param0: okhttp3.internal.connection.Exchange): okhttp3.internal.ws.RealWebSocket.Streams;
				public connect(param0: number, param1: number, param2: number, param3: number, param4: boolean, param5: okhttp3.Call, param6: okhttp3.EventListener): void;
				public protocol(): okhttp3.Protocol;
				public getSuccessCountDollarokhttp(): number;
				public socket(): java.net.Socket;
				public constructor();
				public trackFailureDollarokhttp(param0: okhttp3.internal.connection.RealCall, param1: java.io.IOException): void;
				public isHealthy(param0: boolean): boolean;
				public getConnectionPool(): okhttp3.internal.connection.RealConnectionPool;
				public cancel(): void;
				public setSuccessCountDollarokhttp(param0: number): void;
				public isMultiplexed(): boolean;
				public handshake(): okhttp3.Handshake;
				public getCalls(): java.util.List<java.lang.ref.Reference<okhttp3.internal.connection.RealCall>>;
				public constructor(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Route);
				public onSettings(param0: okhttp3.internal.http2.Http2Connection, param1: okhttp3.internal.http2.Settings): void;
				public getRouteFailureCountDollarokhttp(): number;
				public setIdleAtNsDollarokhttp(param0: number): void;
				public noCoalescedConnections(): void;
				public route(): okhttp3.Route;
				public noNewExchanges(): void;
				public setNoNewExchanges(param0: boolean): void;
				public isEligibleDollarokhttp(param0: okhttp3.Address, param1: java.util.List<okhttp3.Route>): boolean;
				public toString(): string;
				public onStream(param0: okhttp3.internal.http2.Http2Stream): void;
				public newCodecDollarokhttp(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.http.ExchangeCodec;
				public supportsUrl(param0: okhttp3.HttpUrl): boolean;
				public getIdleAtNsDollarokhttp(): number;
				public connectFailedDollarokhttp(param0: okhttp3.OkHttpClient, param1: okhttp3.Route, param2: java.io.IOException): void;
				public getNoNewExchanges(): boolean;
				public setRouteFailureCountDollarokhttp(param0: number): void;
			}
			export module RealConnection {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnection.Companion>;
					public newTestConnection(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Route, param2: java.net.Socket, param3: number): okhttp3.internal.connection.RealConnection;
				}
				export class WhenMappings {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnection.WhenMappings>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealConnectionPool {
				public static class: java.lang.Class<okhttp3.internal.connection.RealConnectionPool>;
				public static Companion: okhttp3.internal.connection.RealConnectionPool.Companion;
				public cleanup(param0: number): number;
				public connectionCount(): number;
				public callAcquirePooledConnection(param0: okhttp3.Address, param1: okhttp3.internal.connection.RealCall, param2: java.util.List<okhttp3.Route>, param3: boolean): boolean;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: number, param2: number, param3: java.util.concurrent.TimeUnit);
				public put(param0: okhttp3.internal.connection.RealConnection): void;
				public evictAll(): void;
				public idleConnectionCount(): number;
				public connectionBecameIdle(param0: okhttp3.internal.connection.RealConnection): boolean;
			}
			export module RealConnectionPool {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnectionPool.Companion>;
					public get(param0: okhttp3.ConnectionPool): okhttp3.internal.connection.RealConnectionPool;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteDatabase {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteDatabase>;
				public shouldPostpone(param0: okhttp3.Route): boolean;
				public connected(param0: okhttp3.Route): void;
				public failed(param0: okhttp3.Route): void;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteException {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteException>;
				public getLastConnectException(): java.io.IOException;
				public constructor(param0: java.io.IOException);
				public addConnectException(param0: java.io.IOException): void;
				public getFirstConnectException(): java.io.IOException;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteSelector {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector>;
				public static Companion: okhttp3.internal.connection.RouteSelector.Companion;
				public next(): okhttp3.internal.connection.RouteSelector.Selection;
				public constructor(param0: okhttp3.Address, param1: okhttp3.internal.connection.RouteDatabase, param2: okhttp3.Call, param3: okhttp3.EventListener);
				public hasNext(): boolean;
			}
			export module RouteSelector {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector.Companion>;
					public getSocketHost(param0: java.net.InetSocketAddress): string;
				}
				export class Selection {
					public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector.Selection>;
					public next(): okhttp3.Route;
					public constructor(param0: java.util.List<okhttp3.Route>);
					public getRoutes(): java.util.List<okhttp3.Route>;
					public hasNext(): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class BridgeInterceptor extends okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.BridgeInterceptor>;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public constructor(param0: okhttp3.CookieJar);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class CallServerInterceptor extends okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.CallServerInterceptor>;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public constructor(param0: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class DatesKt {
				public static class: java.lang.Class<okhttp3.internal.http.DatesKt>;
				public static MAX_DATE: number;
				public static toHttpDateOrNull(param0: string): java.util.Date;
				public static toHttpDateString(param0: java.util.Date): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class ExchangeCodec {
				public static class: java.lang.Class<okhttp3.internal.http.ExchangeCodec>;
				/**
				 * Constructs a new instance of the okhttp3.internal.http.ExchangeCodec interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					getConnection(): okhttp3.internal.connection.RealConnection;
					createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
					writeRequestHeaders(param0: okhttp3.Request): void;
					flushRequest(): void;
					finishRequest(): void;
					readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
					reportedContentLength(param0: okhttp3.Response): number;
					openResponseBodySource(param0: okhttp3.Response): okio.Source;
					trailers(): okhttp3.Headers;
					cancel(): void;
					<clinit>(): void;
				});
				public constructor();
				public static DISCARD_STREAM_TIMEOUT_MILLIS: number;
				public static Companion: okhttp3.internal.http.ExchangeCodec.Companion;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public reportedContentLength(param0: okhttp3.Response): number;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public cancel(): void;
				public flushRequest(): void;
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module ExchangeCodec {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http.ExchangeCodec.Companion>;
					public static DISCARD_STREAM_TIMEOUT_MILLIS: number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class HttpHeaders {
				public static class: java.lang.Class<okhttp3.internal.http.HttpHeaders>;
				public static receiveHeaders(param0: okhttp3.CookieJar, param1: okhttp3.HttpUrl, param2: okhttp3.Headers): void;
				public static promisesBody(param0: okhttp3.Response): boolean;
				/** @deprecated */
				public static hasBody(param0: okhttp3.Response): boolean;
				public static parseChallenges(param0: okhttp3.Headers, param1: string): java.util.List<okhttp3.Challenge>;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class HttpMethod {
				public static class: java.lang.Class<okhttp3.internal.http.HttpMethod>;
				public static INSTANCE: okhttp3.internal.http.HttpMethod;
				public static requiresRequestBody(param0: string): boolean;
				public static permitsRequestBody(param0: string): boolean;
				public redirectsToGet(param0: string): boolean;
				public redirectsWithBody(param0: string): boolean;
				public invalidatesCache(param0: string): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RealInterceptorChain extends okhttp3.Interceptor.Chain {
				public static class: java.lang.Class<okhttp3.internal.http.RealInterceptorChain>;
				public request(): okhttp3.Request;
				public getConnectTimeoutMillisDollarokhttp(): number;
				public getCallDollarokhttp(): okhttp3.internal.connection.RealCall;
				public getRequestDollarokhttp(): okhttp3.Request;
				public connectTimeoutMillis(): number;
				public getReadTimeoutMillisDollarokhttp(): number;
				public getWriteTimeoutMillisDollarokhttp(): number;
				public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				public constructor(param0: okhttp3.internal.connection.RealCall, param1: java.util.List<any>, param2: number, param3: okhttp3.internal.connection.Exchange, param4: okhttp3.Request, param5: number, param6: number, param7: number);
				public connection(): okhttp3.Connection;
				public writeTimeoutMillis(): number;
				public copyDollarokhttp(param0: number, param1: okhttp3.internal.connection.Exchange, param2: okhttp3.Request, param3: number, param4: number, param5: number): okhttp3.internal.http.RealInterceptorChain;
				public readTimeoutMillis(): number;
				public call(): okhttp3.Call;
				public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				public proceed(param0: okhttp3.Request): okhttp3.Response;
				public getExchangeDollarokhttp(): okhttp3.internal.connection.Exchange;
				public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RealResponseBody extends okhttp3.ResponseBody {
				public static class: java.lang.Class<okhttp3.internal.http.RealResponseBody>;
				public contentLength(): number;
				public constructor(param0: string, param1: number, param2: okio.BufferedSource);
				public source(): okio.BufferedSource;
				public contentType(): okhttp3.MediaType;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RequestLine {
				public static class: java.lang.Class<okhttp3.internal.http.RequestLine>;
				public static INSTANCE: okhttp3.internal.http.RequestLine;
				public get(param0: okhttp3.Request, param1: java.net.Proxy.Type): string;
				public requestPath(param0: okhttp3.HttpUrl): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RetryAndFollowUpInterceptor extends okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.RetryAndFollowUpInterceptor>;
				public static Companion: okhttp3.internal.http.RetryAndFollowUpInterceptor.Companion;
				public constructor(param0: okhttp3.OkHttpClient);
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
			}
			export module RetryAndFollowUpInterceptor {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http.RetryAndFollowUpInterceptor.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class StatusLine {
				public static class: java.lang.Class<okhttp3.internal.http.StatusLine>;
				public protocol: okhttp3.Protocol;
				public code: number;
				public message: string;
				public static HTTP_TEMP_REDIRECT: number;
				public static HTTP_PERM_REDIRECT: number;
				public static HTTP_MISDIRECTED_REQUEST: number;
				public static HTTP_CONTINUE: number;
				public static Companion: okhttp3.internal.http.StatusLine.Companion;
				public constructor(param0: okhttp3.Protocol, param1: number, param2: string);
				public toString(): string;
			}
			export module StatusLine {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http.StatusLine.Companion>;
					public parse(param0: string): okhttp3.internal.http.StatusLine;
					public get(param0: okhttp3.Response): okhttp3.internal.http.StatusLine;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http1 {
			export class Http1ExchangeCodec extends okhttp3.internal.http.ExchangeCodec {
				public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec>;
				public static Companion: okhttp3.internal.http1.Http1ExchangeCodec.Companion;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public isClosed(): boolean;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public skipConnectBody(param0: okhttp3.Response): void;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public writeRequest(param0: okhttp3.Headers, param1: string): void;
				public reportedContentLength(param0: okhttp3.Response): number;
				public cancel(): void;
				public flushRequest(): void;
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.connection.RealConnection, param2: okio.BufferedSource, param3: okio.BufferedSink);
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module Http1ExchangeCodec {
				export abstract class AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public getTimeout(): okio.ForwardingTimeout;
					public getClosed(): boolean;
					public responseBodyCompleteDollarokhttp(): void;
					public timeout(): okio.Timeout;
					public setClosed(param0: boolean): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
				export class ChunkedSink {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.ChunkedSink>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
				}
				export class ChunkedSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.ChunkedSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public constructor(param0: okhttp3.HttpUrl);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.Companion>;
				}
				export class FixedLengthSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.FixedLengthSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
					public constructor(param0: number);
				}
				export class KnownLengthSink {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.KnownLengthSink>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
				}
				export class UnknownLengthSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.UnknownLengthSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class ConnectionShutdownException {
				public static class: java.lang.Class<okhttp3.internal.http2.ConnectionShutdownException>;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class ErrorCode {
				public static class: java.lang.Class<okhttp3.internal.http2.ErrorCode>;
				public static NO_ERROR: okhttp3.internal.http2.ErrorCode;
				public static PROTOCOL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static INTERNAL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static FLOW_CONTROL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static SETTINGS_TIMEOUT: okhttp3.internal.http2.ErrorCode;
				public static STREAM_CLOSED: okhttp3.internal.http2.ErrorCode;
				public static FRAME_SIZE_ERROR: okhttp3.internal.http2.ErrorCode;
				public static REFUSED_STREAM: okhttp3.internal.http2.ErrorCode;
				public static CANCEL: okhttp3.internal.http2.ErrorCode;
				public static COMPRESSION_ERROR: okhttp3.internal.http2.ErrorCode;
				public static CONNECT_ERROR: okhttp3.internal.http2.ErrorCode;
				public static ENHANCE_YOUR_CALM: okhttp3.internal.http2.ErrorCode;
				public static INADEQUATE_SECURITY: okhttp3.internal.http2.ErrorCode;
				public static HTTP_1_1_REQUIRED: okhttp3.internal.http2.ErrorCode;
				public static Companion: okhttp3.internal.http2.ErrorCode.Companion;
				public static valueOf(param0: string): okhttp3.internal.http2.ErrorCode;
				public static values(): native.Array<okhttp3.internal.http2.ErrorCode>;
				public getHttpCode(): number;
			}
			export module ErrorCode {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.ErrorCode.Companion>;
					public fromHttp2(param0: number): okhttp3.internal.http2.ErrorCode;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Header {
				public static class: java.lang.Class<okhttp3.internal.http2.Header>;
				public hpackSize: number;
				public name: okio.ByteString;
				public value: okio.ByteString;
				public static PSEUDO_PREFIX: okio.ByteString;
				public static RESPONSE_STATUS_UTF8: string;
				public static TARGET_METHOD_UTF8: string;
				public static TARGET_PATH_UTF8: string;
				public static TARGET_SCHEME_UTF8: string;
				public static TARGET_AUTHORITY_UTF8: string;
				public static RESPONSE_STATUS: okio.ByteString;
				public static TARGET_METHOD: okio.ByteString;
				public static TARGET_PATH: okio.ByteString;
				public static TARGET_SCHEME: okio.ByteString;
				public static TARGET_AUTHORITY: okio.ByteString;
				public static Companion: okhttp3.internal.http2.Header.Companion;
				public constructor(param0: okio.ByteString, param1: okio.ByteString);
				public component2(): okio.ByteString;
				public hashCode(): number;
				public copy(param0: okio.ByteString, param1: okio.ByteString): okhttp3.internal.http2.Header;
				public equals(param0: any): boolean;
				public constructor(param0: okio.ByteString, param1: string);
				public component1(): okio.ByteString;
				public toString(): string;
				public constructor(param0: string, param1: string);
			}
			export module Header {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Header.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Hpack {
				public static class: java.lang.Class<okhttp3.internal.http2.Hpack>;
				public static INSTANCE: okhttp3.internal.http2.Hpack;
				public checkLowercase(param0: okio.ByteString): okio.ByteString;
				public getNAME_TO_FIRST_INDEX(): java.util.Map<okio.ByteString,java.lang.Integer>;
				public getSTATIC_HEADER_TABLE(): native.Array<okhttp3.internal.http2.Header>;
			}
			export module Hpack {
				export class Reader {
					public static class: java.lang.Class<okhttp3.internal.http2.Hpack.Reader>;
					public dynamicTable: native.Array<okhttp3.internal.http2.Header>;
					public headerCount: number;
					public dynamicTableByteCount: number;
					public maxDynamicTableByteCount(): number;
					public constructor(param0: okio.Source, param1: number, param2: number);
					public constructor(param0: okio.Source, param1: number);
					public readHeaders(): void;
					public readByteString(): okio.ByteString;
					public getAndResetHeaderList(): java.util.List<okhttp3.internal.http2.Header>;
					public readInt(param0: number, param1: number): number;
				}
				export class Writer {
					public static class: java.lang.Class<okhttp3.internal.http2.Hpack.Writer>;
					public maxDynamicTableByteCount: number;
					public dynamicTable: native.Array<okhttp3.internal.http2.Header>;
					public headerCount: number;
					public dynamicTableByteCount: number;
					public headerTableSizeSetting: number;
					public writeByteString(param0: okio.ByteString): void;
					public writeHeaders(param0: java.util.List<okhttp3.internal.http2.Header>): void;
					public constructor(param0: number, param1: okio.Buffer);
					public constructor(param0: number, param1: boolean, param2: okio.Buffer);
					public resizeHeaderTable(param0: number): void;
					public writeInt(param0: number, param1: number, param2: number): void;
					public constructor(param0: okio.Buffer);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2 {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2>;
				public static CONNECTION_PREFACE: okio.ByteString;
				public static INITIAL_MAX_FRAME_SIZE: number;
				public static TYPE_DATA: number;
				public static TYPE_HEADERS: number;
				public static TYPE_PRIORITY: number;
				public static TYPE_RST_STREAM: number;
				public static TYPE_SETTINGS: number;
				public static TYPE_PUSH_PROMISE: number;
				public static TYPE_PING: number;
				public static TYPE_GOAWAY: number;
				public static TYPE_WINDOW_UPDATE: number;
				public static TYPE_CONTINUATION: number;
				public static FLAG_NONE: number;
				public static FLAG_ACK: number;
				public static FLAG_END_STREAM: number;
				public static FLAG_END_HEADERS: number;
				public static FLAG_END_PUSH_PROMISE: number;
				public static FLAG_PADDED: number;
				public static FLAG_PRIORITY: number;
				public static FLAG_COMPRESSED: number;
				public static INSTANCE: okhttp3.internal.http2.Http2;
				public formatFlags(param0: number, param1: number): string;
				public frameLog(param0: boolean, param1: number, param2: number, param3: number, param4: number): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Connection {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection>;
				public static OKHTTP_CLIENT_WINDOW_SIZE: number;
				public static INTERVAL_PING: number;
				public static DEGRADED_PING: number;
				public static AWAIT_PING: number;
				public static DEGRADED_PONG_TIMEOUT_NS: number;
				public static Companion: okhttp3.internal.http2.Http2Connection.Companion;
				public getClientDollarokhttp(): boolean;
				public pushStream(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): okhttp3.internal.http2.Http2Stream;
				public writeSynResetDollarokhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public pushedStreamDollarokhttp(param0: number): boolean;
				public getOkHttpSettings(): okhttp3.internal.http2.Settings;
				public setNextStreamIdDollarokhttp(param0: number): void;
				public writePing(param0: boolean, param1: number, param2: number): void;
				public getReaderRunnable(): okhttp3.internal.http2.Http2Connection.ReaderRunnable;
				public writeWindowUpdateLaterDollarokhttp(param0: number, param1: number): void;
				public getListenerDollarokhttp(): okhttp3.internal.http2.Http2Connection.Listener;
				public openStreamCount(): number;
				public getLastGoodStreamIdDollarokhttp(): number;
				public awaitPong(): void;
				public flush(): void;
				public writeSynResetLaterDollarokhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public setLastGoodStreamIdDollarokhttp(param0: number): void;
				public start(): void;
				public getNextStreamIdDollarokhttp(): number;
				public getConnectionNameDollarokhttp(): string;
				public setPeerSettings(param0: okhttp3.internal.http2.Settings): void;
				public getWriter(): okhttp3.internal.http2.Http2Writer;
				public writeHeadersDollarokhttp(param0: number, param1: boolean, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public pushDataLaterDollarokhttp(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): void;
				public constructor(param0: okhttp3.internal.http2.Http2Connection.Builder);
				public closeDollarokhttp(param0: okhttp3.internal.http2.ErrorCode, param1: okhttp3.internal.http2.ErrorCode, param2: java.io.IOException): void;
				public writeData(param0: number, param1: boolean, param2: okio.Buffer, param3: number): void;
				public close(): void;
				public removeStreamDollarokhttp(param0: number): okhttp3.internal.http2.Http2Stream;
				public getSocketDollarokhttp(): java.net.Socket;
				public writePingAndAwaitPong(): void;
				public start(param0: boolean): void;
				public sendDegradedPingLaterDollarokhttp(): void;
				public getStream(param0: number): okhttp3.internal.http2.Http2Stream;
				public shutdown(param0: okhttp3.internal.http2.ErrorCode): void;
				public pushRequestLaterDollarokhttp(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): void;
				public setSettings(param0: okhttp3.internal.http2.Settings): void;
				public isHealthy(param0: number): boolean;
				public getReadBytesAcknowledged(): number;
				public getStreamsDollarokhttp(): java.util.Map<java.lang.Integer,okhttp3.internal.http2.Http2Stream>;
				public getWriteBytesTotal(): number;
				public writePing(): void;
				public pushHeadersLaterDollarokhttp(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): void;
				public updateConnectionFlowControlDollarokhttp(param0: number): void;
				public newStream(param0: java.util.List<okhttp3.internal.http2.Header>, param1: boolean): okhttp3.internal.http2.Http2Stream;
				public getPeerSettings(): okhttp3.internal.http2.Settings;
				public getWriteBytesMaximum(): number;
				public getReadBytesTotal(): number;
				public pushResetLaterDollarokhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
			}
			export module Http2Connection {
				export class Builder {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Builder>;
					public connectionName: string;
					public source: okio.BufferedSource;
					public sink: okio.BufferedSink;
					public setPushObserverDollarokhttp(param0: okhttp3.internal.http2.PushObserver): void;
					public listener(param0: okhttp3.internal.http2.Http2Connection.Listener): okhttp3.internal.http2.Http2Connection.Builder;
					public build(): okhttp3.internal.http2.Http2Connection;
					public setSocketDollarokhttp(param0: java.net.Socket): void;
					public socket(param0: java.net.Socket, param1: string, param2: okio.BufferedSource): okhttp3.internal.http2.Http2Connection.Builder;
					public getClientDollarokhttp(): boolean;
					public pushObserver(param0: okhttp3.internal.http2.PushObserver): okhttp3.internal.http2.Http2Connection.Builder;
					public setClientDollarokhttp(param0: boolean): void;
					public getSocketDollarokhttp(): java.net.Socket;
					public getListenerDollarokhttp(): okhttp3.internal.http2.Http2Connection.Listener;
					public socket(param0: java.net.Socket, param1: string): okhttp3.internal.http2.Http2Connection.Builder;
					public pingIntervalMillis(param0: number): okhttp3.internal.http2.Http2Connection.Builder;
					public constructor(param0: boolean, param1: okhttp3.internal.concurrent.TaskRunner);
					public setConnectionNameDollarokhttp(param0: string): void;
					public setPingIntervalMillisDollarokhttp(param0: number): void;
					public getSourceDollarokhttp(): okio.BufferedSource;
					public setListenerDollarokhttp(param0: okhttp3.internal.http2.Http2Connection.Listener): void;
					public socket(param0: java.net.Socket, param1: string, param2: okio.BufferedSource, param3: okio.BufferedSink): okhttp3.internal.http2.Http2Connection.Builder;
					public getConnectionNameDollarokhttp(): string;
					public getPushObserverDollarokhttp(): okhttp3.internal.http2.PushObserver;
					public getSinkDollarokhttp(): okio.BufferedSink;
					public setSinkDollarokhttp(param0: okio.BufferedSink): void;
					public getPingIntervalMillisDollarokhttp(): number;
					public setSourceDollarokhttp(param0: okio.BufferedSource): void;
					public getTaskRunnerDollarokhttp(): okhttp3.internal.concurrent.TaskRunner;
					public socket(param0: java.net.Socket): okhttp3.internal.http2.Http2Connection.Builder;
				}
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Companion>;
					public getDEFAULT_SETTINGS(): okhttp3.internal.http2.Settings;
				}
				export abstract class Listener {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Listener>;
					public static REFUSE_INCOMING_STREAMS: okhttp3.internal.http2.Http2Connection.Listener;
					public static Companion: okhttp3.internal.http2.Http2Connection.Listener.Companion;
					public onStream(param0: okhttp3.internal.http2.Http2Stream): void;
					public constructor();
					public onSettings(param0: okhttp3.internal.http2.Http2Connection, param1: okhttp3.internal.http2.Settings): void;
				}
				export module Listener {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Listener.Companion>;
					}
				}
				export class ReaderRunnable extends okhttp3.internal.http2.Http2Reader.Handler {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.ReaderRunnable>;
					public ackSettings(): void;
					public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
					public priority(param0: number, param1: number, param2: number, param3: boolean): void;
					public run(): void;
					public applyAndAckSettings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
					public constructor(param0: okhttp3.internal.http2.Http2Reader);
					public settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public getReaderDollarokhttp(): okhttp3.internal.http2.Http2Reader;
					public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
					public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
					public windowUpdate(param0: number, param1: number): void;
					public ping(param0: boolean, param1: number, param2: number): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2ExchangeCodec extends okhttp3.internal.http.ExchangeCodec {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2ExchangeCodec>;
				public static Companion: okhttp3.internal.http2.Http2ExchangeCodec.Companion;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public reportedContentLength(param0: okhttp3.Response): number;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.connection.RealConnection, param2: okhttp3.internal.http.RealInterceptorChain, param3: okhttp3.internal.http2.Http2Connection);
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public cancel(): void;
				public flushRequest(): void;
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module Http2ExchangeCodec {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2ExchangeCodec.Companion>;
					public http2HeadersList(param0: okhttp3.Request): java.util.List<okhttp3.internal.http2.Header>;
					public readHttp2HeadersList(param0: okhttp3.Headers, param1: okhttp3.Protocol): okhttp3.Response.Builder;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Reader {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader>;
				public static Companion: okhttp3.internal.http2.Http2Reader.Companion;
				public close(): void;
				public nextFrame(param0: boolean, param1: okhttp3.internal.http2.Http2Reader.Handler): boolean;
				public readConnectionPreface(param0: okhttp3.internal.http2.Http2Reader.Handler): void;
				public constructor(param0: okio.BufferedSource, param1: boolean);
			}
			export module Http2Reader {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.Companion>;
					public getLogger(): java.util.logging.Logger;
					public lengthWithoutPadding(param0: number, param1: number, param2: number): number;
				}
				export class ContinuationSource {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.ContinuationSource>;
					public getFlags(): number;
					public setStreamId(param0: number): void;
					public getLength(): number;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
					public setLength(param0: number): void;
					public constructor(param0: okio.BufferedSource);
					public getStreamId(): number;
					public getPadding(): number;
					public setPadding(param0: number): void;
					public setFlags(param0: number): void;
					public close(): void;
					public getLeft(): number;
					public setLeft(param0: number): void;
				}
				export class Handler {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.Handler>;
					/**
					 * Constructs a new instance of the okhttp3.internal.http2.Http2Reader$Handler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
						headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
						rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
						settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
						ackSettings(): void;
						ping(param0: boolean, param1: number, param2: number): void;
						goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
						windowUpdate(param0: number, param1: number): void;
						priority(param0: number, param1: number, param2: number, param3: boolean): void;
						pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
						alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					});
					public constructor();
					public settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					public ackSettings(): void;
					public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
					public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
					public priority(param0: number, param1: number, param2: number, param3: boolean): void;
					public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
					public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
					public windowUpdate(param0: number, param1: number): void;
					public ping(param0: boolean, param1: number, param2: number): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Stream {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream>;
				public static EMIT_BUFFER_SIZE: number;
				public static Companion: okhttp3.internal.http2.Http2Stream.Companion;
				public getSource(): okio.Source;
				public closeLater(param0: okhttp3.internal.http2.ErrorCode): void;
				public enqueueTrailers(param0: okhttp3.Headers): void;
				public setWriteBytesTotalDollarokhttp(param0: number): void;
				public trailers(): okhttp3.Headers;
				public writeHeaders(param0: java.util.List<okhttp3.internal.http2.Header>, param1: boolean, param2: boolean): void;
				public cancelStreamIfNecessaryDollarokhttp(): void;
				public getReadTimeoutDollarokhttp(): okhttp3.internal.http2.Http2Stream.StreamTimeout;
				public readTimeout(): okio.Timeout;
				public getErrorCodeDollarokhttp(): okhttp3.internal.http2.ErrorCode;
				public addBytesToWriteWindow(param0: number): void;
				public getSink(): okio.Sink;
				public checkOutNotClosedDollarokhttp(): void;
				public isLocallyInitiated(): boolean;
				public setErrorCodeDollarokhttp(param0: okhttp3.internal.http2.ErrorCode): void;
				public writeTimeout(): okio.Timeout;
				public getId(): number;
				public receiveRstStream(param0: okhttp3.internal.http2.ErrorCode): void;
				public setWriteBytesMaximumDollarokhttp(param0: number): void;
				public getSourceDollarokhttp(): okhttp3.internal.http2.Http2Stream.FramingSource;
				public getWriteTimeoutDollarokhttp(): okhttp3.internal.http2.Http2Stream.StreamTimeout;
				public receiveHeaders(param0: okhttp3.Headers, param1: boolean): void;
				public setReadBytesAcknowledgedDollarokhttp(param0: number): void;
				public getReadBytesAcknowledged(): number;
				public takeHeaders(): okhttp3.Headers;
				public setReadBytesTotalDollarokhttp(param0: number): void;
				public getWriteBytesTotal(): number;
				public close(param0: okhttp3.internal.http2.ErrorCode, param1: java.io.IOException): void;
				public getSinkDollarokhttp(): okhttp3.internal.http2.Http2Stream.FramingSink;
				public getErrorExceptionDollarokhttp(): java.io.IOException;
				public getConnection(): okhttp3.internal.http2.Http2Connection;
				public isOpen(): boolean;
				public receiveData(param0: okio.BufferedSource, param1: number): void;
				public waitForIoDollarokhttp(): void;
				public getWriteBytesMaximum(): number;
				public getReadBytesTotal(): number;
				public setErrorExceptionDollarokhttp(param0: java.io.IOException): void;
				public constructor(param0: number, param1: okhttp3.internal.http2.Http2Connection, param2: boolean, param3: boolean, param4: okhttp3.Headers);
			}
			export module Http2Stream {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.Companion>;
				}
				export class FramingSink {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.FramingSink>;
					public getTrailers(): okhttp3.Headers;
					public constructor(param0: boolean);
					public setTrailers(param0: okhttp3.Headers): void;
					public getFinished(): boolean;
					public getClosed(): boolean;
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
					public setClosed(param0: boolean): void;
					public setFinished(param0: boolean): void;
				}
				export class FramingSource {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.FramingSource>;
					public getTrailers(): okhttp3.Headers;
					public receiveDollarokhttp(param0: okio.BufferedSource, param1: number): void;
					public setTrailers(param0: okhttp3.Headers): void;
					public getFinishedDollarokhttp(): boolean;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
					public constructor(param0: number, param1: boolean);
					public getReadBuffer(): okio.Buffer;
					public getClosedDollarokhttp(): boolean;
					public setFinishedDollarokhttp(param0: boolean): void;
					public close(): void;
					public getReceiveBuffer(): okio.Buffer;
					public setClosedDollarokhttp(param0: boolean): void;
				}
				export class StreamTimeout {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.StreamTimeout>;
					public timedOut(): void;
					public newTimeoutException(param0: java.io.IOException): java.io.IOException;
					public exitAndThrowIfTimedOut(): void;
					public constructor(param0: okhttp3.internal.http2.Http2Stream);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Writer {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Writer>;
				public static Companion: okhttp3.internal.http2.Http2Writer.Companion;
				public close(): void;
				public getHpackWriter(): okhttp3.internal.http2.Hpack.Writer;
				public dataFrame(param0: number, param1: number, param2: okio.Buffer, param3: number): void;
				public settings(param0: okhttp3.internal.http2.Settings): void;
				public ping(param0: boolean, param1: number, param2: number): void;
				public constructor(param0: okio.BufferedSink, param1: boolean);
				public windowUpdate(param0: number, param1: number): void;
				public frameHeader(param0: number, param1: number, param2: number, param3: number): void;
				public maxDataLength(): number;
				public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: native.Array<number>): void;
				public flush(): void;
				public connectionPreface(): void;
				public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public data(param0: boolean, param1: number, param2: okio.Buffer, param3: number): void;
				public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public headers(param0: boolean, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public applyAndAckSettings(param0: okhttp3.internal.http2.Settings): void;
			}
			export module Http2Writer {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Writer.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Huffman {
				public static class: java.lang.Class<okhttp3.internal.http2.Huffman>;
				public static INSTANCE: okhttp3.internal.http2.Huffman;
				public encodedLength(param0: okio.ByteString): number;
				public encode(param0: okio.ByteString, param1: okio.BufferedSink): void;
				public decode(param0: okio.BufferedSource, param1: number, param2: okio.BufferedSink): void;
			}
			export module Huffman {
				export class Node {
					public static class: java.lang.Class<okhttp3.internal.http2.Huffman.Node>;
					public getSymbol(): number;
					public constructor();
					public getTerminalBitCount(): number;
					public getChildren(): native.Array<okhttp3.internal.http2.Huffman.Node>;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class PushObserver {
				public static class: java.lang.Class<okhttp3.internal.http2.PushObserver>;
				/**
				 * Constructs a new instance of the okhttp3.internal.http2.PushObserver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
					onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
					onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
					onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					<clinit>(): void;
				});
				public constructor();
				public static Companion: okhttp3.internal.http2.PushObserver.Companion;
				public static CANCEL: okhttp3.internal.http2.PushObserver;
				public onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
				public onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
				public onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
				public onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
			}
			export module PushObserver {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.PushObserver.Companion>;
				}
				export module Companion {
					export class PushObserverCancel extends okhttp3.internal.http2.PushObserver {
						public static class: java.lang.Class<okhttp3.internal.http2.PushObserver.Companion.PushObserverCancel>;
						public onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
						public onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
						public onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
						public constructor();
						public onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Settings {
				public static class: java.lang.Class<okhttp3.internal.http2.Settings>;
				public static DEFAULT_INITIAL_WINDOW_SIZE: number;
				public static HEADER_TABLE_SIZE: number;
				public static ENABLE_PUSH: number;
				public static MAX_CONCURRENT_STREAMS: number;
				public static MAX_FRAME_SIZE: number;
				public static MAX_HEADER_LIST_SIZE: number;
				public static INITIAL_WINDOW_SIZE: number;
				public static COUNT: number;
				public static Companion: okhttp3.internal.http2.Settings.Companion;
				public merge(param0: okhttp3.internal.http2.Settings): void;
				public getHeaderTableSize(): number;
				public getEnablePush(param0: boolean): boolean;
				public get(param0: number): number;
				public getInitialWindowSize(): number;
				public size(): number;
				public constructor();
				public getMaxConcurrentStreams(): number;
				public clear(): void;
				public isSet(param0: number): boolean;
				public getMaxFrameSize(param0: number): number;
				public set(param0: number, param1: number): okhttp3.internal.http2.Settings;
				public getMaxHeaderListSize(param0: number): number;
			}
			export module Settings {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.http2.Settings.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class StreamResetException {
				public static class: java.lang.Class<okhttp3.internal.http2.StreamResetException>;
				public errorCode: okhttp3.internal.http2.ErrorCode;
				public constructor(param0: okhttp3.internal.http2.ErrorCode);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module io {
			export class FileSystem {
				public static class: java.lang.Class<okhttp3.internal.io.FileSystem>;
				/**
				 * Constructs a new instance of the okhttp3.internal.io.FileSystem interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					source(param0: java.io.File): okio.Source;
					sink(param0: java.io.File): okio.Sink;
					appendingSink(param0: java.io.File): okio.Sink;
					delete(param0: java.io.File): void;
					exists(param0: java.io.File): boolean;
					size(param0: java.io.File): number;
					rename(param0: java.io.File, param1: java.io.File): void;
					deleteContents(param0: java.io.File): void;
					<clinit>(): void;
				});
				public constructor();
				public static Companion: okhttp3.internal.io.FileSystem.Companion;
				public static SYSTEM: okhttp3.internal.io.FileSystem;
				public source(param0: java.io.File): okio.Source;
				public size(param0: java.io.File): number;
				public deleteContents(param0: java.io.File): void;
				public appendingSink(param0: java.io.File): okio.Sink;
				public sink(param0: java.io.File): okio.Sink;
				public exists(param0: java.io.File): boolean;
				public rename(param0: java.io.File, param1: java.io.File): void;
				public delete(param0: java.io.File): void;
			}
			export module FileSystem {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.io.FileSystem.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Android10Platform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Android10Platform>;
				public static Companion: okhttp3.internal.platform.Android10Platform.Companion;
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public buildCertificateChainCleaner(param0: javax.net.ssl.SSLSocketFactory): okhttp3.internal.tls.CertificateChainCleaner;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public log(param0: string, param1: number, param2: java.lang.Throwable): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
			}
			export module Android10Platform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.Android10Platform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class AndroidPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform>;
				public static Companion: okhttp3.internal.platform.AndroidPlatform.Companion;
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public buildCertificateChainCleaner(param0: javax.net.ssl.SSLSocketFactory): okhttp3.internal.tls.CertificateChainCleaner;
				public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public log(param0: string, param1: number, param2: java.lang.Throwable): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public logCloseableLeak(param0: string, param1: any): void;
				public getStackTraceForCloseable(param0: string): any;
				public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.TrustRootIndex;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
			}
			export module AndroidPlatform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
					public isAndroid(): boolean;
				}
				export class CustomTrustRootIndex extends okhttp3.internal.tls.TrustRootIndex {
					public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform.CustomTrustRootIndex>;
					public constructor(param0: javax.net.ssl.X509TrustManager, param1: java.lang.reflect.Method);
					public equals(param0: any): boolean;
					public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
					public toString(): string;
					public copy(param0: javax.net.ssl.X509TrustManager, param1: java.lang.reflect.Method): okhttp3.internal.platform.AndroidPlatform.CustomTrustRootIndex;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class BouncyCastlePlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.BouncyCastlePlatform>;
				public static Companion: okhttp3.internal.platform.BouncyCastlePlatform.Companion;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module BouncyCastlePlatform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.BouncyCastlePlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.BouncyCastlePlatform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class ConscryptPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.ConscryptPlatform>;
				public static Companion: okhttp3.internal.platform.ConscryptPlatform.Companion;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureSslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): void;
				public configureTrustManager(param0: javax.net.ssl.X509TrustManager): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module ConscryptPlatform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.ConscryptPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.ConscryptPlatform;
					public atLeastVersion(param0: number, param1: number, param2: number): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Jdk8WithJettyBootPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform>;
				public static Companion: okhttp3.internal.platform.Jdk8WithJettyBootPlatform.Companion;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
				public constructor(param0: java.lang.reflect.Method, param1: java.lang.reflect.Method, param2: java.lang.reflect.Method, param3: java.lang.Class<any>, param4: java.lang.Class<any>);
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
				public constructor();
			}
			export module Jdk8WithJettyBootPlatform {
				export class AlpnProvider {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform.AlpnProvider>;
					public getSelectedDollarokhttp(): string;
					public setSelectedDollarokhttp(param0: string): void;
					public getUnsupportedDollarokhttp(): boolean;
					public setUnsupportedDollarokhttp(param0: boolean): void;
					public constructor(param0: java.util.List<string>);
					public invoke(param0: any, param1: java.lang.reflect.Method, param2: native.Array<any>): any;
				}
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform.Companion>;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Jdk9Platform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Jdk9Platform>;
				public static Companion: okhttp3.internal.platform.Jdk9Platform.Companion;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public constructor();
			}
			export module Jdk9Platform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk9Platform.Companion>;
					public buildIfSupported(): okhttp3.internal.platform.Jdk9Platform;
					public isAvailable(): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class OpenJSSEPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.OpenJSSEPlatform>;
				public static Companion: okhttp3.internal.platform.OpenJSSEPlatform.Companion;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module OpenJSSEPlatform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.OpenJSSEPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.OpenJSSEPlatform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Platform>;
				public static INFO: number;
				public static WARN: number;
				public static Companion: okhttp3.internal.platform.Platform.Companion;
				public getPrefix(): string;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
				public configureSslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public logCloseableLeak(param0: string, param1: any): void;
				public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.TrustRootIndex;
				public toString(): string;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public buildCertificateChainCleaner(param0: javax.net.ssl.SSLSocketFactory): okhttp3.internal.tls.CertificateChainCleaner;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
				public log(param0: string, param1: number, param2: java.lang.Throwable): void;
				public configureTrustManager(param0: javax.net.ssl.X509TrustManager): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
				public getStackTraceForCloseable(param0: string): any;
				public static get(): okhttp3.internal.platform.Platform;
			}
			export module Platform {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.platform.Platform.Companion>;
					public concatLengthPrefixed(param0: java.util.List<any>): native.Array<number>;
					public alpnProtocolNames(param0: java.util.List<any>): java.util.List<string>;
					public resetForTests(param0: okhttp3.internal.platform.Platform): void;
					public get(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class Android10CertificateChainCleaner extends okhttp3.internal.tls.CertificateChainCleaner {
					public static class: java.lang.Class<okhttp3.internal.platform.android.Android10CertificateChainCleaner>;
					public static Companion: okhttp3.internal.platform.android.Android10CertificateChainCleaner.Companion;
					public equals(param0: any): boolean;
					public constructor(param0: javax.net.ssl.X509TrustManager, param1: globalAndroid.net.http.X509TrustManagerExtensions);
					public constructor();
					public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
					public hashCode(): number;
				}
				export module Android10CertificateChainCleaner {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.Android10CertificateChainCleaner.Companion>;
						public buildIfSupported(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.platform.android.Android10CertificateChainCleaner;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class Android10SocketAdapter extends okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.Android10SocketAdapter>;
					public static Companion: okhttp3.internal.platform.android.Android10SocketAdapter.Companion;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor();
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module Android10SocketAdapter {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.Android10SocketAdapter.Companion>;
						public buildIfSupported(): okhttp3.internal.platform.android.SocketAdapter;
						public isSupported(): boolean;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidCertificateChainCleaner extends okhttp3.internal.tls.CertificateChainCleaner {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidCertificateChainCleaner>;
					public static Companion: okhttp3.internal.platform.android.AndroidCertificateChainCleaner.Companion;
					public equals(param0: any): boolean;
					public constructor();
					public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
					public hashCode(): number;
					public constructor(param0: javax.net.ssl.X509TrustManager, param1: any, param2: java.lang.reflect.Method);
				}
				export module AndroidCertificateChainCleaner {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidCertificateChainCleaner.Companion>;
						public build(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.platform.android.AndroidCertificateChainCleaner;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidSocketAdapter extends okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidSocketAdapter>;
					public static Companion: okhttp3.internal.platform.android.AndroidSocketAdapter.Companion;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor(param0: java.lang.Class<any>);
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module AndroidSocketAdapter {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidSocketAdapter.Companion>;
						public buildIfSupported(param0: string): okhttp3.internal.platform.android.SocketAdapter;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class CloseGuard {
					public static class: java.lang.Class<okhttp3.internal.platform.android.CloseGuard>;
					public static Companion: okhttp3.internal.platform.android.CloseGuard.Companion;
					public warnIfOpen(param0: any): boolean;
					public createAndOpen(param0: string): any;
					public constructor(param0: java.lang.reflect.Method, param1: java.lang.reflect.Method, param2: java.lang.reflect.Method);
				}
				export module CloseGuard {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.CloseGuard.Companion>;
						public get(): okhttp3.internal.platform.android.CloseGuard;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class ConscryptSocketAdapter extends okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.ConscryptSocketAdapter>;
					public static Companion: okhttp3.internal.platform.android.ConscryptSocketAdapter.Companion;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor();
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module ConscryptSocketAdapter {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.ConscryptSocketAdapter.Companion>;
						public buildIfSupported(): okhttp3.internal.platform.android.SocketAdapter;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class DeferredSocketAdapter extends okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.DeferredSocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor(param0: string);
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.SocketAdapter>;
					/**
					 * Constructs a new instance of the okhttp3.internal.platform.android.SocketAdapter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						isSupported(): boolean;
						trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
						matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
						matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
						configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
						getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					});
					public constructor();
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class StandardAndroidSocketAdapter extends okhttp3.internal.platform.android.AndroidSocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.StandardAndroidSocketAdapter>;
					public static Companion: okhttp3.internal.platform.android.StandardAndroidSocketAdapter.Companion;
					public isSupported(): boolean;
					public constructor(param0: java.lang.Class<any>, param1: java.lang.Class<any>, param2: java.lang.Class<any>);
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public constructor(param0: java.lang.Class<any>);
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				}
				export module StandardAndroidSocketAdapter {
					export class Companion {
						public static class: java.lang.Class<okhttp3.internal.platform.android.StandardAndroidSocketAdapter.Companion>;
						public buildIfSupported(param0: string): okhttp3.internal.platform.android.SocketAdapter;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class UtilKt {
					public static class: java.lang.Class<okhttp3.internal.platform.android.UtilKt>;
					public static androidLog(param0: number, param1: string, param2: java.lang.Throwable): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module proxy {
			export class NullProxySelector {
				public static class: java.lang.Class<okhttp3.internal.proxy.NullProxySelector>;
				public static INSTANCE: okhttp3.internal.proxy.NullProxySelector;
				public select(param0: java.net.URI): java.util.List<java.net.Proxy>;
				public connectFailed(param0: java.net.URI, param1: java.net.SocketAddress, param2: java.io.IOException): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module publicsuffix {
			export class PublicSuffixDatabase {
				public static class: java.lang.Class<okhttp3.internal.publicsuffix.PublicSuffixDatabase>;
				public static PUBLIC_SUFFIX_RESOURCE: string;
				public static Companion: okhttp3.internal.publicsuffix.PublicSuffixDatabase.Companion;
				public setListBytes(param0: native.Array<number>, param1: native.Array<number>): void;
				public getEffectiveTldPlusOne(param0: string): string;
				public constructor();
			}
			export module PublicSuffixDatabase {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.publicsuffix.PublicSuffixDatabase.Companion>;
					public get(): okhttp3.internal.publicsuffix.PublicSuffixDatabase;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class BasicCertificateChainCleaner extends okhttp3.internal.tls.CertificateChainCleaner {
				public static class: java.lang.Class<okhttp3.internal.tls.BasicCertificateChainCleaner>;
				public static Companion: okhttp3.internal.tls.BasicCertificateChainCleaner.Companion;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public constructor(param0: okhttp3.internal.tls.TrustRootIndex);
				public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
				public constructor();
			}
			export module BasicCertificateChainCleaner {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.tls.BasicCertificateChainCleaner.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class BasicTrustRootIndex extends okhttp3.internal.tls.TrustRootIndex {
				public static class: java.lang.Class<okhttp3.internal.tls.BasicTrustRootIndex>;
				public constructor(param0: native.Array<java.security.cert.X509Certificate>);
				public hashCode(): number;
				public equals(param0: any): boolean;
				public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export abstract class CertificateChainCleaner {
				public static class: java.lang.Class<okhttp3.internal.tls.CertificateChainCleaner>;
				public static Companion: okhttp3.internal.tls.CertificateChainCleaner.Companion;
				public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
				public constructor();
			}
			export module CertificateChainCleaner {
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.tls.CertificateChainCleaner.Companion>;
					public get(param0: native.Array<java.security.cert.X509Certificate>): okhttp3.internal.tls.CertificateChainCleaner;
					public get(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class OkHostnameVerifier {
				public static class: java.lang.Class<okhttp3.internal.tls.OkHostnameVerifier>;
				public static INSTANCE: okhttp3.internal.tls.OkHostnameVerifier;
				public verify(param0: string, param1: javax.net.ssl.SSLSession): boolean;
				public allSubjectAltNames(param0: java.security.cert.X509Certificate): java.util.List<string>;
				public verify(param0: string, param1: java.security.cert.X509Certificate): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class TrustRootIndex {
				public static class: java.lang.Class<okhttp3.internal.tls.TrustRootIndex>;
				/**
				 * Constructs a new instance of the okhttp3.internal.tls.TrustRootIndex interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
				});
				public constructor();
				public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class RealWebSocket implements okhttp3.WebSocket, okhttp3.internal.ws.WebSocketReader.FrameCallback {
				public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket>;
				public static Companion: okhttp3.internal.ws.RealWebSocket.Companion;
				public request(): okhttp3.Request;
				public send(param0: string): boolean;
				public onReadPong(param0: okio.ByteString): void;
				public onReadPing(param0: okio.ByteString): void;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: okhttp3.Request, param2: okhttp3.WebSocketListener, param3: java.util.Random, param4: number);
				public pong(param0: okio.ByteString): boolean;
				public loopReader(): void;
				public receivedPongCount(): number;
				public send(param0: okio.ByteString): boolean;
				public onReadMessage(param0: okio.ByteString): void;
				public failWebSocket(param0: java.lang.Exception, param1: okhttp3.Response): void;
				public checkUpgradeSuccessDollarokhttp(param0: okhttp3.Response, param1: okhttp3.internal.connection.Exchange): void;
				public close(param0: number, param1: string, param2: number): boolean;
				public awaitTermination(param0: number, param1: java.util.concurrent.TimeUnit): void;
				public cancel(): void;
				public onReadClose(param0: number, param1: string): void;
				public processNextFrame(): boolean;
				public onReadMessage(param0: string): void;
				public receivedPingCount(): number;
				public writeOneFrameDollarokhttp(): boolean;
				public initReaderAndWriter(param0: string, param1: okhttp3.internal.ws.RealWebSocket.Streams): void;
				public queueSize(): number;
				public close(param0: number, param1: string): boolean;
				public tearDown(): void;
				public writePingFrameDollarokhttp(): void;
				public getListenerDollarokhttp(): okhttp3.WebSocketListener;
				public sentPingCount(): number;
				public connect(param0: okhttp3.OkHttpClient): void;
			}
			export module RealWebSocket {
				export class Close {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Close>;
					public getCancelAfterCloseMillis(): number;
					public getReason(): okio.ByteString;
					public constructor(param0: number, param1: okio.ByteString, param2: number);
					public getCode(): number;
				}
				export class Companion {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Companion>;
				}
				export class Message {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Message>;
					public getData(): okio.ByteString;
					public getFormatOpcode(): number;
					public constructor(param0: number, param1: okio.ByteString);
				}
				export abstract class Streams {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Streams>;
					public getSink(): okio.BufferedSink;
					public constructor(param0: boolean, param1: okio.BufferedSource, param2: okio.BufferedSink);
					public getClient(): boolean;
					public getSource(): okio.BufferedSource;
				}
				export class WriterTask extends okhttp3.internal.concurrent.Task {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.WriterTask>;
					public runOnce(): number;
					public constructor(param0: string, param1: boolean);
					public constructor(param0: okhttp3.internal.ws.RealWebSocket);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketProtocol {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketProtocol>;
				public static ACCEPT_MAGIC: string;
				public static B0_FLAG_FIN: number;
				public static B0_FLAG_RSV1: number;
				public static B0_FLAG_RSV2: number;
				public static B0_FLAG_RSV3: number;
				public static B0_MASK_OPCODE: number;
				public static OPCODE_FLAG_CONTROL: number;
				public static B1_FLAG_MASK: number;
				public static B1_MASK_LENGTH: number;
				public static OPCODE_CONTINUATION: number;
				public static OPCODE_TEXT: number;
				public static OPCODE_BINARY: number;
				public static OPCODE_CONTROL_CLOSE: number;
				public static OPCODE_CONTROL_PING: number;
				public static OPCODE_CONTROL_PONG: number;
				public static PAYLOAD_BYTE_MAX: number;
				public static CLOSE_MESSAGE_MAX: number;
				public static PAYLOAD_SHORT: number;
				public static PAYLOAD_SHORT_MAX: number;
				public static PAYLOAD_LONG: number;
				public static CLOSE_CLIENT_GOING_AWAY: number;
				public static CLOSE_NO_STATUS_CODE: number;
				public static INSTANCE: okhttp3.internal.ws.WebSocketProtocol;
				public validateCloseCode(param0: number): void;
				public closeCodeExceptionMessage(param0: number): string;
				public acceptHeader(param0: string): string;
				public toggleMask(param0: okio.Buffer.UnsafeCursor, param1: native.Array<number>): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketReader {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketReader>;
				public processNextFrame(): void;
				public getClosed(): boolean;
				public getSource(): okio.BufferedSource;
				public setClosed(param0: boolean): void;
				public constructor(param0: boolean, param1: okio.BufferedSource, param2: okhttp3.internal.ws.WebSocketReader.FrameCallback);
			}
			export module WebSocketReader {
				export class FrameCallback {
					public static class: java.lang.Class<okhttp3.internal.ws.WebSocketReader.FrameCallback>;
					/**
					 * Constructs a new instance of the okhttp3.internal.ws.WebSocketReader$FrameCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onReadMessage(param0: string): void;
						onReadMessage(param0: okio.ByteString): void;
						onReadPing(param0: okio.ByteString): void;
						onReadPong(param0: okio.ByteString): void;
						onReadClose(param0: number, param1: string): void;
					});
					public constructor();
					public onReadClose(param0: number, param1: string): void;
					public onReadMessage(param0: string): void;
					public onReadMessage(param0: okio.ByteString): void;
					public onReadPing(param0: okio.ByteString): void;
					public onReadPong(param0: okio.ByteString): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketWriter {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketWriter>;
				public constructor(param0: boolean, param1: okio.BufferedSink, param2: java.util.Random);
				public setActiveWriter(param0: boolean): void;
				public writePing(param0: okio.ByteString): void;
				public writeClose(param0: number, param1: okio.ByteString): void;
				public getActiveWriter(): boolean;
				public getBuffer(): okio.Buffer;
				public getRandom(): java.util.Random;
				public writePong(param0: okio.ByteString): void;
				public getSink(): okio.BufferedSink;
				public newMessageSink(param0: number, param1: number): okio.Sink;
				public writeMessageFrame(param0: number, param1: number, param2: boolean, param3: boolean): void;
			}
			export module WebSocketWriter {
				export class FrameSink {
					public static class: java.lang.Class<okhttp3.internal.ws.WebSocketWriter.FrameSink>;
					public getClosed(): boolean;
					public flush(): void;
					public timeout(): okio.Timeout;
					public constructor(param0: okhttp3.internal.ws.WebSocketWriter);
					public getContentLength(): number;
					public setFirstFrame(param0: boolean): void;
					public setFormatOpcode(param0: number): void;
					public isFirstFrame(): boolean;
					public close(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public setClosed(param0: boolean): void;
					public getFormatOpcode(): number;
					public setContentLength(param0: number): void;
				}
			}
		}
	}
}

declare module org {
	export module nativescript {
		export module nativescript_okhttp_threaded {
			export class BuildConfig {
				public static class: java.lang.Class<org.nativescript.nativescript_okhttp_threaded.BuildConfig>;
				public static DEBUG: boolean;
				public static LIBRARY_PACKAGE_NAME: string;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module okio {
	export class ByteString extends java.lang.Object {
		public static class: java.lang.Class<okio.ByteString>;
		public static EMPTY: okio.ByteString;
		public static Companion: okio.ByteString.Companion;
		public static of(param0: native.Array<number>): okio.ByteString;
		public base64(): string;
		public equals(param0: any): boolean;
		public static encodeString(param0: string, param1: java.nio.charset.Charset): okio.ByteString;
		public base64Url(): string;
		public getHashCode$okio(): number;
		public asByteBuffer(): java.nio.ByteBuffer;
		public setHashCode$okio(param0: number): void;
		public lastIndexOf(param0: okio.ByteString, param1: number): number;
		/** @deprecated */
		public deprecated_getByte(param0: number): number;
		public compareTo(param0: okio.ByteString): number;
		public constructor(param0: native.Array<number>);
		public indexOf(param0: native.Array<number>): number;
		public startsWith(param0: native.Array<number>): boolean;
		public toString(): string;
		public string(param0: java.nio.charset.Charset): string;
		public md5(): okio.ByteString;
		public static encodeUtf8(param0: string): okio.ByteString;
		public startsWith(param0: okio.ByteString): boolean;
		public endsWith(param0: okio.ByteString): boolean;
		public endsWith(param0: native.Array<number>): boolean;
		public toAsciiLowercase(): okio.ByteString;
		public sha1(): okio.ByteString;
		public internalArray$okio(): native.Array<number>;
		public write(param0: java.io.OutputStream): void;
		public lastIndexOf(param0: native.Array<number>, param1: number): number;
		public substring(param0: number, param1: number): okio.ByteString;
		public indexOf(param0: okio.ByteString, param1: number): number;
		/** @deprecated */
		public deprecated_size(): number;
		public substring(param0: number): okio.ByteString;
		public substring(): okio.ByteString;
		public hmacSha512(param0: okio.ByteString): okio.ByteString;
		public hmacSha1(param0: okio.ByteString): okio.ByteString;
		public setUtf8$okio(param0: string): void;
		public static read(param0: java.io.InputStream, param1: number): okio.ByteString;
		public sha512(): okio.ByteString;
		public size(): number;
		public lastIndexOf(param0: native.Array<number>): number;
		public hex(): string;
		public hashCode(): number;
		public toAsciiUppercase(): okio.ByteString;
		public getSize$okio(): number;
		public indexOf(param0: native.Array<number>, param1: number): number;
		public static decodeBase64(param0: string): okio.ByteString;
		public rangeEquals(param0: number, param1: okio.ByteString, param2: number, param3: number): boolean;
		public lastIndexOf(param0: okio.ByteString): number;
		public digest$okio(param0: string): okio.ByteString;
		public internalGet$okio(param0: number): number;
		public static decodeHex(param0: string): okio.ByteString;
		public getUtf8$okio(): string;
		public sha256(): okio.ByteString;
		public getByte(param0: number): number;
		public static of(param0: java.nio.ByteBuffer): okio.ByteString;
		public hmac$okio(param0: string, param1: okio.ByteString): okio.ByteString;
		public write$okio(param0: okio.Buffer, param1: number, param2: number): void;
		public rangeEquals(param0: number, param1: native.Array<number>, param2: number, param3: number): boolean;
		public static of(param0: native.Array<number>, param1: number, param2: number): okio.ByteString;
		public utf8(): string;
		public getData$okio(): native.Array<number>;
		public toByteArray(): native.Array<number>;
		public hmacSha256(param0: okio.ByteString): okio.ByteString;
		public indexOf(param0: okio.ByteString): number;
	}
	export module ByteString {
		export class Companion {
			public static class: java.lang.Class<okio.ByteString.Companion>;
			/** @deprecated */
			public deprecated_of(param0: java.nio.ByteBuffer): okio.ByteString;
			/** @deprecated */
			public deprecated_decodeHex(param0: string): okio.ByteString;
			/** @deprecated */
			public deprecated_encodeString(param0: string, param1: java.nio.charset.Charset): okio.ByteString;
			/** @deprecated */
			public deprecated_decodeBase64(param0: string): okio.ByteString;
			public encodeString(param0: string, param1: java.nio.charset.Charset): okio.ByteString;
			public decodeBase64(param0: string): okio.ByteString;
			public encodeUtf8(param0: string): okio.ByteString;
			/** @deprecated */
			public deprecated_encodeUtf8(param0: string): okio.ByteString;
			public of(param0: java.nio.ByteBuffer): okio.ByteString;
			public read(param0: java.io.InputStream, param1: number): okio.ByteString;
			public of(param0: native.Array<number>, param1: number, param2: number): okio.ByteString;
			public decodeHex(param0: string): okio.ByteString;
			/** @deprecated */
			public deprecated_read(param0: java.io.InputStream, param1: number): okio.ByteString;
			public of(param0: native.Array<number>): okio.ByteString;
			/** @deprecated */
			public deprecated_of(param0: native.Array<number>, param1: number, param2: number): okio.ByteString;
		}
	}
}

//Generics information:

