import express from "express";
import mongoose from "mongoose";
import path from "path"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    email:String,
    password:String
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

    res.render("logout",{name:req.user.name});
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email})

if(!user){
    
    console.log("Register First");
    res.redirect("/register")
}

else{

    // let is_match = password===user.password;
    let is_match = await bcrypt.compare(password,user.password);
    console.log(is_match);
    if(!is_match){
        res.render("login",{email,message:"Incorrect Password"});
    }
    else{
    let token = jwt.sign({_id:user._id},"RANDOMSECRETCODE");
    res.cookie("token",token,{
        httpOnly:true,
    })
    res.redirect("/");
}
}
})
app.post("/register",async(req,res)=>{
    
    const {name,email,password} = req.body;
let user = await User.findOne({email})

if(user){
    
    console.log("User Already Exist");
    res.redirect("/login")
}
else{
    const hashed_password = await bcrypt.hash(password,10);
 user = await User.create({
        name:name,
        email:email,
        password:hashed_password 
    });

const token = jwt.sign({_id:user._id},"RANDOMSECRETCODE");


    res.cookie("token",token,{
        httpOnly:true,
    })
    res.redirect("/");}
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