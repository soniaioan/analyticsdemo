const root = process.cwd()
const _ = require('lodash')
const utils = require(root +'/lib/utils')
/**
 * finds the top most common file extensions in logs and compute the average body size per extension
 * @param logData
 * @param top
 * @returns {Array.<*>}
 */
module.exports = function (logData, top) {
        let countingMap = new Map();
        logData.forEach((logEntry) => {
            let counting = 0
            let bytes = logEntry.body_bytes_sent
            let extension = utils.findPathExtension(logEntry.path)
            if (extension != '') {
                let mapEntry = countingMap.get(extension)
                if (mapEntry) {
                    counting = mapEntry.counting
                    bytes = mapEntry.bytes + bytes
                }
                counting++
                countingMap.set(extension, {'counting': counting, 'bytes': bytes})
            }
        })
        let countingArr = Array.from(countingMap.entries()).map(entry => {
            let [key, value] = entry;
            return {
                filetype: key,
                counting: value.counting,
                bytes: value.bytes
            }
        })
        let sortedByCounting = _.orderBy(countingArr, ['counting'], ['desc']);
        return sortedByCounting.slice(0, top)
}