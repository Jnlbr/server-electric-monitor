import { createLogger, transports, format } from 'winston';

const { combine, timestamp, label, printf, prettyPrint } = format;
// const loggerFormat = printf(inf => `${inf.timestamp} [${inf.label}] ${inf.level}: ${inf.message}`);
const ignorePrivate = format((info, opts) => {
  if (info.private) { return false; }
  return info;
});

export default createLogger({
  format: combine(
    prettyPrint(),
    ignorePrivate(),
    label({ label: 'Right now!'}), 
    timestamp(), 
    loggerFormat
  ),
  transports: [
    new transports.Console,
    new transports.File({ filename: 'combined.log'})
  ]
});