const express = require('express');

// const port = process.env.port || 3000;

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello, World'}));

const server = app.listen(0);
server.on('listening',() => console.log('--- Server is listening on port: ', server.address().port));

module.exports = server;