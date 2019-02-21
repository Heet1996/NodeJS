// const mysql=require('mysql2');
const Sequelize=require('sequelize');
// const connection=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'ShoppingCart',
//     password:'23rdmay1996'
// });

const sequelize=new Sequelize('shoppingcart','root','23rdmay1996',{dialect:'mysql',host:'localhost'});
// module.exports=connection.promise();
module.exports=sequelize;