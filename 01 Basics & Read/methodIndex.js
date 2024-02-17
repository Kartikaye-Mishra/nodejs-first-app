import http from 'http'

const server = http.createServer((req,res)=>{

    console.log(req.method);

    if(req.url==='/'){
        res.end("<h1>home</h1>");
    }
    else if(req.url==="/about"){
        res.end("<h1>About Page</h1>")
    }
    else if(req.url==="/contact"){
        res.end("<h1>Contact Page</h1>")
    }
    else{
        res.end("<h1>Page Not Found</h1>")
    }
})
server.listen(5000,()=>{
    console.log("server start");
})