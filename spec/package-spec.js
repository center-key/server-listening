// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const serverListening = require('../server-listening');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The server-listening package', () => {

   it('is exported as an object', () => {
      const actual =   { type: typeof serverListening };
      const expected = { type: 'object' };
      assert.deepEqual(actual, expected);
      });

   it('contains the functions: setPort(), ready(), close()', () => {
      const names = ['setPort', 'ready', 'close'];
      const actual =   { functions: Object.keys(serverListening).sort() };
      const expected = { functions: names.sort() };
      assert.deepEqual(actual, expected);
      });

   it('functions are the correct type', () => {
      const actual =   { types: Object.values(serverListening).map(v => typeof v) };
      const expected = { types: ['function', 'function', 'function'] };
      assert.deepEqual(actual, expected);
      });

   });
