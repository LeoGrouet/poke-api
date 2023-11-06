const express = require("express");
const path = require("path");
const app = express();
const router = require("./router");

const port = 4000;
// Configure EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your views (EJS templates) are located
app.set("views", path.join(__dirname, "client/views"));

// Other app configuration and routes
// ...
app.use(router);
// Start the Express server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
