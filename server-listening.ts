// server-listening ~ github.com/center-key/server-listening ~ MIT License

import { JSDOM } from 'jsdom';
import { Server } from 'http';

type ServerListeningOptions = {
   port?:  number,  //0 = find unused port
   name?:  string,  //environment variable to pass port number
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
         throw Error(`serverListening - Unable to load DOM: ${name} => ${String(dom)}`);
      let done: (dom: JSDOM) => void;
      dom.window.onload = () => done(dom);
      return new Promise(resolve => done = resolve);
      },
   jsdomCloseWindow(dom: JSDOM): Promise<JSDOM> {
      if (dom)
         dom.window.close();
      return new Promise(resolve => resolve(dom));
      }
   };

export { serverListening };
