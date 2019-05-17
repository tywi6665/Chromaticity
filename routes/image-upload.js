const router = require("express").Router();
const upload = require("../services/image-upload");
require("dotenv").config();

//Image upload route

const singleUpload = upload.single("image");

router.post("/image-upload", function (req, res) {
    singleUpload(req, res, function (err) {

        if (err) {
            return res.status(422).send({
                errors: [{
                    title: "File Upload Error",
                    detail: err.message
                }]
            });
        };

        return res.json({ "imageURL": req.file.location });
    });
});

module.exports = router;