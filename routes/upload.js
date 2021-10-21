var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'uploads/'})
var fs = require('fs');
require('dotenv').config();

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESSKEY
const secretAccessId = process.env.AWS_PRIVATE_KEY

const aws = require('aws-sdk');

aws.config.update({
    region:'ap-southeast-1',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessId
});

const s3 = new aws.S3({
    accessKeyId,
    secretAccessId,
    region,
});




//upload file
function uploadFile(file){
    
    const fileStream = fs.readFileSync(file.path)

    const uploadParam = {
        Bucket : bucketName,
        Body : fileStream,
        Key: file.filename
    }
  
    s3.upload(uploadParam, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });
  };

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('upload')
});

router.get('/images', function(req, res, next) {
    res.render('upload')
  });

router.post('/', upload.single('myFile'), (req, res, next) => {

    const file = req.file
    result =   uploadFile(file)
   
    res.render('upload')
})

module.exports = router;
