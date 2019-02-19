const mysql=require('mysql2');

const connection=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'ShoppingCart',
    password:'23rdmay1996'
});

module.exports=connection.promise();