const morgan = require('morgan');
const fs = require('fs');
const moment = require('moment-timezone');


moment.tz.setDefault('Europe/Turkey');
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

const logger = morgan((tokens, req, res) => {
    const logMessage = [
   'IP :', req.ip, '\n',
   'Date :',tokens.date = moment().format(),'\n',
   'HTTP Method :', tokens.method(req, res), '\n',
   'URL :', tokens.url(req, res), '\n',
   'HTTP Status Code :', tokens.status(req, res), '\n',
   'Content Length :', tokens.res(req, res, 'content-length'),'\n',
   'Response Time :', tokens['response-time'](req, res), 'ms', '\n',
   'Auth Header :', req.headers.authorization, '\n',
   'Request Body :', JSON.stringify(req.body), '\n',
   'User Agent :', req.headers['user-agent'],
 ].join(' ');

 return logMessage + '\n\n';
 }, {
   stream: accessLogStream,
   format: ':date[Europe/Istanbul] :method :url :status :res[content-length] - :response-time ms :remote-addr :user-agent',
   dateFn: function (req, res, tz) {
     return moment().tz(tz).format('YYYY-MM-DD HH:mm:ss');
   },
 });

module.exports = logger;