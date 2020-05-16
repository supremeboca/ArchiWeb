let Song = require('../models/songModel');
let connection = require('../db');
let songList = []

//voir les musiques de la playlist
exports.songList = function (request, response) {   
    let playid = request.params.playid; 
    connection.query("SELECT * from song where playid = ?",playid,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else { 
            response.status(200);
            songList = resultSQL;
            console.log( songList);
            response.render('songList.ejs', {songs:songList});
        }
    // })
});
}
// voir toutes les musiques 
exports.songAllList = function (request, response) {   
    let playid = request.params.playid; 

    connection.query("SELECT * from song",playid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            songAllList = resultSQL;
            console.log( songAllList);
            response.render('songAllList.ejs', {songs:songAllList});
        }
    // })
});
}
// Add a song in the list
exports.songNew =  function(request, response) {
    
    let songid = request.body.songid;
    let title = request.body.title;
    let singer = request.body.singer;
    let nalbum = request.body.nalbum;
    let userid = request.session.userid;
    let playid = request.body.playid;

    // En fonction du fait que l'on ajoute une nouvelle playlist ou que l'on clique pour update
    // l'id est une constante de -1 ou est recuperé dans le params 
    // si -1 nouveau si Existant update
    
   if( songid == -1 )
    {
        let song = new Song(title,singer,nalbum,userid,playid);
        connection.query("INSERT INTO song set ?", song, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).send(error);
                    }
                    else{
                        response.status(201).redirect('/song');
                    }
                });
    } 
    else if(songid >= 0) { 
        let song = new Song(title,singer,nalbum,userid,playid);
        console.log(song);
        connection.query("UPDATE song SET ? WHERE songid = ?", [song, request.body.songid], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/song');
            }
        });
    }
       
    
    console.log(songList);
}

// info envoyer pour le form de new song
exports.songFormAdd = function(request, response) {
    response.render('songAdd.ejs', {songid:"-1",title:"",singer:"",nalbum:"",userid:"",playid:request.params.playid});
}
// info envoyer pour l'update( recuperation du params)
exports.songFormUpdate =function (request, response) {
    let songid = request.params.songid;
    
    connection.query("Select * from song WHERE songid = ?", songid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            songs = resultSQL;
            response.render('songAdd1.ejs', {songid:songid,title:songs[0].title,singer:songs[0].singer,nalbum:songs[0].nalbum,userid:"1",playid:songs[0].playid});
        }
    });
}

exports.songRemove = function (request, response) {
    let sql = "DELETE FROM `song` WHERE `song`.`songid` = ?";
    connection.query( sql , [request.params.songid], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/song');
        }
    }); 
    
 };