// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              

// Importation des controllers
var playlistController = require('./controllers/playlistController');
var playlistApiController = require ('./controllers/playlistApiController');

// cette fonction verifier si il existe bien une session ( si login validé)
let check = (req,res, next) => {

    if( req.session && req.session.userid >= 0) {
        
        next();
    
    }
    else{
        res.send('Acces denied')
    }
};




router.get('/', (request, response) => response.redirect('/login_form'));

//  au niveau de la route playlist on voit la fonction check, celle-ci est appellée a chaque
// tentave d'accés a /Playlist
router.get('/playlist',check,playlistController.playlistList);
router.get('/playlist/add', playlistController.playlistFormAdd);
router.post('/playlist/new', playlistController.playlistNew);
router.get('/playlist/update/:playid', playlistController.playlistFormUpdate);
router.get('/playlist/delete/:playid', playlistController.playlistRemove);
// Api playlist
router.get('/api/playlist', playlistApiController.playlistList);
router.get('/api/playlist/:userid', playlistApiController.playList);
router.post('/api/playlist', playlistApiController.playlistNew);
router.put('/api/playlist/:playid', playlistApiController.playlistUpdate);
router.delete('/api/playlist/:playid',playlistApiController.playlistRemove);

// importation controllers
var songController = require('./controllers/songController');
var songApiController = require ('./controllers/songApiController');

// routes song
router.get('/song/:playid', songController.songList);
router.get('/song', songController.songAllList);
router.get('/song/add/:playid', songController.songFormAdd);
router.post('/song/new', songController.songNew);
router.get('/song/update/:songid', songController.songFormUpdate);
router.get('/song/delete/:songid', songController.songRemove);
// Api song
router.get('/api/song/:playid', songApiController.songList);
router.get('/api/song', songApiController.songAllList);
router.post('/api/song', songApiController.songNew);
router.put('/api/song/:songid', songApiController.songUpdate);
router.delete('/api/song/:songid', songApiController.songRemove);


// imporation controllers
var UserController = require('./controllers/UserController');
var UserApiController = require ('./controllers/UserApiController');

// Route user
router.get('/user', UserController.userList);
router.get('/register_form', UserController.userFormAdd);
router.post('/register_save', UserController.userNew);
router.get('/user/update/:userid', UserController.userFormUpdate);
router.get('/user/delete/:userid', UserController.userRemove);

router.get('/login_form',UserController.loginForm);
router.get("/logout",UserController.logout);

// API user
router.get('/api/user/:userid', UserApiController.userList);
router.post('/api/user', UserApiController.userNew);
router.put('/api/user/:userid', UserApiController.userUpdate);
router.delete('/api/user/:userid',UserApiController.userRemove);
module.exports = router;