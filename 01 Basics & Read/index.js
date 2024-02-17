//const http = require('http');By changing type=modules in package.json
import http from 'http';
import featurelist from './features.js';
import fs from "fs" 

console.log(featurelist);

// const home = fs.readFile('./index.html',()=>{
//     console.log("File Reading");
// });

const home = fs.readFileSync('./index.html',()=>{
    console.log("File Reading");
});
console.log(home); 
const server = http.createServer((req,res)=>{

    

// if(req.url==="/"){
//     res.end("<h1>Home Page</h1>")
// }

// another way of reading asynchronously using callback.
// if(req.url==="/"){
//     fs.readFile('./index.html',(err,home)=>{
//         console.log("File Reading");
//         res.end(home) 
//     });
// }

if(req.url==='/'){
    res.end(home);
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
    console.log("Server Start");
}) 