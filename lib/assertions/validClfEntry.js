const should = require('should');

should.Assertion.add(
    // the name of the custom assertion
    'ValidLogEntry',
    // the implementation of the custom assertion
    function () {
        this.params = {
            operator: 'to be a valid log clf entry',
        };
        var logEntry = this.obj
        should.exist(logEntry)
        logEntry.should.be.an.Object
        (function () {
            JSON.stringify(logEntry)
        }).should.not.throw()
        should.exist(logEntry.path)
        should.exist(logEntry.remote_addr)
        should.exist(logEntry.body_bytes_sent)
        should.exist(logEntry.status)
        should.exist(logEntry.request)
        should.exist(logEntry.time_local)
        should.exist(logEntry.http_referer)
        should.exist(logEntry.http_user_agent)
        should.exist(logEntry.http_method)
        should.exist(logEntry.protocol)
    },
    true
);