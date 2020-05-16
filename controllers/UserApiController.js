let User = require('../models/UserModel');
let connection = require('../db');
let userList = []

// List of playlists
exports.userList = function (request, response) {   
    
    // connection.query("SELECT * from playlist where playid = ?", playid,function (error,song){
        connection.query("Select * from user where userid = ?",request.params.userid, function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message':error});        
        }
        else {
            response.status(200);
            userList = resultSQL;
            console.log( userList);
            response.json({User:userList});
        }
    // })
});
}

// ajouter un nouvelle utilisateur 
exports.userNew =  function(request, response) {
    

    
    let name =  request.body.name;
    let Firstname = request.body.Firstname
    let Email = request.body.Email;
    let Password = request.body.Password;

   

 
        let user = new User(name,Firstname,Email,Password);
        connection.query("INSERT INTO user set ?", user, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).json({'message':error});
                    }
                    else{
                        response.status(201).json({'message':'success'});
                    }
                });
    
       
    
    console.log(userList);
}

// pour updater un utilisateur existant 
exports.userUpdate =  function(request, response) {
    let userid = request.params.userid;
    let name =  request.body.name;
    let Firstname = request.body.Firstname
    let Email = request.body.Email;
    let Password = request.body.Password;

    let user = new User(name,Firstname,Email,Password)
    console.log(user);
    connection.query("UPDATE user SET ? WHERE userid = ?", [user, userid], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'success'}); 
        }
    });


}

exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `user` WHERE `user`.`userid` = ?";
    connection.query( sql , [request.params.userid], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message':error});
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'success'}); 
        }
    }); 
    
 };