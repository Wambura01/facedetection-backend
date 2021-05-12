const express = require("express");
const bodyParser = require("body-parser"); //to parse json from client side
const bcrypt = require("bcrypt-nodejs"); //to encrypt user passwords
const cors = require("cors");
const knex = require("knex");

//controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//enable connection to our db
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "smartphon96",
    database: "facedetectiondb",
  },
});

const app = express(); //creating our backend app
app.use(bodyParser.json());
app.use(cors()); //allow the client side access

app.get("/", (req, res) => {
  res.send(database.users);
});

//post request for signin
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt); //dependency injection
});

//post request for register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt); //dependency injection
});

//to get user
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db); //dependency injection
});

//to update user entries
app.put("/image", (req, res) => {
  image.handleImage(req, res, db); //dependency injection
});

//app listens to the port
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
