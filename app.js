const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const methodOverride = require("method-override");

const pageControllers = require("./controllers/pageControllers");
const photoControllers = require("./controllers/photoContrellers");

const path = require("path");
const ejs = require("ejs");
const app = express();
const Photo = require("./models/Photo");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);

const port = process.env.PORT || 5000
mongoose
  .connect(
    "mongodb+srv://pcat:ObV2hQ9NgfTatRRu@cluster0.rxd3xb7.mongodb.net/pcat-db?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("DB Conneted");
  })
  .catch((error) => {
    console.log(error);
  });
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routers
app.get("/index", pageControllers.getIndexPage);
app.get("/", photoControllers.getAllPhotos);
app.get("/photos/:id", photoControllers.getPhotos);
app.post("/photos", photoControllers.createPhoto);
app.put("/photos/:id", photoControllers.updatePhoto);
app.delete("/photos/:id", photoControllers.deletePhoto);
app.get("/add", pageControllers.getAddPage);
app.get("/photos/edit/:id", pageControllers.getEditPage);

app.listen(port, (res, req) => {
  console.log(port + " port dinleniyor");
});
