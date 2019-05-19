require("dotenv").config();

module.exports = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    s3bucket: process.env.S3_BUCKET,
	s3accesskey: process.env.S3_ACCESSKEY,
	s3secretaccesskey: process.env.S3_SECRETACCESSKEY
};


