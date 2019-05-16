const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require("../keys");

aws.config.update({
    secretAccessKey: keys.s3.s3secretaccesskey,
    accessKeyId: keys.s3.s3accesskey,
    region: "us-east-2"
})
 
const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.s3.s3bucket,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;