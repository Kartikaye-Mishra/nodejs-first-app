import express from "express";
import mongoose from "mongoose";
import path from "path"
import cookieParser from "cookie-parser";
const app = express();


app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

const isAuthenticated = (req,res,next)=>{
  const {token} = req.cookies;
  if (token){
    next();
  }
  else{
    res.render("login");
  }
}

// app.get("/", (req, res) => {
//   // console.log(req.cookies);
//   const {token} = req.cookies;

//   if(token){
//     res.render("logout");
//   }
//   else{
//     res.render("login");
//   }
// });

app.get("/",isAuthenticated, (req, res) => {
   res.render("logout");
  });

app.post("/login",(req,res)=>{
  res.cookie("token","iamin",{
    httpOnly:true,
    // expires: new Date(Date.now()+10*1000)
  });

  res.redirect("/")
})
app.get("/logout",(req,res)=>{
  res.cookie("token","",{
    httpOnly:true,
    expires: new Date(Date.now())
  });

  res.redirect("/")
})

app.get("/success",(req,res)=>{
  res.render("success");
})

app.listen(5000, (req, res) => {
  console.log("Server Started");
});
