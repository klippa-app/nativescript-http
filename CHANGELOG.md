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
