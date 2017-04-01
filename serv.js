var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var mongoDB = require('./js/query.js');

var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, (__dirname+'/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

var upload = multer({ storage: storage })

var urlencodedParser = bodyParser.urlencoded({ extended : false });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.static('web'));
app.use(bodyParser.urlencoded({ extended: true }));

//GET

//ARRIVE ON WEBSITE
app.get('/menu', function(req, res){
  res.sendFile( __dirname  + 'views/menu.ejs');
  res.render('menu.ejs', {
    results : null, importStat : false
  });
});

//POST

app.post('/update', upload.single('dataset'),  function(req, res) {
  fs.readFile(__dirname + '/uploads/dataset', 'utf8', function(err, data){
    var importAnswer = true;
    if (err) {
      return console.log(err);
    }
    var arr = data.split("\n");

    mongoDB.insert(arr, function(valid){
      if(valid=='bad')importAnswer = "notvalid";
      res.render('menu.ejs', {results : null, importStat : importAnswer});
    });

  });
});

app.post('/menu', function(req, res){

  var data = {name: req.body.name, business: req.body.business_line, LTyear: req.body.range_high_founded_year, GTYear: req.body.range_low_founded_year, GTMoney: req.body.raised_money_low, LTMoney: req.body.raised_money_high}

  mongoDB.findData(data, function(result){
    res.render('menu.ejs', {
      results : result, importStat : false
    });
  });

});

var server = app.listen(3200, function () {
  var port = '3200';
  console.log("Server listening at http://localhost:%s", port)
})
