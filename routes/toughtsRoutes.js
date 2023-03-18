const express = require('express')
const ToughtController = require('../controllers/ToughtController')
const router = express.Router()

//helper
const checkAuth = require('../helpers/auth').checkAuth //middleware que checa se o usuário está logado

router.get('/add', checkAuth ,ToughtController.createTought)
router.get('/dashboard', checkAuth ,ToughtController.dashboard) //utilizando o middleware
router.get('/', ToughtController.showToughts)

module.exports = router