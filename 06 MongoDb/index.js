import express from "express";
import mongoose from "mongoose";
import path from "path"
const app = express();

// const userInfo = [];

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

  const messageSchema = new mongoose.Schema({
    userName : String,
    userEmail : String
  })

  const Message = mongoose.model("Message",messageSchema)

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Hello")
  res.render("index");
});


// app.get("/add",async (req,res)=>{

//  await Message.create({userName:"PQR",userEmail:"sample2@gamil.com"})

//  res.send("Nice");

// }
// )


app.post("/contact",async (req,res)=>{

//  await Message.create({
//   userName:req.body.name,
//   userEmail:req.body.email
// })

const {name,email } = req.body
console.log(req.body);


 await Message.create({
  userName : name,
  userEmail : email
})
console.log(name,email);
  res.redirect("success")
})

app.get("/success",(req,res)=>{
  res.render("success");
})

app.listen(5000, (req, res) => {
  console.log("Server Started");
});
