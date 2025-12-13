const AWS = require('aws-sdk');
require('dotenv').config();


AWS.config.update({
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
region: process.env.AWS_REGION
});


const s3 = new AWS.S3();


async function uploadBufferToS3(buffer, key, mimeType) {
const params = {
Bucket: process.env.S3_BUCKET,
Key: key,
Body: buffer,
ContentType: mimeType,
};
return s3.upload(params).promise();
}


function getPublicUrl(key) {
// If you use a CDN, replace STATIC_URL with CDN URL
const prefix = process.env.STATIC_URL || `https://${process.env.S3_BUCKET}.s3.amazonaws.com`;
return `${prefix}/${key}`;
}


module.exports = { s3, uploadBufferToS3, getPublicUrl };
