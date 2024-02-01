require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const { connectDB } = require("./serveur/services/database");
const bodyParser = require("body-parser");
const router = require("./router");
const session = require("express-session");

const port = process.env.port;
// Configure EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your views (EJS templates) are located
app.set("views", path.join(__dirname, "client/views"));

app.use(express.static(path.join(__dirname, "client")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

connectDB().catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

// Other app configuration and routes
// ...

app.use(router);
// Start the Express server
app.listen(4000, () => {
  console.log(`Server listening on port ${port}`);
});
