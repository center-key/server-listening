// server-listening ~ github.com/center-key/server-listening ~ MIT License

import cheerio from 'cheerio';
import express from 'express';
import httpTerminator from 'http-terminator';
import { AddressInfo } from 'net';
import { JSDOM, BaseOptions, DOMWindow } from 'jsdom';
import { Server } from 'http';

export type ServerListeningOptions = {
   port?: number,  //0 = find unused port
   name?: string,  //environment variable to pass port number
   };
export type StartWebServerOptions = {
   folder?:  string,
   port?:    number,
   verbose?: boolean,
   };
export type Http = {
   server:     Server,
   terminator: httpTerminator.HttpTerminator,
   folder:     string,
   url:        string,
   port:       number,
   verbose:    boolean,
   };
export type LoadWebPageOptions = {
   jsdom?: BaseOptions,
   verbose?: boolean,
   };
export type Web = {
   url:      string,
   dom:      JSDOM,
   window:   DOMWindow,
   document: Document,
   title:    string,
   html:     string,
   $:        cheerio.Root,  //like jQuery
   verbose:  boolean,
   };

const serverListening = {
   setPort(options?: ServerListeningOptions): void {
      const defaults = { port: 0, name: 'port' };  //port 0 to find unused port
      const { port, name } = { ...defaults, ...options };
      process.env[name] = String(port);
      },
   ready(server: Server): Promise<Server> {
      const waitForReady = (done: (value: Server) => void): Server => server.on('listening', done);
      return new Promise(resolve => server.listening ? resolve(server) : waitForReady(resolve));
      },
   close(server: Server): Promise<Server | Error | undefined> {
      return new Promise(resolve => server.close(resolve));
      },
   jsdomOnLoad(dom: JSDOM): Promise<JSDOM> {
      const name = dom && dom.constructor && dom.constructor.name;
      if (name !== 'JSDOM')
         throw Error(`[server-listening] Unable to load DOM: ${name} => ${String(dom)}`);
      let done: (jsdom: JSDOM) => void;
      dom.window.onload = () => done(dom);
      return new Promise(resolve => done = resolve);
      },
   jsdomCloseWindow(dom: JSDOM): Promise<JSDOM> {
      if (dom)
         dom.window.close();
      return new Promise(resolve => resolve(dom));
      },
   log(...args: unknown[]): void {
      console.log('  [' + new Date().toISOString() + ']', ...args);
      },
   startWebServer(options?: StartWebServerOptions): Promise<Http> {
      const defaults = { folder: '.', port: 0, verbose: true };
      const settings = { ...defaults, ...options };
      const server = express().use(express.static(settings.folder)).listen(settings.port);
      const terminator = httpTerminator.createHttpTerminator({ server });
      const port =         () => (<AddressInfo>server.address()).port;
      const url =          () => 'http://localhost:' + String(port()) + '/';
      const logListening = () => serverListening.log('Web Server - listening:', server.listening, port(), url());
      const logClose =     () => serverListening.log('Web Server - shutdown:', !server.listening);
      const http = (): Http => ({
         server:     server,
         terminator: terminator,
         folder:     settings.folder,
         url:        url(),
         port:       port(),
         verbose:    settings.verbose,
         });
      let done: (http: Http) => void;
      server.on('listening', () => done(http()));
      if (settings.verbose)
         server.on('listening', logListening).on('close', logClose);
      return new Promise(resolve => done = resolve);
      },
   shutdownWebServer(http: Http): Promise<void> {
      return http.terminator.terminate();
      },
   loadWebPage(url: string, options?: LoadWebPageOptions): Promise<Web> {
      const jsdomOptions: BaseOptions = { resources: 'usable', runScripts: 'dangerously' };
      const defaults = { jsdom: jsdomOptions, verbose: true };
      const settings = { ...defaults, ...options };
      if (settings.verbose)
         serverListening.log('Web Page - loading:', url);
      const web = (jsdom: JSDOM) => ({
         url:      url,
         dom:      jsdom,
         window:   jsdom.window,
         document: jsdom.window.document,
         title:    jsdom.window.document.title,
         html:     jsdom.window.document.documentElement.outerHTML,
         $:        cheerio.load(jsdom.window.document.documentElement.outerHTML),
         verbose:  settings.verbose,
         });
      return JSDOM.fromURL(url, settings.jsdom)
         .then(serverListening.jsdomOnLoad)
         .then(jsdom => web(jsdom));
      },
   closeWebPage(web: Web): Promise<Web> {
      if (web.verbose)
         serverListening.log('Web Page - closing:', web.url);
      web.window.close();
      return new Promise(resolve => resolve(web));
      },
   };

export { serverListening };
