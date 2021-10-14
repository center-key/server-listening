//! server-listening v0.3.2 ~~ https://github.com/center-key/server-listening ~~ MIT License

/// <reference types="cheerio" />
import httpTerminator from 'http-terminator';
import { JSDOM, BaseOptions, DOMWindow } from 'jsdom';
import { Server } from 'http';
export declare type ServerListeningOptions = {
    port?: number;
    name?: string;
};
export declare type StartWebServerOptions = {
    folder?: string;
    port?: number;
    verbose?: boolean;
};
export declare type Http = {
    server: Server;
    terminator: httpTerminator.HttpTerminator;
    folder: string;
    url: string;
    port: number;
    verbose: boolean;
};
export declare type LoadWebPageOptions = {
    jsdom?: BaseOptions;
    verbose?: boolean;
};
export declare type Web = {
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
    setPort(options?: ServerListeningOptions | undefined): void;
    ready(server: Server): Promise<Server>;
    close(server: Server): Promise<Server | Error | undefined>;
    jsdomOnLoad(dom: JSDOM): Promise<JSDOM>;
    jsdomCloseWindow(dom: JSDOM): Promise<JSDOM>;
    log(...args: unknown[]): void;
    startWebServer(options?: StartWebServerOptions | undefined): Promise<Http>;
    shutdownWebServer(http: Http): Promise<void>;
    loadWebPage(url: string, options?: LoadWebPageOptions | undefined): Promise<Web>;
    closeWebPage(web: Web): Promise<Web>;
};
export { serverListening };
