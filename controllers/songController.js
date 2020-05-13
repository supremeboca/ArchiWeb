let Song = require('../models/songModel');
let connection = require('../db');
let songList = []
// List of songs
// exports.songList = function (request, response) {   
//     let playid = request.params.playid; 
//     connection.query("Select * from `song` JOIN `playlist` ON `song`.`playid` = `playlist`.`playid`",playid ,function (error, resultSQL) {
//         if (error)  {
//             response.status(400).send(error);        
//         }
//         else {
//             response.status(200);
//             songList = resultSQL;
//             console.log( songList);
//             response.render('songList.ejs', {songs:songList});
//         }
//     });
// }
//voir les musiques de la playlist
exports.songList = function (request, response) {   
    let playid = request.params.playid; 
    // connection.query("SELECT * from playlist where playid = ?", playid,function (error,song){
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
    // connection.query("SELECT * from playlist where playid = ?", playid,function (error,song){
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


    // modify an existing one

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


exports.songFormAdd = function(request, response) {
    response.render('songAdd.ejs', {songid:"-1",title:"",singer:"",nalbum:"",userid:"",playid:request.params.playid});
}

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