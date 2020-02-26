const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let _db;
let mongoConnect= (callback) =>{
    MongoClient.connect(
        'mongodb+srv://hs_1996:23rdmay1996@cluster0-pppnf.mongodb.net/shop?retryWrites=true',
        {useNewUrlParser: true}
    )
    .then((client)=>{
        console.log('Connected!');
        _db=client.db();
        callback();
    })
    .catch((err)=>console.log(err));

   
}
let get_db=()=>{
    if(_db)
    return _db
    throw "No database found!";
}



exports.mongoConnect=mongoConnect;
exports.get_db=get_db;
