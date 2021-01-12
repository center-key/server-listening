// Mocha Specification Cases

// Imports
import assert from 'assert';
import { fetchJson } from 'fetch-json';

// Package
import { serverListening } from '../dist/server-listening.js';
import { server } from './server.js';

describe('Server specification', () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('A mocha test with server-listening', () => {
   serverListening.setPort();
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
