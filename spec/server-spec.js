// Mocha Specification Cases
const fetchJson = require('fetch-json');

// Imports
const assert = require('assert').strict;

// Package
const serverListening = require('../server-listening');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Server Spec', () => {

   describe('A Mocha test with serverListening', () => {
      const server = require('./server');
      before(() => serverListening.ready(server));
      after(() =>  serverListening.close(server));

      it('waits for the server and returns the correct data', () => 
         fetchJson.get('http://localhost:' + server.address().port).then((data) => {
            const actual = data;
            const expected = { message: 'Hello, World' };
            assert.deepEqual(actual, expected);
            })
         );

      });
   });

