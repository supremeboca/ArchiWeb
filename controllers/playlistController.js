let Playlist = require('../models/playlistModel');
let connection = require('../db');
let playlistList = []
 

// List of playlists
exports.playlistList = function (req, res) {    

    connection.query("Select * from playlist WHERE userid = ?",req.session.userid, function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            playlistList =  resultSQL;
            console.log( playlistList);
            res.render('playlistList.ejs', {playlists:playlistList});
        }
    });
}


exports.playlistNew =  function(request, response) {
    
    let playid = request.body.playid;
    let name =  request.body.name;
    let userid = request.session.userid;


    // modify an existing one

   if( playid == -1 )
{ 
        let playlist = new Playlist(name,userid);
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
    else if( playid >= 0)   
    {
        let playlist = new Playlist(name,userid);
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
    console.log(playlistList);
}

// Send form to update playlist
exports.playlistFormAdd = function(request, response) {
    response.render('playlistAdd.ejs', {playid:"-1",name:"",userid:request.params.userid});
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