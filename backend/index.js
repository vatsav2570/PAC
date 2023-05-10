const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
mongoose.set("strictQuery", false);
try {
  mongoose.connect("mongodb://0.0.0.0:27017/PAC").then(() => {
    console.log("mongo connected");
  });
} catch (err) {
  console.log(err);
}
app.listen(5000, () => {
  console.log("login server running...");
});
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  phonen: String,
  password: String,
});

const reviewschema = new mongoose.Schema({
  reviewname: String,
  reviewemail: String,
  college: String,
  course: String,
  rating: String,
  pros: String,
  cons: String,
});

const User = new mongoose.model("user", userschema);
const Review = new mongoose.model("review", reviewschema);

app.post("/signup", async function (req, res) {
  //   console.log("hi");
  try {
    const user = await User.find({ email: req.body.email });
    // console.log(req.body);
    if (user == null) {
      const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      await newuser.save();
      console.log(newuser);
      res.send({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
});



// app.listen(8000, () => {
//   console.log("signup server running...");
// });

app.post("/login", async function (req, res) {
  try {
    const user = await User.find({ name: req.body.name });
    if (user != null) {
      if (req.body.password == user.password) {
        res.json(user);
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/review", async function (req, res) {
  try {
    // console.log(req.body);

    const newreview = new Review({
      reviewname: req.body.reviewname,
      reviewemail: req.body.reviewemail,
      college: req.body.college,
      course: req.body.course,
      rating: req.body.rating,
      pros: req.body.pros,
      cons: req.body.cons,
    });
    await newreview.save();
    console.log(newreview);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
  }
});

app.post("/getreview", async function (req, res) {
  try {
    // console.log(req.body);

    const data = await Review.find({});
    console.log(data);

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// app.listen(6000, () => {
//   console.log("review server running...");
// });

const EngSchema = mongoose.Schema({
  collegename: String,
  city: String,
  state: String,
  course: String,
  years: Number,
  fees: Number,
  type: String,
  salary: Number,
  exam: String,
});

const Engineering = mongoose.model("Engineering", EngSchema);

app.post("/eng", async (req, res) => {
  try {
    console.log(req.body);
    const college = await Engineering.create(req.body);
    res.status(200).json(college);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/engg", async function (req, res) {
  try {
    // console.log(req.body);

    const data = await Engineering.find({});
    console.log(data);

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

const MedSchema = mongoose.Schema({
  collegename: String,
  city: String,
  state: String,
  course: String,
  years: Number,
  fees: Number,
  type: String,
  salary: Number,
  exam: String,
});

const Medical = mongoose.model("Medical", EngSchema);

app.post("/med", async (req, res) => {
  try {
    console.log(req.body);
    const college = await Medical.create(req.body);
    res.status(200).json(college);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/medd", async function (req, res) {
  try {
    // console.log(req.body);

    const data = await Medical.find({});
    console.log(data);

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
