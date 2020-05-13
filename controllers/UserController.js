let User = require('../models/UserModel');
let connection = require('../db');
let userList = []




// List of users
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
    


    // modify an existing one

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

// Send form to update user
exports.userFormAdd = function(request, response) {
    response.render('register.ejs', {userid:"-1",name:"",Firstname:"",Password:"",Email:""});
}

// Send user form update
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
    //  let Password ="";
     if (req.cookies && req.cookies.Email)
     Email = req.cookies.Email;
    //  Password = req.cookies.Password;
    response.render('login_form.ejs', {Email: Email});
}

exports.logout = function (req, res) {
    // Email = req.cookies.Email;
    // userid = req.session.userid;
    if (req.session.userid
        //  && req.cookies.Email
        ){
    req.session.destroy()
    res.clearCookie();
    res.send("Logout success! ");
    }
}

