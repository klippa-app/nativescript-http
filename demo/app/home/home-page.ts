/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { HomeViewModel } from "./home-view-model";

import { clearCookies, setUserAgent, setConcurrencyLimits } from "@klippa/nativescript-http";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();

    // Empty out the cookies whenever you want.
    clearCookies();

    // Set a custom user agent.
    setUserAgent("Klippa/HTTP Example App");

    // Setting concurrency limits, 20 at the same time, 2 to the same host.
    setConcurrencyLimits(20, 2);
}

export function onNavigatingFrom(args: NavigatedData) {
    const page = <Page>args.object;
    const bindingContext = <HomeViewModel>page.bindingContext;

    if (bindingContext.websocket) {
        bindingContext.websocket.cancel();
    }
}
