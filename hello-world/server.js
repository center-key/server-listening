// REST Server

// Imports
import express from 'express';

// Setup
const port = process.env.port || 3300;
const app = express();

// Routes
app.use(express.json());
app.get('/', (request, response) => response.json({ message: 'Hello, World!' }));

// Server
const server = app.listen(port);
server.on('listening', () => console.info('  --- server listening on port:', server.address().port));
server.on('close',     () => console.info('  --- server shutdown'));

// Module
export { server };
