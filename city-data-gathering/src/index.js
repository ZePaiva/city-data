const express = require('express');
const expressDebug = require('debug')('app:express');

const app = express();
const port = process.env.PORT || 8000;
const frontend_addr = process.env.FEIP || '127.0.0.1';
const frontend_port = process.env.FEPT || 3000;

app.use((req, res, next) => {
    var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://'+frontend_addr+':'+frontend_port];
    var origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

process.on('uncaughtException', (ex) => {
    fs.appendFileSync('uncaught.log', new Date().toISOString() + " - uncaughtException - " + ex + '\n');
    uncaughtDebug(ex)
});
process.on('unhandledRejection', (ex) => {
    fs.appendFileSync('uncaught.log', new Date().toISOString() + " - unhandledRejection - " + ex + '\n');
    uncaughtDebug(ex)
});

app.listen(port, () => {
    expressDebug('Server is up & running @ port ${port}')
});

app.get('/', async (req, res) => {
    res.send('ola')
})

console.log("hello world");