import winston from 'winston';

export default winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});
