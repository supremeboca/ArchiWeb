let express = require('express');
let app = express();
// Import body parser
let bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static("css"));

let router = require('./routes');
app.use('/', router);


var port = 8003
app.listen(port, function () { console.log('Running server on port ' + port); })

