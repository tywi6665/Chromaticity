const router = require("express").Router();
const express = require("express");
const upload = require("../services/image-upload");
const keys = require("../keys");
require("dotenv").config();

//Image upload route

const singleUpload = upload.single("image");

router.post("/image-upload", function(req, res) {
    singleUpload(req, res, function(err) {

        if (err) {
            return res.status(422).send({ errors: [{title: "File Upload Error",
                                                    detail: err.message }]});
        };

        return res.json({ "imageURL": req.file.location });
    });
});







// //Creating S3 client
// var client = s3.createClient({
// 	maxAsyncS3: 20, // this is the default 
// 	s3RetryCount: 3, // this is the default 
// 	s3RetryDelay: 1000, // this is the default 
// 	multipartUploadThreshold: 20971520, // this is the default (20 MB) 
// 	multipartUploadSize: 15728640, // this is the default (15 MB) 
// 	s3Options: {
// 		// Using the keys from our AWS IAM user
// 		accessKeyId: keys.s3.s3accesskey,
// 		secretAccessKey: keys.s3.s3secretaccesskey,
// 	},
// });

// app.use(fileUpload());

// // Post route to handle uploading a file
// router.post("/upload", function(req, res) {
//     console.log("AAAARGGGHHH", req.file)
//     if(!req.files) {
//         return res.status(400).send("Upload was unsuccessful");
//     }

//     var sampleFile = req.files.sampleFile;
//     var newFileName = Date.now() + req.files.sampleFile.name;
//     sampleFile.mv("uploads/" + newFileName, function(err) {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         //Upload to s3
//         var params = {
//             localFile: "uploads/" + newFileName,
//             s3Params: {
//                 Bucket: keys.s3.s3bucket,
//                 Key: newFileName,
//             },
//         };
//         var uploader = client.uploadFile(params);
//         uploader.on("error", function(err) {
//             console.error("Unable to upload:", error.stack);
//             res.status(500).send(err.stack);
//         });
//         uploader.on("end", function() {
//             console.log("Done uploading");
//             res.send("File uploaded!");
//             fs.unlink("uploads/" + newFileName)
//         })
//     })
// })

module.exports = router;