//! server-listening v0.3.3 ~~ https://github.com/center-key/server-listening ~~ MIT License

import cheerio from 'cheerio';
import express from 'express';
import httpTerminator from 'http-terminator';
import { JSDOM } from 'jsdom';
const serverListening = {
    setPort(options) {
        const defaults = { port: 0, name: 'port' };
        const { port, name } = { ...defaults, ...options };
        process.env[name] = String(port);
    },
    ready(server) {
        const waitForReady = (done) => server.on('listening', done);
        return new Promise(resolve => server.listening ? resolve(server) : waitForReady(resolve));
    },
    close(server) {
        return new Promise(resolve => server.close(resolve));
    },
    jsdomOnLoad(dom) {
        const name = dom && dom.constructor && dom.constructor.name;
        if (name !== 'JSDOM')
            throw Error(`[server-listening] Unable to load DOM: ${name} => ${String(dom)}`);
        let done;
        dom.window.onload = () => done(dom);
        return new Promise(resolve => done = resolve);
    },
    jsdomCloseWindow(dom) {
        if (dom)
            dom.window.close();
        return new Promise(resolve => resolve(dom));
    },
    log(...args) {
        console.log('  [' + new Date().toISOString() + ']', ...args);
    },
    startWebServer(options) {
        const defaults = { folder: '.', port: 0, verbose: true };
        const settings = { ...defaults, ...options };
        const server = express().use(express.static(settings.folder)).listen(settings.port);
        const terminator = httpTerminator.createHttpTerminator({ server });
        const port = () => server.address().port;
        const url = () => 'http://localhost:' + String(port()) + '/';
        const logListening = () => serverListening.log('Web Server - listening:', server.listening, port(), url());
        const logClose = () => serverListening.log('Web Server - shutdown:', !server.listening);
        const http = () => ({
            server: server,
            terminator: terminator,
            folder: settings.folder,
            url: url(),
            port: port(),
            verbose: settings.verbose,
        });
        let done;
        server.on('listening', () => done(http()));
        if (settings.verbose)
            server.on('listening', logListening).on('close', logClose);
        return new Promise(resolve => done = resolve);
    },
    shutdownWebServer(http) {
        return http.terminator.terminate();
    },
    loadWebPage(url, options) {
        const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
        const defaults = { jsdom: jsdomOptions, verbose: true };
        const settings = { ...defaults, ...options };
        if (settings.verbose)
            serverListening.log('Web Page - loading:', url);
        const web = (jsdom) => ({
            url: url,
            dom: jsdom,
            window: jsdom.window,
            document: jsdom.window.document,
            title: jsdom.window.document.title,
            html: jsdom.window.document.documentElement.outerHTML,
            $: cheerio.load(jsdom.window.document.documentElement.outerHTML),
            verbose: settings.verbose,
        });
        return JSDOM.fromURL(url, settings.jsdom)
            .then(serverListening.jsdomOnLoad)
            .then(jsdom => web(jsdom));
    },
    closeWebPage(web) {
        if (web.verbose)
            serverListening.log('Web Page - closing:', web.url);
        web.window.close();
        return new Promise(resolve => resolve(web));
    },
};
export { serverListening };
