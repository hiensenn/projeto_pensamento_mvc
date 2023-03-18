const express = require('express')
const ToughtController = require('../controllers/ToughtController')
const router = express.Router()

//helper
const checkAuth = require('../helpers/auth').checkAuth //middleware que checa se o usuário está logado

router.get('/add', checkAuth ,ToughtController.createTought)
router.post('/add', checkAuth ,ToughtController.createToughtSave)
router.get('/edit/:id', checkAuth ,ToughtController.updateTought)
router.post('/edit', checkAuth ,ToughtController.updateToughtSave)
router.get('/dashboard', checkAuth ,ToughtController.dashboard) //utilizando o middleware
router.post('/remove', checkAuth ,ToughtController.removeTought)
router.get('/', ToughtController.showToughts)

module.exports = router