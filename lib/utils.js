const moment = require('moment')
module.exports = {
    /**
     * finds the extension of the given path
     * @param path
     * @returns {string}
     */
    findPathExtension: function (path) {
        let index = path.indexOf("?");
        if (index !== -1) {
            path = path.substring(0, index); // Remove query
        }
        index = path.lastIndexOf("/");
        if (index !== -1) {
            path = path.substring(index + 1); // Keep path without its segments
        }
        index = path.indexOf("?");
        if (index !== -1) {
            path = path.substring(0, index); // Remove query
        }
        index = path.indexOf("#");
        if (index !== -1) {
            path = path.substring(0, index); // Remove fragment
        }
        index = path.lastIndexOf(".");
        return index !== -1
            ? path.substring(index + 1) // Only keep file extension
            : ""; // No extension found
    },
    createArrayOfDaysFromDateInterval: function(firstDateStr, lastDateStr) {
        let arrayOfDays = []
        let firstDate = moment(new Date(firstDateStr)).utc()
        let lastDate = moment(new Date(lastDateStr)).utc()
        arrayOfDays.push(firstDate.format())
        let diffDays = lastDate.diff(firstDate, 'days')
        if (diffDays>0) {
            for (var i=1; i<diffDays; i++) {
                let date = moment(arrayOfDays[0])
                arrayOfDays.push(date.add(i, 'days').format())
            }
            arrayOfDays.push(lastDate.format())
        }
        return arrayOfDays
    }

}
