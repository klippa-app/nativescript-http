## 2.0.3

### Fixed

- Fix invalid File instance check (#44), thanks @triniwiz

## 2.0.2

### Fixed

- Fixed a bug related to Angular 11 and the XHR implementation.

## 2.0.1

### Fixed

- Fixed a bug related to the Angular module.

## 2.0.0

### Added

- Added NS7 and Angular 10 support. This version does not work on NS6, use major version 1 (^1.0.0) for that.

## 1.3.1

### Fixed

- Fixed a bug in the clearCookies method on iOS. (#1)

## 1.3.0

### Added

- Ability to replace image-cache from core.

## 1.2.0

### Added

- WebSockets

## 1.1.3

### Fixed

- Program against okhttp3 typings, so everything still works when using the older okhttp3 and also with okhttp4.

## 1.1.2

### Added

- Automatic integration self-check functionality

## 1.1.1

### Changed

- Changed package description

## 1.1.0

### Added

- SSL/Certificate pinning support
- Information about OkHttp versions and Android API versions

### Changed

- Improved the readme

## 1.0.2

### Added

- Added Vue demo.

## 1.0.1

### Fixed

- Fix cookie jar null check for Android, error while trying to clear cookies when cookie jar does not exist yet
- Fix custom User Agent not applying when headers are set
- Fix POST/PATCH/PUT failing for Android with empty body

## 1.0.0

Stable release with both iOS and Android support.

### Changed

- okhttp3 (Android) now uses a dispatcher to have control over thread/concurrency limits 

### Added
- Multipart form data support for iOS
- `setImageParseMethod` to control the image parse method for Android
- `setConcurrencyLimits` to control thread/concurrency limits
- `clearCookies` to clear the cookies
- `setUserAgent` to set a global user agent

## 0.0.9

### Fixed

- Remove leftover code

## 0.0.8

### Changed

- Proper webpack plugin that uses module replacement and not source rewriting
- Make sure we export the same as http-request
