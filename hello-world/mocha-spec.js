// Mocha Specification Cases

// Imports
import assert from 'assert';
import { fetchJson } from 'fetch-json';
import { serverListening } from 'server-listening';

// Setup
import { server } from './server.js';
serverListening.setPort();
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The REST endpoint', () => {

   it('responds with the "Hello, World!" message', (done) => {
      const handleData = (data) => {
         const actual =   data;
         const expected = { message: 'Hello, World!' };
         assert.deepStrictEqual(actual, expected);
         done();
         };
      const url = 'http://localhost:' + server.address().port;
      fetchJson.get(url).then(handleData);
      });

   });
