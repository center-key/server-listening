// server-listening ~ github.com/center-key/server-listening ~ MIT License

const { JSDOM } = require('jsdom');

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
   handleDom(dom) {
      if (dom instanceof JSDOM === false)
         throw Error('serverListening - Unable to load DOM: ' + typeof dom);
      let done;
      dom.window.onload = () => {
         global.window = dom.window;
         global.$ = window.jQuery;
         done(dom);
         };
      return new Promise((resolve) => done = resolve);
      },
   close(server) {
      return new Promise((resolve) => server.close(resolve));
      }
   };

module.exports = serverListening;
