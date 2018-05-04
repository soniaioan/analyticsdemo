const root = process.cwd()
const LineByLineReader = require('line-by-line')
const clfParser = require('clf-parser')
const analyticsService = require(root +'/lib/services/analyticsService')
const chartService = require(root +'/lib/services/chartService')
const clfValidator = require(root + '/lib/logClfValidator')

exports.storePathOfFile = function (path) {
    localStorage.setItem('logFilePath', path);
    return Promise.resolve()
}


exports.parseLogFileData =  function (path) {
    return new Promise((resolve, reject) => {
        let lr = new LineByLineReader(path);
        let parsed = []
        lr.on('error', function (err) {
            reject(new Error('Error during parsing of file. Please check format.'))
            return

        });
        lr.on('line', function (line) {
            if (clfValidator.isValid(clfParser(line))) {
                parsed.push(clfParser(line))
            } else {
                reject(new Error('Error during parsing of file. Please check format.'))
                return
            }
        });
        lr.on('end', function ()  {
            if (parsed.length>0) {
                resolve(parsed)
            }
            reject(new Error('Error during parsing of file. File is empty.'))
            return

        });
    })
}


exports.extractDataForCharts = function (path) {
    return this.parseLogFileData(path).then((result) => {
        let chartsData = {}
        chartsData.chart1 = chartService.createChartData1(analyticsService.getDataForChart1(result, 20))
        chartsData.chart2 = chartService.createChartData2(analyticsService.getDataForChart2(result, 10))
        chartsData.chart3 = chartService.createChartData3(analyticsService.getDataForChart3(result, 10))
        return chartsData
    })
}
