var express = require('express')
var multer = require("multer")
var bodyParser = require("body-parser")
var fs = require('fs-extra')
var path = require('path')
var dateTime = require('node-datetime')

function getDateTime() {
  var dt = dateTime.create()
  var formatted = dt.format('Y-m-d H:M:S')
  return formatted
}

var _filename = ''
var listFiles = []

fs.ensureDirSync('./Share')

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Share")
  },
  filename: function(req, file, callback) {
    _filename = file.originalname
    callback(null, _filename)
  }
})
var upload = multer({ storage: storage }).array("fileUploader", 1)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/Share'))
app.use(express.static(__dirname + '/Record'))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

app.get('/', function (req, res) {
  res.render('index.ejs', { _result: "" })
});

app.get('/files', function (req, res) {
  listFiles = []
  fs.readdirSync('./Share').map((file) => {
    listFiles.push(file)
  })

  res.json(listFiles)
});

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      } else {
        //res.status(200).contentType("text/plain").end("File uploaded!")
        res.redirect('/')
        //res.render('index.ejs', { _result: "File Uploaded!" })
      }
  });
});

app.get('/delete', function(req, res) {
  fs.unlinkSync('./Share/' + req.query._file)
  res.redirect('/')
});

app.post('/sendMsg', function(req, res) {
  var dateTime = getDateTime();
  var fileName = __dirname + '/Record/' + dateTime.split(" ")[0]
  fs.ensureFileSync(fileName)
  fs.appendFileSync(fileName, `${new Date()}:F@!M!@S:${req.body.chatname}:F@!M!@S:${req.body.msg}\nF@!!@S\n`)
  res.redirect('/')
});

app.get('/getMsgs', function(req, res) {
  listMsgs = []
  var dateTime = getDateTime();
  var fileName = __dirname + '/Record/' + dateTime.split(" ")[0]
  if (fs.existsSync(fileName)) {
    var data = fs.readFileSync(fileName).toString().split("\nF@!!@S\n")
    //data = data.reverse()
    data.map((msg) => {
      var splitMsg = msg.split(":F@!M!@S:")
      if ((new Date() - new Date(splitMsg[0])) < 600000) {
        listMsgs.push(`${splitMsg[1]}:F@!M!@S:${splitMsg[2]}:F@!M!@S:${new Date(splitMsg[0]).getHours()}:${new Date(splitMsg[0]).getMinutes()}:${new Date(splitMsg[0]).getSeconds()}`)
      }
    })
  }
  res.json(listMsgs)
});

app.listen(5110, function () {
  console.log('Node server is running..')
});
