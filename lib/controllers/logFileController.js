const root = process.cwd()
const logFileService = require(root +'/lib/services/logFileService')
const LocalStorage = require('node-localstorage').LocalStorage;
const Log = require('log')
    , log = new Log('info');
localStorage = new LocalStorage('./scratch');

exports.uploadLogFile = function(req, res, next) {
    log.info(`[POST /api/logs]`)
    if ( !req.files) {
        throw new Error('No log file found on request body.')
    }
    let logFile = req.files['logFile'][0];
    return logFileService.storePathOfFile(logFile.path).then(() => {
        return res.status(200).json("File uploaded.")
    }).catch(next)
}


exports.getLogFileChartData = function(req, res, next) {
    log.info(`[GET/api/logs/charts]`)
    let path = localStorage.getItem('logFilePath')
    return logFileService.extractDataForCharts(path).then((result) => {
        return res.status(200).json(result)
    }).catch(next)
}