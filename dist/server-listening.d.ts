//! server-listening v1.0.2 ~~ https://github.com/center-key/server-listening ~~ MIT License

/// <reference types="cheerio" />
import { JSDOM, BaseOptions, DOMWindow } from 'jsdom';
import { Server } from 'http';
import httpTerminator from 'http-terminator';
export type ServerListeningSettings = {
    port: number;
    name: string;
};
export type ServerListeningOptions = Partial<ServerListeningSettings>;
export type StartWebServerSettings = {
    folder: string;
    port: number;
    verbose: boolean;
};
export type StartWebServerOptions = Partial<StartWebServerSettings>;
export type Http = {
    server: Server;
    terminator: httpTerminator.HttpTerminator;
    folder: string;
    url: string;
    port: number;
    verbose: boolean;
};
export type LoadWebPageSettings = {
    jsdom: BaseOptions;
    verbose: boolean;
};
export type LoadWebPageOptions = Partial<LoadWebPageSettings>;
export type Web = {
    url: string;
    dom: JSDOM;
    window: DOMWindow;
    document: Document;
    title: string;
    html: string;
    $: cheerio.Root;
    verbose: boolean;
};
declare const serverListening: {
    setPort(options?: ServerListeningOptions): number;
    ready(server: Server): Promise<Server>;
    close(server: Server): Promise<Server | Error | undefined>;
    jsdomOnLoad(dom: JSDOM): Promise<JSDOM>;
    jsdomCloseWindow(dom: JSDOM): Promise<JSDOM>;
    log(...args: unknown[]): string;
    startWebServer(options?: StartWebServerOptions): Promise<Http>;
    shutdownWebServer(http: Http): Promise<void>;
    loadWebPage(url: string, options?: LoadWebPageOptions): Promise<Web>;
    closeWebPage(web: Web): Promise<Web>;
};
export { serverListening };
