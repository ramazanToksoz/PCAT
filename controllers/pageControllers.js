const Photo = require('../models/Photo');
exports.getAddPage = (req, res) => {
    res.render("add");}

exports.getEditPage= async (req, res) => {
    const photoEdit = await Photo.findOne({ _id: req.params.id });
    res.render("edit", { photoEdit });
  }

exports.getIndexPage=async(req,res)=>{
    res.redirect("/");
}  