var express	=	require("express");
var multer	=	require('multer');
var app	=	express();
const fs = require('fs');
const mkdirp = require('mkdirp');

//Store uploaded files at ./uploads folder
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {

    const dirName = './uploads';

    mkdirp(dirName, err => callback(err, dirName));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

//Get list of uploaded files
app.get('/getList', function(req,res) {
  fs.readdir('./uploads/', (err, files) => {
    if(err) {
      const error = new Error('Error retrieving list of uploaded files.');
      error.httpStatusCode = 400
      return next(error)
    } else {
      res.send(files)
    }
  });
});

//Uploading multiple files
app.post('/uploadmultiple', upload.array('filesToUpload'), (req, res, next) => {
    const files = req.files;
 
    if (!files || files.length == 0 ) {
      const error = new Error('Error uploading the files, try uploading again.')
      error.httpStatusCode = 400
      return next(error)
    } else {
      res.end("File/Files successfully uploaded.")
    }
});

app.listen(3000,function(){
    console.log("Server is listening on port 3000...");
});