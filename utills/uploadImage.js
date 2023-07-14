require('dotenv').config();
const CONSTANTS = require('./constants');
//const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.AWS_REGION
});
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.BUCKET_NAME }`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    ACL: 'public-read' ,
    metadata: function (req, file, cb) {
      console.log('file',file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const newFileName = `${Date.now()  }-${  file.originalname}`;
      const fullPath = CONSTANTS.IMAGE_PATH + newFileName;
      cb(null,fullPath);
    }
  })
});


// const s3 = new S3Client();
// const upload2 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       const newFileName = `${Date.now()  }-${  file.originalname}`;
//       const fullPath = CONSTANTS.IMAGE_PATH + newFileName;
//       cb(null,fullPath);
//     }
//   })
// });


// app.post('/upload', upload.single('image'), function(req, res, next) {
//   console.log(req.file,req.file.location)
//   res.json({message:'Successfully uploaded ',imageUrl:req.file.location})
// })


module.exports = upload;