var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var multer  = require('multer');
app.use(multer({ dest: './uploads/'}))

var env = process.env.NODE_ENV || 'dev';


var mongoose = require("mongoose");
if (env === 'dev') {
  
}
require('./db');
// MongoDB config
mongoose.connect(process.env.MONGO_CREDS, function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req, res) {
  res.render("index");
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('preparing the slidezies...')
});