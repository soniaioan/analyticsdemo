const should = require('should')
const root = process.cwd()

describe('Analytics Service: Service takes as input an array with the log data objects and a number x and gives a new output based on requested analysis.' +
    ' It calls the analytics modules from analytics directory ' +
    'The output will be the input in chart service to produce the final chart data to be sent to client.', function () {
    describe('CHART1: Find the x most common file extensions in the array of log data objects and compute for every file type the sum of body size.', function () {
        it('Should return an array with the x log data objects filled in with file type, sum of body size and frequency value.', function () {
            let data = require(root + '/fixtures/mockLogDataObjsCommonExt')
            let analyticsService = require(root +'/lib/services/analyticsService');
            let result = analyticsService.getDataForChart1(data, 2)
            result.length.should.eql(2)
            result[0].filetype.should.equal("js")
            result[0].counting.should.equal(3)
            result[0].bytes.should.equal(131)
            result[1].filetype.should.equal("png")
            result[1].counting.should.equal(2)
            result[1].bytes.should.equal(37)
        })
    })
    describe('CHART2: Find the x most common referrers and compute for every referrer the total of visits for the dates range in logs data.', function () {
        it('Should return a data array with x objects. Every object should have the referrer as key and an array with the number of visits.', function () {
            //data for 3 days
            let data = require(root + '/fixtures/mockLogDataObjsTopRefs')
            let analyticsService = require(root +'/lib/services/analyticsService');
            let result =analyticsService.getDataForChart2(data, 2)
            result.length.should.eql(2)
            result[0].host.should.equal('semicomplete')
            result[0].visits.should.eql([8])
            result[1].host.should.equal('google')
            result[1].visits.should.eql([2])
        })
        it('Should return a data array with x objects even if log objects are having only one specific date', function () {
            //data for 1 day
            let data = require(root + '/fixtures/mockLogDataTopRefsOnlyOneDay')
            let analyticsService = require(root +'/lib/services/analyticsService');
            let result =analyticsService.getDataForChart2(data, 2)
            result.length.should.eql(2)
            result[0].host.should.equal('semicomplete')
            result[0].visits.should.eql([4])
            result[1].host.should.equal('google')
            result[1].visits.should.eql([2])
        })
    })
    describe('CHART3: Find the x most common referrers and compute for every referrer the visits per day.', function () {
        it('Should return an object with the data array with x objects and an array with the different dates based on day. Every object should have the referrer as key and an array with the number of visits per day.', function () {
            //data for 3 days
            let data = require(root + '/fixtures/mockLogDataObjsTopRefs')
            let analyticsService = require(root +'/lib/services/analyticsService');
            let result =analyticsService.getDataForChart3(data, 2)
            result.refsData.length.should.eql(2)
            result.days.length.should.eql(3)
            result.refsData[0].host.should.equal('semicomplete')
            result.refsData[0].visits.should.eql([4,4,0])
            result.refsData[1].host.should.equal('google')
            result.refsData[1].visits.should.eql([2,0,0])
        })
        it('Should return an object with the data array with x objects and an array with the different dates based on day. even if log objects are having only one specific date', function () {
            //data for 1 day
            let data = require(root + '/fixtures/mockLogDataTopRefsOnlyOneDay')
            let analyticsService = require(root +'/lib/services/analyticsService');
            let result =analyticsService.getDataForChart3(data, 2)
            result.refsData.length.should.eql(2)
            result.days.length.should.eql(1)
            result.refsData[0].host.should.equal('semicomplete')
            result.refsData[0].visits.should.eql([4])
            result.refsData[1].host.should.equal('google')
            result.refsData[1].visits.should.eql([2])
        })
    })
})
