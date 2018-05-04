const moment = require('moment')
module.exports = {
    createChartData1: function (data) {
        let chartData = {}
        let xPoints = []
        let yPoints = []
        data.forEach((fileEntry) => {
            yPoints.push(Math.round( fileEntry.bytes/fileEntry.counting))
            xPoints.push(fileEntry.filetype)
        })
        chartData.datasetX = xPoints
        chartData.datasetY = yPoints
        return chartData
    },
    createChartData2: function (data) {
        let chartData = {}
        let xPoints = []
        let yPoints = []
        data.forEach((referrerEntry) => {
            xPoints.push(referrerEntry.host)
            yPoints.push(referrerEntry.visits[0])
        })
        chartData.datasetX = xPoints
        chartData.datasetY = yPoints
        return chartData
    },
    createChartData3: function (data) {
        let chartData = {}
        chartData.datasets = []
        chartData.days = data.days.map(day => {
            return moment(day).utc().format('DD/MM/YYYY')
        })
        chartData.datasets = data.refsData.map(obj => {
            return {
                host: obj.host,
                visits: obj.visits
            }
        })
        return chartData
    }

}
