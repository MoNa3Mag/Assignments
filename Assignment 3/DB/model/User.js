const { Sequelize } = require('sequelize');
const {sequelize} = require('../connection');
const productModel = require('./Product');


const userModel = sequelize.define('user' , {
    firstName:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:true,
        required:false
    }

})

userModel.hasMany(productModel, {
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
productModel.belongsTo(userModel);
module.exports = userModel