'use strict';

const path = require('path');
const fs = require('fs');

function getAllFiles(root) {
    var res = [],
        files = fs.readdirSync(root);
    files.forEach(function (file) {
        var pathname = root + '/' + file,
            stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            res.push(pathname);
        } else {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res
}

function replace(file) {
    const src = path.resolve(file);
    let fileContent = fs.readFileSync(src, 'utf8');

    // We replace the require in the core http request to make the requests using our library.
    if (fileContent.includes("var httpRequest = require(\"./http-request\");") || fileContent.includes("__export(require(\"./http-request\"));")) {
        fileContent = fileContent.replace("var httpRequest = require(\"./http-request\");", "var httpRequest = require(\"@klippa/nativescript-http\");");
        fileContent = fileContent.replace("__export(require(\"./http-request\"));", "__export(require(\"@klippa/nativescript-http\"));");
        fs.writeFileSync(src, fileContent);
    }
}

function NativeScriptHTTPPlugin() {
};

NativeScriptHTTPPlugin.prototype.apply = function (compiler) {
    const done = (statsData) => {
        if (statsData.hasErrors()) {
            return
        }
        const files = getAllFiles("./");
        files.forEach(file => {
            if (file.endsWith("@nativescript/core/http/http.js") || file.endsWith("tns-core-modules/http/http.js")) {
                replace(file);
            }
        });
    }

    if (compiler.hooks) {
        const plugin = {
            name: "NativeScriptHTTPPlugin"
        };
        compiler.hooks.done.tap(plugin, done);
    } else {
        compiler.plugin('done', done);
    }
};

module.exports = NativeScriptHTTPPlugin;
