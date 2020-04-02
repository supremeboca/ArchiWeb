let Playlist = require('../models/playlistModel');
let connection = require('../db');
let playlistList = []

// List of playlists
exports.playlistList = function (request, response) {    
    connection.query("Select * from playlist", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            playlistList =  resultSQL;
            console.log( playlistList);
            response.render('playlistList.ejs', {playlists:playlistList});
        }
    });
}


exports.playlistNew =  function(request, response) {
    
    let playid = request.body.playid;
    let name =  request.body.name;
    let userid = "1";


    // modify an existing one

   if( playid <= playid.length )
    {
        let playlist = new Playlist(name,playid,userid);
        console.log(playlist);
        connection.query("UPDATE playlist SET ? WHERE playid = ?", [playlist, request.body.playid], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/playlist');
            }
        });
    } 
    // Add one
    else { 
        let playlist = new Playlist(name,playid,userid);
        connection.query("INSERT INTO playlist set ?", playlist, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).send(error);
                    }
                    else{
                        response.status(201).redirect('/playlist');
                    }
                });
    }
       
    
    console.log(playlistList);
}

// Send form to update playlist
exports.playlistFormAdd = function(request, response) {
    response.render('playlistAdd.ejs', {playid:playlistList.length + 1,name:"",userid:""});
}

// Send playlist form update
exports.playlistFormUpdate =function (request, response) {
    let playid = request.params.playid;

    connection.query("Select * from playlist WHERE playid = ?", playid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            playlists = resultSQL;
            response.render('playlistAdd.ejs', {playid:playid, name:playlists[0].name, userid:playlists[0].userid});
        }
    });
}

exports.playlistRemove = function (request, response) {
    let sql = "DELETE FROM `playlist` WHERE `playlist`.`playid` = ?";
    connection.query( sql , [request.params.playid], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/playlist');
        }
    }); 
    
 };