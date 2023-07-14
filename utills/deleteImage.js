require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  Bucket: process.env.BUCKET_NAME    
});

const params = {
  Bucket: process.env.BUCKET_NAME,  //required /        # Put your bucket name
  Key:'filename'      //required /        # Put your file name
   
};
const s3delete = function (params) {
  return new Promise((resolve, reject) => {
    s3.createBucket({
      Bucket:process.env.BUCKET_NAME        // Put your bucket name /
    }, function () {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          console.log('Successfully deleted file from bucket');
          console.log(data);
          resolve(data);
        }
      });
    });
  });
};

module.exports = s3delete;