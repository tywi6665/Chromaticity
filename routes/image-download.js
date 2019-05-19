const router = require("express").Router();
// const download = require("../services/image-download");
const aws = require('aws-sdk');
const keys = require("../keys");
require("dotenv").config();

//Image download route

router.get("/image-download", function (req, res) {

    aws.config.update({
        secretAccessKey: keys.s3secretaccesskey,
        accessKeyId: keys.s3accesskey,
        region: "us-east-2"
    });

    const s3 = new aws.S3();

    const params = {
        Bucket: keys.s3bucket,
        EncodingType: "url"
    };

    s3.listObjectsV2(params, function (err, data) {
        if (err) throw err;
        return res.json(data.Contents);
    });

});

module.exports = router;