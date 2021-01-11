// Mocha Specification Cases

// Imports
const assert =        require('assert');
const { fetchJson } = require('fetch-json');

// Package
const serverListening = require('../server-listening');

describe('Server specification', () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('A mocha test with server-listening', () => {
   serverListening.setPort({ flush: require.resolve('./server') });
   const server = require('./server');
   before(() => serverListening.ready(server));
   after(() =>  serverListening.close(server));

   it('waits for the server and returns the correct data', () => {
      const url = 'http://localhost:' + server.address().port;
      const handle = (data) => {
         const actual =   data;
         const expected = { pi: 3.14159265 };
         assert.deepStrictEqual(actual, expected);
         };
      return fetchJson.get(url).then(handle);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
