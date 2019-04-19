// REST Server

// Imports
const express = require('express');

// Setup
const port = process.env.port || 3300;
const app = express();

// Routes
app.get('/', (request, response) => response.json({ message: 'Hello, World!' }));

// Server startup
const server = app.listen(port);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
module.exports = server;
