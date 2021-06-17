// Mocha Specification Cases

// Imports
import assert from 'assert';

// Package
import { serverListening } from '../dist/server-listening.js';

describe('Package specification', () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The server-listening package', () => {

   it('is exported as an object', () => {
      const actual =   { type: typeof serverListening };
      const expected = { type: 'object' };
      assert.deepStrictEqual(actual, expected);
      });

   it('contains the functions: setPort(), ready(), close(), jsdomOnLoad(), jsdomCloseWindow()', () => {
      const names = ['setPort', 'ready', 'close', 'jsdomOnLoad', 'jsdomCloseWindow'];
      const actual =   { functions: Object.keys(serverListening).sort() };
      const expected = { functions: names.sort() };
      assert.deepStrictEqual(actual, expected);
      });

   it('functions are the correct type', () => {
      const actual =   { types: Object.values(serverListening).map(v => typeof v) };
      const expected = { types: ['function', 'function', 'function', 'function', 'function'] };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The setPort() function', () => {

   it('sets a specified environment variable to a specified port number', () => {
      serverListening.setPort({ port: 12345, name: 'mockPort'});
      const actual =   { port: process.env.mockPort };
      const expected = { port: '12345' };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The ready() function', () => {

   it('returns a promise when given a mock server', () => {
      const mockServer = { listening: true };
      const actual =   { promise: serverListening.ready(mockServer) instanceof Promise };
      const expected = { promise: true };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The close() function', () => {

   it('returns a promise when given a mock server', () => {
      const mockServer = { close: (callback) => callback() };
      const actual =   { promise: serverListening.close(mockServer) instanceof Promise };
      const expected = { promise: true };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The jsdomOnLoad() function', () => {

   it('throws an error if the DOM is missing', () => {
      const callhandleDom = () => serverListening.jsdomOnLoad(null);
      assert.throws(callhandleDom, 'Error: serverListening - Unable to load DOM: null => null');
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The jsdomCloseWindow() function', () => {

   it('runs the dom.window.close() function and returns a promise', () => {
      let status = null;
      const dom = { window: { close: () => status = 'done' } };
      const promise = serverListening.jsdomCloseWindow(dom);
      const actual =   { close: status, promise: promise instanceof Promise };
      const expected = { close: 'done', promise: true };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
