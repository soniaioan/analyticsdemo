const should = require('should')
const root = process.cwd()
const utils = require(root +'/lib/utils');

describe('Find extension of a file path of log file object', function () {
    it('Should return empty extension if path includes query string', function () {
        let result = utils.findPathExtension("http://www.baidu.com/s?wd=semicomplete.com-JordanSissel")
        result.should.equal("")
        console.log(result)
    })
    it('Should return html extension', function () {
        let result = utils.findPathExtension("/blog/geekery/disabling-battery-in-ubuntu-vms.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+semicomplete/main+(semicomplete.com+-+Jordan+Sissel")
        result.should.equal("html")
        console.log(result)
    })
    it('Should return empty extension if path includes query string but not an extension', function () {
        let result = utils.findPathExtension("/blog/tags/puppet?flav=rss20")
        result.should.equal("")
        console.log(result)
    })
})