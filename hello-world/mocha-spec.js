// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const fetchJson =       require('fetch-json');
const serverListening = require('server-listening');

// Setup
serverListening.setPort({ flush: require.resolve('./server') });
const server = require('./server');
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The REST endpoint', () => {

   it('responds with the "Hello, World!" message', (done) => {
      const handleData = (data) => {
         assert.deepEqual(data, { message: 'Hello, World!' });
         done();
         };
      const url = 'http://localhost:' + server.address().port;
      fetchJson.get(url).then(handleData);
      });

   });
