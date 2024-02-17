import express from "express";
import path from "path";

const app = express();

let userInfo = [];

// Using Middleware
    app.use(express.static(path.join(path.resolve(), "public")));
    app.use(express.urlencoded({ extended: true }));// for getting data into userInfo
    
    app.set("view engine", "ejs");
    
    app.get("/", (req, res) => {
      res.render("index");
    });
    
    app.post("/contact", (req, res) => {
      console.log(req.body);
      userInfo.push({ userName: req.body.name, userEmail: req.body.email });
      res.redirect("/success");
    });
    
    app.get("/success", (req, res) => {
      res.render("success");
    });
    
    app.get("/users", (req, res) => {
      res.json({
        userInfo,
      });
    });
    
    app.listen(5000, () => {
      console.log("Server Start.");
    });
