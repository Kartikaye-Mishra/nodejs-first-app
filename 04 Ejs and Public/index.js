import express from "express";
import path from "path";

const app = express();

// For static files in public folder
app.use(express.static(path.join(path.resolve(),"public")));
// console.log(path.join(path.resolve(),"public"));
// used for serving public files like some css or js files usually


// Setting up view Engine   Use it AsItIs
app.set("view engine","ejs")

app.get("/",(req,res)=>{
//<%=locals. %> kr k object ki keys ko access kr skte h for eg:<%=locals.name %>
res.render("index",{name:"Sample Name"});// for dynamic files in views folder.
//    res.send("index")// for static files in public folder.
})

app.listen(5000,()=>{
    console.log("Server Started");
})