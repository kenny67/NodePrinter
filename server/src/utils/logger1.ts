// 日志的封装
// 写入文件中 file-stream-rotator所有日志
var express = require('express');
var logger = require('morgan');
var fileStreamRotato = require('file-stream-rotator')
var app = express()
var accessLogStream = fileStreamRotato.getStream({
  filename: './log/access-%DATE%.log',
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
})

// 格式化日志输出格式  由于代码重复，对输出格式进行封装
function formatLog(tokens: any, req : any, res : any) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    decodeURI(tokens.url(req, res)), // 获取get参数
    JSON.stringify(req.body),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}

const accessLog = (logger(function (tokens: any, req: any, res: any) {
  return formatLog(tokens, req, res)
}, {stream: accessLogStream}));
// 写入文件中 file-stream-rotator 错误日志
var accessLogStreamErr = fileStreamRotato.getStream({
  filename: './log/access-err-%DATE%.log',
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
})
const accessLogErr = (logger(function (tokens: any, req: any, res: any) {
  return formatLog(tokens, req, res)
}, {
  stream: accessLogStreamErr,
  skip: function (req : any, res : any) {
    return res.statusCode < 400
  }
}));
// 导出代码
module.exports = {accessLog, accessLogErr, logger}


// import Logger from "./lib/logger";
//加载日志模块
// const logger = require('./utils/logger')
// // 写入所有日志
// app.use(logger.accessLog)
// // 写入错误日志
// app.use(logger.accessLogErr)
// // 打印日志
// app.use(logger.logger('dev'))
// if (process.env.NODE_ENV === 'development'){
//   // 开发环境打印日志不保存
//   app.use(logger.logger('dev'))
// }else {
//   // 生产环境
//   app.use(logger.accessLog)
//   app.use(logger.accessLogErr)
// }
