import { ImageSource, HttpRequestOptions, HttpResponse, Headers, File as nsFile, Utils } from "@nativescript/core";
import {
    HTTPFormData,
    HTTPFormDataEntry,
    getFilenameFromUrl,
    ImageParseMethod,
    completeSelfCheck,
    HttpsRequestOptions,
    CachePolicy
} from "./http.common";
import * as domainDebugger from "@nativescript/core/debugger";
export { HTTPFormData, HTTPFormDataEntry, ImageParseMethod } from "./http.common";

export enum HttpResponseEncoding {
    UTF8,
    GBK
}

const currentDevice = UIDevice.currentDevice;
const device = currentDevice.userInterfaceIdiom === UIUserInterfaceIdiom.Phone ? "Phone" : "Pad";
const osVersion = currentDevice.systemVersion;

let customUserAgent: string;
const GET = "GET";
export const USER_AGENT_HEADER = "User-Agent";
export const USER_AGENT = `Mozilla/5.0 (i${device}; CPU OS ${osVersion.replace(".", "_")} like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/${osVersion} Mobile/10A5355d Safari/8536.25`;
const sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration;
const queue = NSOperationQueue.mainQueue;
let certificatePinningInstance: TrustKit = null;
let certificatePinningConfig: NSDictionary<string, any> = null;
let certificatePinningDomainList: NSDictionary<string, any> = null;

function parseJSON(source: string): any {
    const src = source.trim();
    if (src.lastIndexOf(")") === src.length - 1) {
        return JSON.parse(src.substring(src.indexOf("(") + 1, src.lastIndexOf(")")));
    }

    return JSON.parse(src);
}

@NativeClass()
class NSURLSessionTaskDelegateImpl extends NSObject implements NSURLSessionTaskDelegate {
    public static ObjCProtocols = [NSURLSessionTaskDelegate];

    public URLSessionTaskDidReceiveChallengeCompletionHandler(session: NSURLSession, task: NSURLSessionTask, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void) {
        // Default behaviour when we don't want certificate pinning.
        if (certificatePinningInstance == null) {
            completionHandler(NSURLSessionAuthChallengeDisposition.PerformDefaultHandling, null);
            return;
        }

        const pinningValidator = certificatePinningInstance.pinningValidator;

        // Pass the authentication challenge to the validator; if the validation fails, the connection will be blocked
        if (!pinningValidator.handleChallengeCompletionHandler(challenge, completionHandler)) {
            // TrustKit did not handle this challenge: perhaps it was not for server trust
            // or the domain was not pinned. Fall back to the default behavior
            completionHandler(NSURLSessionAuthChallengeDisposition.PerformDefaultHandling, null);
        }
    }
}

const sessionTaskDelegateInstance: NSURLSessionTaskDelegateImpl = <NSURLSessionTaskDelegateImpl>NSURLSessionTaskDelegateImpl.new();

// Sadly we can't extend our own native class.
@NativeClass()
class NoRedirectNSURLSessionTaskDelegateImpl extends NSObject implements NSURLSessionTaskDelegate {
    public static ObjCProtocols = [NSURLSessionTaskDelegate];

    public URLSessionTaskDidReceiveChallengeCompletionHandler(session: NSURLSession, task: NSURLSessionTask, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void) {
        // Default behaviour when we don't want certificate pinning.
        if (certificatePinningInstance == null) {
            completionHandler(NSURLSessionAuthChallengeDisposition.PerformDefaultHandling, null);
            return;
        }

        const pinningValidator = certificatePinningInstance.pinningValidator;

        // Pass the authentication challenge to the validator; if the validation fails, the connection will be blocked
        if (!pinningValidator.handleChallengeCompletionHandler(challenge, completionHandler)) {
            // TrustKit did not handle this challenge: perhaps it was not for server trust
            // or the domain was not pinned. Fall back to the default behavior
            completionHandler(NSURLSessionAuthChallengeDisposition.PerformDefaultHandling, null);
        }
    }

    public URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler(session: NSURLSession, task: NSURLSessionTask, response: NSHTTPURLResponse, request: NSURLRequest, completionHandler: (p1: NSURLRequest) => void): void {
        completionHandler(null);
    }
}
const noRedirectSessionTaskDelegateInstance: NoRedirectNSURLSessionTaskDelegateImpl = <NoRedirectNSURLSessionTaskDelegateImpl>NoRedirectNSURLSessionTaskDelegateImpl.new();

let defaultSession;
function ensureDefaultSession() {
    if (!defaultSession) {
        defaultSession = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, sessionTaskDelegateInstance, queue);
    }
}

let sessionNotFollowingRedirects;
function ensureSessionNotFollowingRedirects() {
    if (!sessionNotFollowingRedirects) {
        sessionNotFollowingRedirects = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, noRedirectSessionTaskDelegateInstance, queue);
    }
}

export function request(options: HttpsRequestOptions): Promise<HttpResponse> {
    if (options === undefined || options === null) {
        // TODO: Shouldn't we throw an error here - defensive programming
        return Promise.reject("No options given");
    }

    if (options.url === "https://nativescript-http-integration-check.local") {
        return completeSelfCheck(options);
    }

    return new Promise<HttpResponse>((resolve, reject) => {

        if (!options.url) {
            reject(new Error("Request url was empty."));

            return;
        }

        try {
            const network = domainDebugger.getNetwork();
            const debugRequest = network && network.create();

            const urlRequest = NSMutableURLRequest.requestWithURL(
                NSURL.URLWithString(options.url));

            urlRequest.HTTPMethod = Utils.isDefined(options.method) ? options.method : GET;

            if (options.cachePolicy) {
                switch (options.cachePolicy) {
                    case CachePolicy.ONLYCACHE:
                        console.log(options.cachePolicy);
                        urlRequest.cachePolicy = NSURLRequestCachePolicy.ReturnCacheDataDontLoad;
                        break;
                    case CachePolicy.IGNORECACHE:
                        console.log(options.cachePolicy);
                        urlRequest.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData;
                        break;
                    case CachePolicy.NOCACHE:
                        console.log(options.cachePolicy);
                        urlRequest.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringCacheData;
                        break;
                    default:
                        console.log(options.cachePolicy);
                        urlRequest.cachePolicy = NSURLRequestCachePolicy.UseProtocolCachePolicy;
                        break;
                }
            } else {
                urlRequest.cachePolicy = NSURLRequestCachePolicy.UseProtocolCachePolicy;
            }

            let contentType: string;
            let userAgent: string;
            if (options.headers) {
                for (let key in options.headers) {
                    if (key.toLowerCase() === "content-type") {
                        contentType = options.headers[key];
                    }
                    if (key.toLowerCase() === "user-agent") {
                        userAgent = options.headers[key];
                    }
                }
            }

            if (!userAgent) {
                if (!options.headers) {
                    options.headers = {};
                }

                options.headers[USER_AGENT_HEADER] = customUserAgent ? customUserAgent : USER_AGENT;
            }

            if (options.headers) {
                for (let header in options.headers) {
                    urlRequest.setValueForHTTPHeaderField(options.headers[header] + "", header);
                }
            }

            if (Utils.isString(options.content) || options.content instanceof FormData) {
                urlRequest.HTTPBody = NSString.stringWithString(options.content.toString()).dataUsingEncoding(4);
            } else if (options.content instanceof ArrayBuffer) {
                const buffer = options.content as ArrayBuffer;
                urlRequest.HTTPBody = NSData.dataWithData(buffer as any);
            } else {
                let matched = false;

                // We have to do it in this structure to make the ts-ignore work.
                // Normal HTTP Request structure does not allow these types.

                // This matches both Blob and File.
                // We ignore the name in the File object so we can ignore that type.
                // @ts-ignore
                if (!matched && options.content instanceof Blob) {
                    if (!contentType && options.content.type) {
                        urlRequest.setValueForHTTPHeaderField(options.content.type, "Content-Type");
                    }

                    // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                    // @ts-ignore
                    const buffer = new Uint8Array(Blob.InternalAccessor.getBuffer(options.content).buffer.slice(0) as ArrayBuffer);
                    urlRequest.HTTPBody = NSData.dataWithData(buffer as any);
                    matched = true;
                }

                // @ts-ignore
                if (!matched && options.content instanceof HTTPFormData) {
                    matched = true;
                    const multipartFormData = OMGMultipartFormData.new();
                    const contentValues = options.content as HTTPFormData;
                    contentValues.forEach(((value, key) => {
                        if (typeof value === "string") {
                            multipartFormData.addTextParameterName(value, key);
                        } else if (value instanceof ArrayBuffer) {
                            const buffer = new Uint8Array(value as ArrayBuffer);
                            multipartFormData.addFileParameterNameFilenameContentType(NSData.dataWithData(buffer as any), key, "", "application/octet-stream");
                        } else if (value instanceof Blob) {
                            let formDataPartMediaType = "application/octet-stream";
                            if (value.type) {
                                formDataPartMediaType = value.type;
                            }

                            let filename = "";
                            if (value instanceof File) {
                                filename = value.name;
                            }

                            // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                            // @ts-ignore
                            const buffer = new Uint8Array(Blob.InternalAccessor.getBuffer(value).buffer.slice(0) as ArrayBuffer);
                            multipartFormData.addFileParameterNameFilenameContentType(NSData.dataWithData(buffer as any), key, filename, formDataPartMediaType);
                        } else if (value instanceof HTTPFormDataEntry) {
                            let formDataPartMediaType = "application/octet-stream";
                            if (value.type) {
                                formDataPartMediaType = value.type;
                            }

                            if (value.data instanceof ArrayBuffer) {
                                const buffer = new Uint8Array(value.data as ArrayBuffer);
                                multipartFormData.addFileParameterNameFilenameContentType(NSData.dataWithData(buffer as any), key, "", formDataPartMediaType);
                            } else if (value.data instanceof Blob) {
                                // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                                // @ts-ignore
                                const buffer = new Uint8Array(Blob.InternalAccessor.getBuffer(value.data).buffer.slice(0) as ArrayBuffer);
                                multipartFormData.addFileParameterNameFilenameContentType(NSData.dataWithData(buffer as any), key, value.name || "", formDataPartMediaType);
                            } else {
                                // Support for native file objects.
                                multipartFormData.addFileParameterNameFilenameContentType(value.data, key, value.name, formDataPartMediaType);
                            }
                        } else {
                            // Support for native file objects.
                            multipartFormData.addFileParameterNameFilenameContentType(value, key, "", "application/octet-stream");
                        }
                    }));

                    // Abuse OMGHTTPURLRQ to make our HTTPBody, but don't let it make our request.
                    let multipartRequest: NSMutableURLRequest = OMGHTTPURLRQ.POSTError(options.url, multipartFormData);
                    const multiPartContentType = multipartRequest.allHTTPHeaderFields.objectForKey("Content-Type");
                    urlRequest.setValueForHTTPHeaderField(multiPartContentType, "Content-Type");
                    urlRequest.HTTPBody = NSData.dataWithData(multipartRequest.HTTPBody);
                }

                if (!matched && options.content) {
                    // Assume options.content is a native object.
                    urlRequest.HTTPBody = NSData.dataWithData(options.content as any);
                }
            }

            if (Utils.isNumber(options.timeout)) {
                urlRequest.timeoutInterval = options.timeout / 1000;
            }

            let session;
            if (Utils.isBoolean(options.dontFollowRedirects) && options.dontFollowRedirects) {
                ensureSessionNotFollowingRedirects();
                session = sessionNotFollowingRedirects;
            } else {
                ensureDefaultSession();
                session = defaultSession;
            }

            const dataTask = session.dataTaskWithRequestCompletionHandler(urlRequest,
                function (data: NSData, response: NSHTTPURLResponse, error: NSError) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                    } else {
                        const headers: Headers = {};
                        if (response && response.allHeaderFields) {
                            const headerFields = response.allHeaderFields;

                            headerFields.enumerateKeysAndObjectsUsingBlock((key, value, stop) => {
                                addHeader(headers, key, value);
                            });
                        }

                        if (debugRequest) {
                            debugRequest.mimeType = response.MIMEType;
                            debugRequest.data = data;
                            const debugResponse = {
                                url: options.url,
                                status: response.statusCode,
                                statusText: NSHTTPURLResponse.localizedStringForStatusCode(response.statusCode),
                                headers: headers,
                                mimeType: response.MIMEType,
                                fromDiskCache: false
                            };
                            debugRequest.responseReceived(debugResponse);
                            debugRequest.loadingFinished();
                        }

                        resolve({
                            content: {
                                raw: data,
                                toArrayBuffer: () => interop.bufferFromData(data),
                                toString: (encoding?: any) => {
                                    const str = NSDataToString(data, encoding);
                                    if (typeof str === "string") {
                                        return str;
                                    } else {
                                        throw new Error("Response content may not be converted to string");
                                    }
                                },
                                toJSON: (encoding?: any) => parseJSON(NSDataToString(data, encoding)),
                                toImage: () => {
                                    return new Promise((resolve, reject) => {
                                        (<any>UIImage).tns_decodeImageWithDataCompletion(data, image => {
                                            if (image) {
                                                resolve(new ImageSource(image));
                                            } else {
                                                reject(new Error("Response content may not be converted to an Image"));
                                            }
                                        });
                                    });
                                },
                                toFile: (destinationFilePath?: string) => {
                                    if (!destinationFilePath) {
                                        destinationFilePath = getFilenameFromUrl(options.url);
                                    }
                                    if (data instanceof NSData) {
                                        // ensure destination path exists by creating any missing parent directories
                                        const file = nsFile.fromPath(destinationFilePath);

                                        data.writeToFileAtomically(destinationFilePath, true);

                                        return file;
                                    } else {
                                        reject(new Error(`Cannot save file with path: ${destinationFilePath}.`));
                                    }

                                    return null;
                                }
                            },
                            statusCode: response.statusCode,
                            headers: headers
                        });
                    }
                });

            if (options.url && debugRequest) {
                const request = {
                    url: options.url,
                    method: "GET",
                    headers: options.headers
                };
                debugRequest.requestWillBeSent(request);
            }

            dataTask.resume();
        } catch (ex) {
            reject(ex);
        }
    });
}

function NSDataToString(data: any, encoding?: HttpResponseEncoding): string {
    let code = NSUTF8StringEncoding; // long:4

    if (encoding === HttpResponseEncoding.GBK) {
        code = CFStringEncodings.kCFStringEncodingGB_18030_2000; // long:1586
    }

    let encodedString = NSString.alloc().initWithDataEncoding(data, code);

    // If UTF8 string encoding fails try with ISO-8859-1
    if (!encodedString) {
        code = NSISOLatin1StringEncoding; // long:5
        encodedString = NSString.alloc().initWithDataEncoding(data, code);
    }

    return encodedString.toString();
}

export function getString(arg: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const str = r.content.toString();
                    resolve(str);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getJSON<T>(arg: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const json = r.content.toJSON();
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getImage(arg: any): Promise<ImageSource> {
    return new Promise<any>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    resolve(r.content.toImage());
                } catch (err) {
                    reject(err);
                }
            }, err => {
                reject(err);
            });
    });
}

export function getFile(arg: any, destinationFilePath?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const file = r.content.toFile(destinationFilePath);
                    resolve(file);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function getBinary(arg: any): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        request(typeof arg === "string" ? { url: arg, method: "GET" } : arg)
            .then(r => {
                try {
                    const arrayBuffer = r.content.toArrayBuffer();
                    resolve(arrayBuffer);
                } catch (e) {
                    reject(e);
                }
            }, e => reject(e));
    });
}

export function addHeader(headers: Headers, key: string, value: string): void {
    if (!headers[key]) {
        headers[key] = value;
    } else if (Array.isArray(headers[key])) {
        (<string[]>headers[key]).push(value);
    } else {
        const values: string[] = [<string>headers[key]];
        values.push(value);
        headers[key] = values;
    }
}

export function setImageParseMethod(imageParseMethod: ImageParseMethod) {
    // Doesn't do anything for iOS.
}

export function setConcurrencyLimits(maxRequests: number, maxRequestsPerHost: number) {
    sessionConfig.HTTPMaximumConnectionsPerHost = maxRequestsPerHost;
}

export function clearCookies() {
    if (sessionConfig.HTTPCookieStorage && sessionConfig.HTTPCookieStorage.cookies) {
        const cookieCount = sessionConfig.HTTPCookieStorage.cookies.count;
        if (cookieCount <= 0) {
            return;
        }

        for (let i = 0; i < cookieCount; i++) {
            const cookie = sessionConfig.HTTPCookieStorage.cookies.objectAtIndex(0);
            if (cookie) {
                sessionConfig.HTTPCookieStorage.deleteCookie(cookie);
            }
        }
    }
}

export function setUserAgent(userAgent?: string) {
    customUserAgent = userAgent;
}

export function certificatePinningAdd(pattern: string, hashes: Array<string>) {
    // Clear caches because pins have changed.
    if (sessionConfig.URLCache) {
        sessionConfig.URLCache.removeAllCachedResponses();
    }

    if (certificatePinningConfig == null) {
        certificatePinningConfig = NSMutableDictionary.new<string, any>().init();
        certificatePinningConfig.setValueForKey(false, kTSKSwizzleNetworkDelegates);
    }

    if (certificatePinningDomainList == null) {
        certificatePinningDomainList = NSMutableDictionary.new<string, any>().init();
    }

    const domainSetting = NSMutableDictionary.new<string, any>().init();
    domainSetting.setValueForKey(true, kTSKDisableDefaultReportUri);
    domainSetting.setValueForKey(hashes, kTSKPublicKeyHashes);

    let allowSubdomains = false;
    let domain = pattern;
    if (domain.indexOf("**.") === 0) {
        domain = domain.slice("**.".length);
        allowSubdomains = true;
    }

    if (domain.indexOf("*.") === 0) {
        domain = domain.slice("*.".length);
        allowSubdomains = true;
    }

    domainSetting.setValueForKey(allowSubdomains, kTSKIncludeSubdomains);
    certificatePinningDomainList.setValueForKey(domainSetting, domain);

    certificatePinningConfig.setValueForKey(certificatePinningDomainList, kTSKPinnedDomains);
    certificatePinningInstance = TrustKit.alloc().initWithConfiguration(certificatePinningConfig);
}

export function certificatePinningClear() {
    // Clear caches because pins have changed.
    if (sessionConfig.URLCache) {
        sessionConfig.URLCache.removeAllCachedResponses();
    }

    certificatePinningConfig = null;
    certificatePinningInstance = null;
    certificatePinningDomainList = null;
}

export function getCurrentUserAgent() {
    return customUserAgent;
}

export function getCurrentCertificatePinningInstance(): TrustKit | null {
    return certificatePinningInstance;
}

export const Http = {
    getFile,
    getImage,
    getJSON,
    getString,
    request,
};

export { ImageCache } from './image-cache';

export function clearCache() {
    NSURLCache.sharedURLCache.removeAllCachedResponses();
    console.info("Cache Cleared!");
}