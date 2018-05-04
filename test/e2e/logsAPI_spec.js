const root = process.cwd()
const app = require(root + '/app')
const request = require('supertest')
const should = require('should')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


describe('API - Logs', function () {
    beforeEach(function () {
        localStorage.setItem('logFilePath', 'fixtures/sample.txt');
    })
    describe('POST: Upload a log file', function () {
        it('Should upload a log file and return status 200', function () {
            return request(app)
                .post('/api/logs')
                .attach('logFile', 'fixtures/sample.txt')
                .expect(200)
                .then(function (res) {
                    console.log(res.body)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should return 400 if log file is missing from request', function () {
            return request(app)
                .post('/api/logs')
                .expect(400)
                .catch(function (err) {
                    throw err
                })
        })
    })
    describe('GET: Get chart data for chart1, chart2 and chart3.' +
        'Chart1: is visualizing the average object size per file extension for the 20 most common file extensions, ' +
        'Chart2: is visualizing the sum of visits per day for the 10 most common referrers ' +
        'Chart3: is visualizing the sum of visits for the 10 most common referrers. ', function () {
        it('Should get the data for charts', function () {
            return request(app)
                .get('/api/logs/charts')
                .expect(200)
                .then(function (res) {
                    res.body.chart1.datasetX.length.should.equal(20)
                    res.body.chart1.datasetY.length.should.equal(20)
                    res.body.chart2.datasetX.length.should.equal(10)
                    res.body.chart2.datasetY.length.should.equal(10)
                    res.body.chart3.datasets.length.should.equal(10)
                    res.body.chart3.days.length.should.equal(4)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should return error if the file is invald', function () {
            localStorage.setItem('logFilePath', 'fixtures/invalidFile.txt');
            return request(app)
                .get('/api/logs/charts')
                .expect(400)
                .then(function (res) {
                    res.body.error.should.equal("Error during parsing of file. Please check format.")
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should return error if the file is empty', function () {
            localStorage.setItem('logFilePath', 'fixtures/empty.txt');
            return request(app)
                .get('/api/logs/charts')
                .expect(400)
                .then(function (res) {
                    res.body.error.should.equal("Error during parsing of file. File is empty.")
                }).catch(function (err) {
                    throw err
                })
        })
    })
})
