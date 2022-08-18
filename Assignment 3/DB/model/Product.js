const { Sequelize } = require("sequelize");
const { sequelize } = require("../connection");

const productModel = sequelize.define('Product' , {
    title:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    Description:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true
    },
    Price:{
        type:Sequelize.INTEGER,
        allowNull:false,
        required:true
    }
})

module.exports = productModel;