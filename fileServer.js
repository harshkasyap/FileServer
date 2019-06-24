var express = require('express');
var multer = require("multer");
var bodyParser = require("body-parser");
var fs = require('fs-extra');
var path = require('path');
var _filename = '';
var listFiles = []

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Share");
  },
  filename: function(req, file, callback) {
    _filename = file.originalname;
    callback(null, _filename);
  }
});
var upload = multer({ storage: storage }).array("fileUploader", 1);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/Share'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index.ejs', { _result: "" });
});

app.get('/files', function (req, res) {
  listFiles = []
  fs.readdirSync('./Share').map((file) => {
    listFiles.push(file);
  });

  res.json(listFiles);
});

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      } else {
        //res.status(200).contentType("text/plain").end("File uploaded!");
        res.render('index.ejs', { _result: "File Uploaded!" });
      }
  });
});

app.listen(5110, function () {
  console.log('Node server is running..');
});