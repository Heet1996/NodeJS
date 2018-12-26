const http=require('http');
const requestHandler=require('./route');
//Below function will register in event loop and returns a server
const server= http.createServer(requestHandler(req,res));
//Sever is listen at this port
server.listen('3000');