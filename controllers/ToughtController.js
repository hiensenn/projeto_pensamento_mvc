const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{




    static async showToughts(req, res){
        res.render('toughts/home') //ir em views criar o front
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard')
    }

    static createTought(req, res){
        res.render('toughts/create')
    }
}