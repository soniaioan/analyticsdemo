const should = require('should')
const root = process.cwd()
require(root + '/lib/assertions/validClfEntry')

describe('LogFile Service: Input is the path of the log file', function () {
    describe('Parse the file in path line by line and produce an array with log objects with clf format', function () {
        it('Should return an array with log objects. Clf format from file should be maintained.', function () {
            let path =  root + '/fixtures/mockSample.txt'
            let logFileService = require(root +'/lib/services/logFileService');
            return logFileService.parseLogFileData(path).then((result) => {
                result.length.should.eql(9)
                result.forEach((obj) => {
                    obj.should.be.a.ValidLogEntry();
                })
            }).catch((err) =>{
                throw(err)
            })
        })
    })
})