const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{

    static async showToughts(req, res){

        const toughtsData = await Tought.findAll({
            include: User,
        })

        const toughts = toughtsData.map((result) => result.get({plain: true})) 

        res.render('toughts/home', {toughts}) //ir em views criar o front
    }

    static async dashboard(req, res){

        const userId = req.session.userid 

        const user = await User.findOne({
            where:{
                id : userId,
            },
            include: Tought, //traz todos os pensamentos do usuário 
            plain : true,
        })


        //check if user exists
        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }


        res.render('toughts/dashboard', {toughts, emptyToughts})

    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){

        const tought = {
            title : req.body.title,
            UserId : req.session.userid //colocar como está no banco de dados lá no Workbanch
        }

        

        try{
            await Tought.create(tought)
            req.flash('message', 'pensamento criado com sucesso!')

            req.session.save(() => {

                res.redirect('/toughts/dashboard')
            })

        }catch(e){
            console.log(e)
        }

        
        

    }

    static async removeTought(req, res){
        
        const id = req.body.id
        const UserId = req.session.userid
        

        try{

            await Tought.destroy({where: {id:id, UserId : UserId}})
            req.flash('message', 'Pensamento Removido com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        }catch(e){

            console.log(e)
        }
    }

    static async updateTought(req, res){

        const id = req.params.id

        const tought = await Tought.findOne({where: {id:id}, raw:true})

        res.render('toughts/edit', {tought})


    }

    static async updateToughtSave(req, res){
        const id = req.body.id
        const tought = {
            title:  req.body.title

        } 

        try{

            await Tought.update(tought, {where: {id:id}})

            req.flash('message', "Pensamento Atualizado")

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }catch(e){
            console.log(e)
        }
    }
}