const fs = require('fs');
const config = require('config');
const express = require('express');
const logger = require('./logger');
const expressDebug = require('debug')('app:express');
const uncaughtDebug = require('debug')('app:Uncaught');

const app = express();
const port = config.get('PORT') || 8000;
const frontend_addr = config.get('FRONTEND_IP') || '127.0.0.1';
const frontend_port = config.get('FRONTEND_PORT') || 3000;

const cdgRouter = require('./core/core');

app.use((req, res, next) => {
    var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', `http://${frontend_addr}:${frontend_port}`];
    var origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});


app.get('/', async (req, res) => {
    logger.debug('[/] Root index, nothing to see here')
    res.send('Hello world')
})

app.use('/cdg', cdgRouter)

app.listen(port, () => {
    logger.info(`[app/] Server is up & running @ port ${port}`)
    expressDebug(`Server is up & running @ port ${port}`)
});

module.exports=app;