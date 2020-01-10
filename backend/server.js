const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Websocket = require('ws')
const hbs = require('express-handlebars')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cookie = require('cookie');
const helmet = require('helmet');

const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// Websocket
const wss = new Websocket.Server({ port:3001 })

// Static content
app.use(express.static(__dirname + '/../' + 'public'))
// app.use(express.bodyParser())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cookieParser());

// Seguridad
app.use(helmet());
app.disable('x-powered-by');

app.use(session({
    secret: '123klj1n2312',
    name : 'sessionId',
    // cookie: { secure: false }
}))

// Template engine
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', {layout: 'default'})
})

app.get('/chat', (req, res) => {
    res.render('chat', {layout: 'default'})
})

app.post('/newuser', (req, res) => {
    req.session.username = req.body.username;
    res.redirect('/chat')
})

// Socket port
wss.on('connection', (conn, req, client) => {
    // conn.send('something');

    console.log({req, conn, client});

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