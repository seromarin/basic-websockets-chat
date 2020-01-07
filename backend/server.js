const express = require('express');
const app = express();
const Websocket = require('ws')

const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// Websocket
const wss = new Websocket.Server({ port:3001 })

// Static content
app.use(express.static(__dirname + '/../' + 'frontend'))

// Socket port
wss.on('connection', conn => {
    conn.send('something');

    conn.on('message', function incomming(message) {
        console.log('received: %s', message);
        const parsedData = JSON.parse(message)
        // if (typeof message)
        wss.clients.forEach(client => {
            if (client !== conn && client.readyState === Websocket.OPEN) {
                client.send(parsedData.message)
            }
        })
    });
   
})

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))