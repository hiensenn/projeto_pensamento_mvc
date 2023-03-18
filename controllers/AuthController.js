const User = require('../models/User')
const bcrypt = require('bcryptjs')
module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        
        const {email, password} = req.body

        //find user
        const user = await User.findOne({where: {email : email}})

        if(!user){
            req.flash('message', 'usuário ou senha não conferem')
            res.render('auth/login')
            return
        }

        //valid password
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            req.flash('message', 'usuário ou senha não conferem')
            res.render('auth/login')
            return
        }

        //initialize session

        req.session.userid = user.id

        req.flash('message', 'Autenticação realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
        

    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){

        const {name, email, password, confirmpassword} = req.body

        //password match validation

        if(password != confirmpassword){
            //mensagem
            req.flash('message', 'As senhas não conferem, tente novamente')
            res.render('auth/register')
            return
        }

        //check if user exists

        const checkIfUserExists = await User.findOne({where: {email : email}})

        if(checkIfUserExists){
             //mensagem
             req.flash('message', 'O e-mail já está em uso')
             res.render('auth/register')
             return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10) //qtd de caracteres
        const hashedPassword = bcrypt.hashSync(password, salt) //criptografando senha do usuário

        const user = {
            name, 
            email,
            password: hashedPassword
        }

        try{
            const createdUser =  await User.create(user) //criando usuário no banco de dados
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            
            

        } catch(e){
            console.log(e)
        }
        

    }

    static logout(req, res){
        req.session.destroy() //removendo a sessão do sistema
        res.redirect('/login')
    }

   
}