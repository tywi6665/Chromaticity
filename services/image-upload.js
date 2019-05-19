const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require("../keys");

aws.config.update({
    secretAccessKey: keys.s3secretaccesskey,
    accessKeyId: keys.s3accesskey,
    region: "us-east-2"
})
 
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG are accepted"), false);
  };
};
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: keys.s3bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;