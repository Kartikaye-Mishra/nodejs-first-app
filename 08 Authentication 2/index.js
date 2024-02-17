import express from "express";
import mongoose from "mongoose";
import path from "path"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = new mongoose.Schema({
    name:String,
    email:String
}) 

const User = mongoose.model("User",userSchema);

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine","ejs");

const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    if(token){

        const decoded = jwt.verify(token,"RANDOMSECRETCODE")
        req.user = await User.findById(decoded._id);// assigning a new property on req object//key-value me jo dot lgate h vo
        next();
    }
    else{
        res.render("login");
    }
}

app.get("/",isAuthenticated,(req,res)=>{

    console.log(req.user);
    res.render("logout",{name:req.user.name});
})

app.post("/login",async(req,res)=>{
    

    const {name,email} = req.body;

   const user = await User.create({
        name:name,
        email:email
    });

const token = jwt.sign({_id:user._id},"RANDOMSECRETCODE");
// console.log(token);

    res.cookie("token",token,{
        httpOnly:true,
    })
    res.redirect("/");
})

app.get("/logout",(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    res.redirect("/")
})

app.listen(5000,(req,res)=>{
    console.log("Server has been Started");
})