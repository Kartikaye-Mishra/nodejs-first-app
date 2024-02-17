import express  from "express";
import path from "path";
const app = express();

app.get('/',(req,res)=>{
    const pathlocation = path.resolve();
    // console.log(path.join(pathlocation,"./index.html"));
    res.sendFile(path.join(pathlocation,"./index.html"));
})

// SAmple api
 app.get("/getProducts",(req,res)=>{
    res.send({
        status:"success",
        name:"Helllo",
        Products:["P1","P2","P3",". . . ","Pn"]
    })
 })

app.listen(5000,()=>{
    console.log("Server is running");
})