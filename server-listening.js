// server-listening ~ github.com/center-key/server-listening ~ MIT License

const serverListening = {
   setPort(options = null) {
      const defaults = { port: 0, name: 'port', flush: null };  //port 0 to find unused port
      const { port, name, flush } = { ...defaults, ...options };
      process.env[name] = port;
      if (flush)
         delete require.cache[flush];  //flush cache to get fresh server
      },
   ready(server) {
      const waitForReady = (done) => server.on('listening', done);
      return new Promise((resolve) => server.listening ? resolve() : waitForReady(resolve));
      },
   close(server) {
      return new Promise((resolve) => server.close(resolve));
      },
   jsdomOnLoad(dom) {
      const name = dom && dom.constructor && dom.constructor.name;
      if (name !== 'JSDOM')
         throw Error(`serverListening - Unable to load DOM: ${name} => ${String(dom)}`);
      let done;
      dom.window.onload = () => done(dom);
      return new Promise((resolve) => done = resolve);
      },
   jsdomCloseWindow(dom) {
      dom.window.close();
      return new Promise((resolve) => resolve(dom));
      }
   };

module.exports = serverListening;
