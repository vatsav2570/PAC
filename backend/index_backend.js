const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
mongoose.set("strictQuery", false);
try {
  mongoose.connect("mongodb://0.0.0.0:27017/exam").then(() => {
    console.log("mongo connected");
  });
} catch (err) {
  console.log(err);
}
app.listen(5000, () => {
  console.log("login server running...");
});

const userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  school: String,
  state: String,
  city: String,
  standard: String,
});

const schschema = new mongoose.Schema({
  
  school: String,
  state: String,
  city: String,
  standard: String,
});

const School=new mongoose.model("school", schschema);
const User = new mongoose.model("user", userschema);

app.post("/Reg", async function (req, res) {
  console.log("ji");
  try {
    console.log("hi");
    const newuser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      height: req.body.height,
      weight: req.body.weight,
      school: req.body.school,
      state: req.body.state,
      city: req.body.city,
      standard: req.body.standard,
    });
    await newuser.save();
    console.log(newuser);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
  }
});


app.post("/sch", async function (req, res) {
  console.log("ji");
  try {
    console.log("hi");
    const newuser = new School({
      
      school: req.body.school,
      state: req.body.state,
      city: req.body.city,
      standard: req.body.standard,
    });
    await newuser.save();
    console.log(newuser);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
  }
});

