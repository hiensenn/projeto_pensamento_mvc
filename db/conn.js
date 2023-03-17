const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectado ao banco de dados')
} catch(e){
    console.log(`não foi possível conectar : ${e}`)
}

module.exports = sequelize