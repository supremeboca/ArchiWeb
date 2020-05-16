let Song = require('../models/songModel');
let connection = require('../db');
let songList = []
let songAllList=[]
//voir les musiques de la playlist
exports.songList = function (request, response) {   
    let playid = request.params.playid; 
    // connection.query("SELECT * from playlist where playid = ?", playid,function (error,song){
    connection.query("SELECT * from song where playid = ?",playid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message':error});        
        }
        else {
            response.status(200);
            songList = resultSQL;
            console.log( songList);
            response.json({Song:songList});
        }
    // })
});
}
// voir toutes les musiques 
exports.songAllList = function (request, response) {   
    let playid = request.params.playid; 
    connection.query("SELECT * from song",playid ,function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message':error});         
        }
        else {
            response.status(200);
            songAllList = resultSQL;
            console.log( songAllList);
            response.json({Song:songAllList});;
        }
    // })
});
}
// Add a song in the list
exports.songNew =  function(request, response) {
    
    
    let title = request.body.title;
    let singer = request.body.singer;
    let nalbum = request.body.nalbum;
    let userid = request.body.userid;
    let playid = request.body.playid;




    
        let song = new Song(title,singer,nalbum,userid,playid);
        connection.query("INSERT INTO song set ?", song, function (error, resultSQL) {
                    console.log(resultSQL)
                    console.log("error" + error)
                    if(error) {
                        response.status(400).json({'message':error});
                    }
                    else{
                        response.status(201).json({'message':'success'});
                    }
                });   
       
    
    console.log(songList);
 }



// modifier un song
exports.songUpdate =function (request, response) {
    let songid = request.params.songid;
    let title = request.body.title;
    let singer = request.body.singer;
    let nalbum = request.body.nalbum;
    let userid = request.body.userid;
    let playid = request.body.playid;


    let song = new Song(title,singer,nalbum,userid,playid);
    connection.query("UPDATE song SET ? WHERE songid = ?", [song, songid], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {// je devrais peut etre le modifier en <= playid
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'success'}); 
        }
    });
}
// supprimer 
exports.songRemove = function (request, response) {
    let sql = "DELETE FROM `song` WHERE `song`.`songid` = ?";
    connection.query( sql , [request.params.songid], (error, resultSQL) => {
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