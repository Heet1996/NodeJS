const http=require('http');
const fs=require('fs');
//Below function will register in event loop and returns a server
const server= http.createServer((req,res)=>{
    console.log(req);
    // process.exit()  //To unregister from event looop .
    const method=req.method;
    const url=req.url;
    if(url==='/'){
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="button">Submit</button></form></body>')
    res.write('</html>');
    return res.end();
    }
    else if(url==='/message' && method==='POST')
    {
        res.writeFileSync('message.txt','Dummy');
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.header();
    }

});
//Sever is listen at this port
server.listen('3000');
