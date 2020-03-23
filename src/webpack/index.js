'use strict';

// Based on the NormalModuleReplacementPlugin plugin.
class NativeScriptHTTPPlugin {
    constructor() {}

    apply(compiler) {
        const resourceRegExp = /http-request/;
        compiler.hooks.normalModuleFactory.tap(
            "NativeScriptHTTPPlugin",
            nmf => {
                nmf.hooks.beforeResolve.tap("NativeScriptHTTPPlugin", result => {
                    if (!result) return;

                    // Replace http-request imports by our own.
                    if (resourceRegExp.test(result.request)) {
                        // Replace the relative http-request import from core.
                        if (result.request === "./http-request") {
                            if (result.context.endsWith("@nativescript/core/http")) {
                                result.request = "../../../@klippa/nativescript-http";
                            }
                            if (result.context.endsWith("tns-core-modules/http")) {
                                result.request = "../../@klippa/nativescript-http";
                            }
                        }

                        // When other code directly imports http-request.
                        if (result.request === "@nativescript/core/http/http-request" || result.request === "tns-core-modules/http/http-request") {
                            result.request = "@klippa/nativescript-http";
                        }
                    }
                    return result;
                });


            }
        );
    }
}

module.exports = NativeScriptHTTPPlugin;
