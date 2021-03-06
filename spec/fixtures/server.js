// Pi Server

// Imports
import express from 'express';

// Setup
const port = process.env.port || 31415;
const app = express();

// Routes
app.use(express.json());
app.get('/', (request, response) => response.json({ pi: 3.14159265 }));

// Server
const server = app.listen(port);
server.on('listening', () => console.log('  --- server listening on port:', server.address().port));
server.on('close',     () => console.log('  --- server shutdown'));

// Module
export { server };
