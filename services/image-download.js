const aws = require('aws-sdk');
const keys = require("../keys");

aws.config.update({
    secretAccessKey: keys.s3.s3secretaccesskey,
    accessKeyId: keys.s3.s3accesskey,
    region: "us-east-2"
});

const s3 = new aws.S3();

const params = {
    Bucket: keys.s3.s3bucket,
    EncodingType: "url"
};

const download = function () {
    s3.listObjectsV2(params, function (err, data) {
        if (err) throw err;
        console.log(data.Contents)
        return data;
            //     var stuff = data.Contents;
            //    return stuff.forEach((thing) => console.log(thing.Key))
    });
};

module.exports = download;