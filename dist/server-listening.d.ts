//! server-listening v1.2.5 ~~ https://github.com/center-key/server-listening ~~ MIT License

import { JSDOM, BaseOptions, DOMWindow } from 'jsdom';
import { Server } from 'http';
import httpTerminator from 'http-terminator';
export type ServerListeningSettings = {
    port: number;
    name: string;
};
export type StartWebServerSettings = {
    folder: string;
    port: number;
    verbose: boolean;
};
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
export type Web = {
    url: string;
    dom: JSDOM;
    window: DOMWindow;
    document: Document;
    title: string;
    html: string;
    verbose: boolean;
};
declare const serverListening: {
    setPort(options?: Partial<ServerListeningSettings>): number;
    ready(server: Server): Promise<Server>;
    close(server: Server): Promise<Server | Error | undefined>;
    jsdomOnLoad(dom: JSDOM): Promise<JSDOM>;
    jsdomCloseWindow(dom: JSDOM): Promise<JSDOM>;
    log(...args: unknown[]): string;
    startWebServer(options?: Partial<StartWebServerSettings>): Promise<Http>;
    shutdownWebServer(http: Http): Promise<void>;
    loadWebPage(url: string, options?: Partial<LoadWebPageSettings>): Promise<Web>;
    closeWebPage(web: Web): Promise<Web>;
};
export { serverListening };
