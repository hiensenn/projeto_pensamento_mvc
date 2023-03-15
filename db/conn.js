const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',
})