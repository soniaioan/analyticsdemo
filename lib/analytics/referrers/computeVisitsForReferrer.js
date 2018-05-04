const root = process.cwd()
const _ = require('lodash')
const moment  = require('moment')


/**
 * based on referrerRequests counts the visits for the given distinct days or the sum of visits
 * if distinctDaysArr not passed
 * @param referrerRequests
 * @param distinctDaysArr
 * @returns {*}
 */
module.exports = function(referrerRequests, distinctDaysArr) {
    let visits
    let pointerForDistinctDay = 0
    let distinctDay
    if (distinctDaysArr) {
        visits = new Array(distinctDaysArr.length).fill(0)
        distinctDay = distinctDaysArr[pointerForDistinctDay]
    }else {
        visits = new Array(1).fill(0)
    }
    let previousDate = ''
    let previousIp = ''
    for (var i=0;i<referrerRequests.length;i++) {
        let currentDate = moment(new Date(referrerRequests[i].timestamp)).utc()
        let currentIp = referrerRequests[i].ip
        //check if day has changed in logs so as to start counting visits for the next distinct day
        if (distinctDaysArr) {
            if (currentDate.diff(distinctDay, 'days') > 0) {
                pointerForDistinctDay++
                distinctDay = distinctDaysArr[pointerForDistinctDay]
            }
        }
        //ip has changed will count a new visit
        if (currentIp!== previousIp) {
            visits[pointerForDistinctDay]++
        } else {
            //if ip has not changed count visit only id the diff in date of logs is greater than 30 minutes so as to count a new visit
            if (currentDate.diff(moment(previousDate).utc(), 'minutes') >= 30) {
                visits[pointerForDistinctDay]++
            }
        }
        previousIp = currentIp
        previousDate = currentDate
    }
    return visits
}