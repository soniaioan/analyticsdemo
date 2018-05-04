const root = process.cwd()
const _ = require('lodash')
const parseDomain = require('parse-domain')

/**
 * finds the most common referrers in logs
 * @param logData
 * @param top
 * @returns {Array.<*>}
 */
module.exports = function (logData, top) {
        let countingMap = new Map()
        let data = {}
        // with the help of a Map count the occurences of every referrer in logs
        // at the same time collect the requests for every referrer in a new data object
        logData.forEach((logEntry) => {
            let counting = 0
            let referrerUrl = logEntry.http_referer.substring(1, logEntry.http_referer.length-1) // escape first and last double quotes
            let parsedReferrerDomain = parseDomain(referrerUrl)
            if (parsedReferrerDomain) {
                let host = parsedReferrerDomain.domain
                let mapEntry = countingMap.get(host)
                if (mapEntry) {
                    counting = mapEntry.counting
                }
                counting++
                countingMap.set(host, {'counting': counting})
                if (!data[host]) {
                    data[host] = {}
                    data[host].requests = []
                }
                data[host].requests.push({ip: logEntry.remote_addr, timestamp: logEntry.time_local.toISOString()})
            }
        })
        //convert Map to array so as to sort it and find the top referrers
        let countingArr = Array.from(countingMap.entries()).map(entry => {
            let [key, value] = entry;
            return {
                host: key,
                counting: value
            }
        })
        let sortedByCounting = _.orderBy(countingArr, ['counting'], ['desc']);
        let topReferrers = sortedByCounting.slice(0,top)
        //now that I have the top referrers, add from previous data object the requests array.
        topReferrers.forEach((topReferrer) => {
            topReferrer['requests'] = data[topReferrer.host].requests
        })
        return topReferrers
}