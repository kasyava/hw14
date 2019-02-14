const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Album = require("../models/Album");

const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get("/:id", (req, res) => {

    Album.findOne({_id: req.params.id}).populate('artist')
        .then(results => res.send(results))
        .catch(e => res.send(e).status(400));

});

router.get("/", (req, res) => {

    if(req.query.artist){
        Album.find({artist: req.query.artist}).populate('artist')
            .then(results => res.send(results))
            .catch(e => res.send(e).status(400));
    }
    else {
        Album.find().populate('artist')
            .then(results => res.send(results))
            .catch(e => res.send(e).status(400))
    }
});


router.post("/", [auth, permit('admin'), upload.single("image")], (req, res) => {
    console.log(req.body);

    const data = req.body;
    if (req.file) data.image = req.file.filename;


    const album = new Album(data);
    album.save()
        .then((result) => res.send(result))
        .catch(error => res.send(error).status(400));

});

router.delete("/:id", [auth, permit('admin')], (req, res) => {
    console.log(req.params.id);
    Album.deleteOne({_id: req.params.id})
        .then(result => res.send(result))
        .catch((e) => res.send(e).status(500));
});


module.exports = router;