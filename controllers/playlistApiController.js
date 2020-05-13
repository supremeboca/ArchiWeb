let Playlist = require('../models/playlistModel');
let connection = require('../db');
let playlistList = []
let playList = []

exports.playList = function (request, response) {   
    let userid = request.params.userid; 
    
    connection.query("SELECT * from playlist where userid = ?",userid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message':error});        
        }
        else {
            response.status(200);
            playList = resultSQL;
            console.log( playList);
            response.json({Playlist:playList});
        }
    // })
});
}
// List of playlists
exports.playlistList = function (request, response) {    
    connection.query("Select * from playlist", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message':error});        
        }
        else {
            response.status(200);
            playlistList =  resultSQL;
            console.log( playlistList);
            response.json({playlists:playlistList});
        }
    });
}


exports.playlistNew =  function(request, response) {
    

    let name =  request.body.name;
    let userid = request.body.userid;


    // modify an existing one

 
        let playlist = new Playlist(name,userid);
        connection.query("INSERT INTO playlist set ?", playlist, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).json({'message':error});
                    }
                    else{
                        response.status(201).json({'message':'success'});
                    }
                });
    
       
    
    console.log(playlistList);
}

// Send form to update playlist
exports.playlistUpdate =  function(request, response) {
    let playid = request.params.playid;
    let name =  request.body.name;
    let userid = request.body.userid;

    let playlist = new Playlist(name,userid);
    console.log(playlist);
    connection.query("UPDATE playlist SET ? WHERE playid = ?", [playlist, playid], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {// je devrais peut etre le modifier en <= playid
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'updated'}); 
        }
    });


}

exports.playlistRemove = function (request, response) {
    let sql = "DELETE FROM `playlist` WHERE `playlist`.`playid` = ?";
    connection.query( sql , [request.params.playid], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message':error});
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Deleted'}); 
        }
    }); 
    
 };