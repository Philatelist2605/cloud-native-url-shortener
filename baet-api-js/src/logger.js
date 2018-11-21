const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(), // string interpolation requies enabling format.splat
    //format.simple(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.simple(),
      handleExceptions: true
    }),
    new transports.File({
      filename: 'app-errors.log',
      level: 'error'
    }),
    new (transports.DailyRotateFile)({
      filename: 'app-logs_%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d'
    })
  ],
  exitOnError: false,
  exceptionHandlers: [
    new transports.File({
      filename: 'app-exceptions.log' })
  ]
});

module.exports = logger;
