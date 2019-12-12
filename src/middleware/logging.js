const { format, transports } = require('winston');
const { logger, errorLogger } = require('express-winston');

module.exports = {
  log: logger({
    transports: [
      new transports.File({
        filename: 'Info.log',
        level: 'info'
      })
    ],
    format: format.combine(
      format.colorize(),
      format.json(),
      format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss'
      }),
      format.prettyPrint()
    )
  }),
  error: errorLogger({
    transports: [
      new transports.File({
        filename: 'Error.log',
        level: 'error'
      })
    ],
    format: format.combine(
      format.colorize(),
      format.json(),
      format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss'
      }),
      format.prettyPrint()
    )
  })
};
