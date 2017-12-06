'use strict'
const logger = require('log4js');

// logger.configure({
//   appenders: { mongoview: { type: 'file', filename: 'logs/mongoview.log' } },
//   categories: { default: { appenders: ['mongoview'], level: 'info' } }
// });

logger.configure({ // configure to use all types in different files.
  appenders: {
    out: { type: 'console' },
    task: { type: 'dateFile', filename: 'logs/debug.log', alwaysIncludePattern:true },
    result: { type: 'dateFile', filename: 'logs/result.log', alwaysIncludePattern:true},
    error: { type: 'dateFile', filename: 'logs/error.log',alwaysIncludePattern:true},
    default: { type: 'dateFile', filename: 'logs/default.log',alwaysIncludePattern:true},
  },
  categories: {
    default: { appenders: ['out','default'], level: 'info' },
    task: { appenders: ['task'], level: 'info'},
    result: { appenders: ['result'], level: 'info' },
    error: { appenders: ['error'], level: 'error' }
  }
});

module.exports = logger;
