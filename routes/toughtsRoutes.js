const express = require('express')
const ToughtController = require('../controllers/ToughtController')
const router = express.Router()

//Controller

router.get('/', ToughtController.showToughts)

module.exports = router