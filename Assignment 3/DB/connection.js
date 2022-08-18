const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize ('routeblog' , 'root' , '' , {
    host:'localhost',
    dialect:'mysql'
});


const drawTable = ()=>{
    return sequelize.sync({alter:true}).then((result)=>{
        console.log("running DB");
    }).catch((err) =>{
        console.log("fail to connect DB" , err);
    })
}

module.exports = {sequelize , drawTable}