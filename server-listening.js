// server-listening

const serverListening = {
   setPort(options = null) {
      const defaults = { port: 0, name: 'port', flush: null };  //port 0 to find unused port
      const { port, name, flush } = { ...defaults, ...options };
      process.env[name] = port;
      if (flush)
         delete require.cache[flush];  //flush cache to get fresh server
      },
   ready(server) {
      const executor = (resolve) => server.listening ? resolve() : server.on('listening', resolve);
      return new Promise(executor);
      },
   close(server) {
      const executor = (resolve) => server.close(resolve);
      return new Promise(executor);
      }
   };

module.exports = serverListening;
