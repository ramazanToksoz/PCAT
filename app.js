const express = require("express");
const path = require("path");
const ejs = require('ejs');
const app = express();
const port = 3000;

/* const mylogger= (req,res,next) => {
  console.log("selam dunya");
  next()
} */
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
  
});
app.get("/index", (req, res) => {
  res.render("index");
  
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.listen(port, (res, req) => {
  console.log(port + " port dinleniyor");
});
