const should = require('should')
const root = process.cwd()
const utils = require(root + '/lib/utils')


describe('Refferrer Analysis: Modules executing analysis based on referrer value in logs requests', function () {
    describe('Most common referrer: Find the x most common referrers in logs data and the corresponding requests to them', function () {
        it('Should return an array with objects having the host referrer along with the requests array(ip, timestamp) per referrer', function () {
            //data for 3 days
            let data = require(root + '/fixtures/mockLogDataObjsTopRefs')
            let computeMostCommonReferrers = require(root +'/lib/analytics/referrers/computeMostCommonReferrers');
            let result = computeMostCommonReferrers(data, 2)
            result.length.should.eql(2)
            result[0].host.should.equal('semicomplete')
            result[0].requests.length.should.eql(8)
            result[1].host.should.equal('google')
            result[1].requests.length.should.eql(2)
        })
    })
    describe('Visits Per Referrer(per day or total): Find the visits for every referrer per day if array of continuous ' +
        'distinct days passed or the total in all days range in logs if distinctDaysArr not passed ', function () {
        describe('For requests coming for the same ip , timestamp diff should be >= 30 minutes to count it as visit.', function () {
            it('Should return an array with the corresponding visits to distinct days array for the given referrer requests', function () {
                let data = require(root + '/fixtures/mockTopRefsRequests')
                let distinctDaysArr = utils.createArrayOfDaysFromDateInterval(data[0].timestamp, data[data.length-1].timestamp)
                let computeVisitsForReferrer = require(root + '/lib/analytics/referrers/computeVisitsForReferrer');
                let result = computeVisitsForReferrer( data, distinctDaysArr)
                result.length.should.eql(distinctDaysArr.length)
                result.should.eql([4, 1, 1, 1, 2])
            })
            it('Should return an array with one element only: the sum of visits for all requests if distinctDaysArr not passed', function () {
                let data = require(root + '/fixtures/mockTopRefsRequests')
                let computeVisitsForReferrer = require(root + '/lib/analytics/referrers/computeVisitsForReferrer');
                let result = computeVisitsForReferrer( data)
                result.should.eql([9])
            })
        })
    })
})