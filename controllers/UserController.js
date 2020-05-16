let User = require('../models/UserModel');
let connection = require('../db');
let userList = []




// afficher un utilisateur spéecifique via son userid
exports.userList = function (request, response) {    
    connection.query("Select * from user where userid = ?",request.session.userid, function (error, resultSQL) {//le modifier pour afficher que le user
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            userList =  resultSQL;
            console.log( userList);
            response.render('userList.ejs', {users:userList});
        }
    });
}


exports.userNew =  function(request, response) {
    
    
    let userid = request.body.userid;
    let name =  request.body.name;
    let Firstname = request.body.Firstname
    let Email = request.body.Email;
    let Password = request.body.Password;
    


    // En fonction du fait que l'on ajoute une nouvelle playlist ou que l'on clique pour update
    // l'id est une constante de -1 ou est recuperé dans le params 
    // si -1 nouveau si Existant update

    if( userid == -1 )
    {
        let user = new User(name,Firstname,Email,Password);
        connection.query("INSERT INTO user set ?", user, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).send(error);
                    }
                    else{
                        response.send('user created !   <a href="/login_form">Connect yourself and Enjoy</a> ');
                    }
                }); 
            }
                else if( userid >= 0)   
                {
                    let user = new User(name,Firstname,Email,Password);
                    console.log(user);
                    connection.query("UPDATE user SET ? WHERE userid = ?", [user, request.session.userid], function (error, resultSQL) {
                        if(error) {
                        response.status(400).send(error);
                        }
                        else{
                            response.status(202).redirect('/playlist');
                        }
                    });
                } 
       
    
    console.log(userList);
}

// info pour le form the register
exports.userFormAdd = function(request, response) {
    response.render('register.ejs', {userid:"-1",name:"",Firstname:"",Password:"",Email:""});
}

// info pour le form de l'update avec le params 
exports.userFormUpdate =function (request, response) {
    let userid = request.session.userid;

    connection.query("Select * from user WHERE userid = ?", userid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            response.render('register.ejs', {userid:userid, name:users[0].name, Firstname:users[0].Firstname,Password:users[0].Password,Email:users[0].Email});
        }
    });
}

exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `user` WHERE `user`.`userid` = ?";
    connection.query( sql , [request.params.userid], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/login_form');
        }
    }); 
    
 };


 
 
 exports.loginForm = function(req, response) {
     let Email = "";

     if (req.cookies && req.cookies.Email)
     Email = req.cookies.Email;

    response.render('login_form.ejs', {Email: Email});
}

// des qu'il existe un session cette fonction la detruit et envoie "logout success"
exports.logout = function (req, res) {
 
    if (req.session.userid
        ){
    req.session.destroy()
    res.clearCookie();
    res.send("Logout success! Revenez-nous vite");
    }
}

