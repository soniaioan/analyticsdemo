const express = require('express');
const multer = require('multer')
const router = express.Router();
const root = process.cwd()
const logFileController = require(root + '/lib/controllers/logFileController')

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({storage: storage})
const cpUpload = upload.fields([
    {name: 'logFile', maxCount: 1},
])


router.post('/api/logs', cpUpload, logFileController.uploadLogFile)
router.get('/api/logs/charts', logFileController.getLogFileChartData)
module.exports = router;