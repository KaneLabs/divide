var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//To access images on aws s3 - require and config S3
//set your .env file to have AWS_SECRET_KEY_ID and AWS_SECRET_ACCESS_KEY
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var s3 = new AWS.S3();

// To upload images you need both multer and aws configured
var multer = require('multer');
var upload = multer();


router.get('/', function(req, res, next) {


// The rooturl will never change
var rootUrl = 'https://s3-us-west-2.amazonaws.com/divideyourself.com/images/'


//this is the url to display the logo
// var logoUrl = rootUrl + '1divide-logo.svg'


  // we can query the db for id then get the link to the aws s3 db where our images actually live
  knex('images').where({
    id: 1
  })
  .first()
  .then(function(data){
    console.log(data);

    //makes sure object returned isnt stored in an array wrapper
    if(Array.isArray(data)){
      data = data[0]
    }

    // this is the url to whatever is returned
    var imageURL = rootUrl + data.id + data.originalname;
    console.log(imageURL);

    res.render('index', { title: 'Express' , imageURL: imageURL});
  }).catch(function(e) {
    res.render('index', {title: 'your database is empty'});
  })
});

//configure multer in the route level middleware.
//upload.single() - req.file
//upload.array() - req.files, array of files
router.post('/', upload.single('form-name-and-multer-name-must-match'), function(req, res, next) {

  var originalName = req.file.originalname.split(' ').join('');

  //make id and name record of image in our db first
  knex('images').returning('id').insert({
    originalname: originalName,
  }).then(function(data) {
    console.log(data);

    //makes sure the id isnt stored in an array
    if(Array.isArray(data)){
      data = data[0]
    }

    //If we succesfully made an entry into the db upload the file to aws
    //set the files path to be its db id + originalname
    var params = {
      Bucket: 'divideyourself.com',
      Key: 'images/' + data + originalName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
      Metadata: {originalname: req.file.originalname, fieldname: req.file.fieldname}
    }

    //stream the file into aws
    s3.putObject(params, function(err, data){
      if (err) {
        console.log(err);
      }else{
        console.log('made record in our db and stored img in aws');
        res.redirect('/');
      }
    })

  }).catch(function (e) {
    console.log(e);
  })

});


router.get('/:username', function(req, res, next){
  res.render(':username');
});

router.get('/theboard', function(req, res, next){
  res.render('theboard')
});

router.post('/theboard', function(req, res, next){
  res.send('post to the board!');
});

router.get('/:tribe', function(req, res, next){
  res.render(':tribe');
});

router.get('/leaderboards', function(req, res, next){
  res.render('leaderboards')
});

module.exports = router;
