let express = require('express');
let app = express();
// Import body parser
let bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('css'));



"****************************************************************************************"
let connection = require('./db');

let session =  require('express-session');



app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
    })
);

// Cette partie permet de verifier si l'utilisateurs existe dans la DB et qu'il y a bien un match entre les info( Email et pass) 
app.post('/login', (req,res) => {
    var Email = req.body.Email;
    var Password = req.body.Password;
 if(Email && Password) {
    connection.query("Select * FROM user WHERE Email = ? AND Password = ?",[Email,Password], function (error,results) { 
        
        if(results.length > 0) {
            console.log(results[0].userid)
            req.session.userid = results[0].userid;
            req.session.Email = Email;
            res.cookie('Email',req.body.Email);
            res.redirect('/playlist')
            return
           
            
        }
      
    else{
        res.send("Login failed ! <a href='/login_form'>Try again</a> ");
    }});
    } });


    let router = require('./routes');
    app.use('/', router);
    
    
    var port = 8003
    app.listen(port, function () { console.log('Running server on port ' + port); })






