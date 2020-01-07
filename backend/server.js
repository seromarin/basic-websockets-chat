const express = require('express');
const app = express();

const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../' + 'frontend'))
// console.log(__dirname)

app.get('/ws', (req, res) => res.send('Soy un socket'))

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))