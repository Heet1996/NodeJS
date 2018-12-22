const http=require('http');
const fs=require('fs');
//Below function will register in event loop and returns a server
const server= http.createServer((req,res)=>{
    
    // process.exit()  //To unregister from event looop .
    const method=req.method;
    const url=req.url;
    if(url==='/'){
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>')
    res.write('</html>');
    return res.end();
    }
     if(url==='/message' && method==='POST')
    {   const body=[];
        //Creating an event whenever data arrives
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
            const message=parseBody.split('=')[1];
            fs.writeFileSync('message.txt',message) ;
        });
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }

});
//Sever is listen at this port
server.listen('3000');
