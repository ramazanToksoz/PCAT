const Photo = require("../models/Photo");
const fs = require("fs");

exports.getAllPhotos = async (req, res) => {
  
  const page = req.query.page || 1
  const photoPerPage = 2;
  const totalPhoto = await Photo.find().countDocuments();
  
  const photos = await Photo.find().sort("-dateCreate").skip((page-1)*photoPerPage).limit(photoPerPage)

  res.render("index", { photos ,
    current:page,
    pages:Math.ceil(totalPhoto/photoPerPage)
  });
};
exports.getPhotos = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  res.render("photo", { photo });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
  });
  res.redirect("/");
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.desc = req.body.desc;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};
exports.deletePhoto = async (req, res) => {
  const deletePhoto = await Photo.findOne({ _id: req.params.id });
  const deletePath = __dirname + "/../public" + deletePhoto.image;
  fs.unlinkSync(deletePath);

  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
