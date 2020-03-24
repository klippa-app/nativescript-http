package com.klippa.NativeScriptHTTP;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

class MemoryCookieJar implements CookieJar {
    private CookieCache cache;

    public MemoryCookieJar() {
        this.cache = new SetCookieCache();
    }

    @Override
    synchronized public void saveFromResponse(@NotNull HttpUrl url, @NotNull List<Cookie> cookies) {
        cache.addAll(cookies);
    }

    @NotNull
    @Override
    synchronized public List<Cookie> loadForRequest(@NotNull HttpUrl url) {
        List<Cookie> cookiesToRemove = new ArrayList<>();
        List<Cookie> validCookies = new ArrayList<>();

        for (Iterator<Cookie> it = cache.iterator(); it.hasNext(); ) {
            Cookie currentCookie = it.next();

            if (isCookieExpired(currentCookie)) {
                cookiesToRemove.add(currentCookie);
                it.remove();

            } else if (currentCookie.matches(url)) {
                validCookies.add(currentCookie);
            }
        }

        return validCookies;
    }

    private static boolean isCookieExpired(Cookie cookie) {
        return cookie.expiresAt() < System.currentTimeMillis();
    }

    public void clear() {
        cache.clear();
    }
}
