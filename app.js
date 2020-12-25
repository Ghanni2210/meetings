const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost:27017/meetings");

require('./models/meetings');
app.use('/', require('./routes/index'))

var server = app.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + server.address().port);
});
