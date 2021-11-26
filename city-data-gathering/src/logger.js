const config = require('config');
const winston = require('winston');

const options = {
    file: {
        level: config.get('LOG_LEVEL'),
        filename: config.get('LOG_DIR')+'app.log',
        handleExceptions: true,
        maxsize: 16777216,
        maxFiles: 4,
        colorize: false,
        timestamp: true
    }
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File(options.file)
    ],
    exitOnError: false
});

module.exports = logger