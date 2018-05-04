const root = process.cwd()
const computeMostCommonFileTypesAvgSize = require(root +'/lib/analytics/fileExtensions/computeMostCommonFileTypesAvgSize')
const computeMostCommonReferrers = require(root +'/lib/analytics/referrers/computeMostCommonReferrers')
const computeVisitsForReferrer =  require(root +'/lib/analytics/referrers/computeVisitsForReferrer')
const utils =  require(root +'/lib/utils')
module.exports = {
    getDataForChart1: function (logData, top) {
        return computeMostCommonFileTypesAvgSize(logData, top)
    },
    getDataForChart2: function (logData, top) {
        let mostCommonReferrers = computeMostCommonReferrers(logData, top)
        mostCommonReferrers.map((topReferrer) => {
            return topReferrer.visits = computeVisitsForReferrer(topReferrer.requests)
        })
        return mostCommonReferrers
    },
    getDataForChart3: function (logData, top) {
        let mostCommonReferrers = computeMostCommonReferrers(logData, top)
        // create an array with the distinct days based on the first date and last date of logs data
        let daysInterval = utils.createArrayOfDaysFromDateInterval(logData[0].time_local, logData[logData.length-1].time_local)
        // counts the visits for every referrer per day based on requests array
        mostCommonReferrers.map((topReferrer) => {
            topReferrer.visits = computeVisitsForReferrer(topReferrer.requests, daysInterval)
        })
        return {days: daysInterval, refsData: mostCommonReferrers}
    }
}