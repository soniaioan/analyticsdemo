const should = require('should')
const root = process.cwd()


describe('File Extensions Analytics: Module executing analysis based on file extension in logs requests', function () {
    describe('Find the x most common file extensions in the array of log data objects and compute for every file type the sum of body size', function () {
        it('Should return an array with the x log data objects filled in with file type, sum of body size and counting value.', function () {
            let data = require(root + '/fixtures/mockLogDataObjsCommonExt')
            const computeMostCommonFileTypesAvgSize = require(root + '/lib/analytics/fileExtensions/computeMostCommonFileTypesAvgSize')
            let result = computeMostCommonFileTypesAvgSize(data, 2)
            result.length.should.eql(2)
            result[0].filetype.should.equal("js")
            result[0].counting.should.equal(3)
            result[0].bytes.should.equal(131)
            result[1].filetype.should.equal("png")
            result[1].counting.should.equal(2)
            result[1].bytes.should.equal(37)
        })
    })
})