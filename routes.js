// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              

// Import contact controller
var playlistController = require('./controllers/playlistController');
var playlistApiController = require ('./controllers/playlistApiController');

router.get('/', (request, response) => response.redirect('/playlist'));

router.get('/playlist', playlistController.playlistList);
router.get('/playlist/add', playlistController.playlistFormAdd);
router.post('/playlist/new', playlistController.playlistNew);
router.get('/playlist/update/:playid', playlistController.playlistFormUpdate);
router.get('/playlist/delete/:playid', playlistController.playlistRemove);

router.get('api/playlist', playlistApiController.playlistList);
router.post('api/playlist', playlistApiController.playlistNew);
router.put('api/playlist/:playid', playlistApiController.playlistUpdate);
router.delete('api/playlist/:playid',playlistApiController.playlistRemove);

var songController = require('./controllers/songController');

router.get('/', (request, response) => response.redirect('/song'));

router.get('/song/:playid', songController.songList);
router.get('/song', songController.songAllList);
router.get('/song/:playid/add', songController.songFormAdd);
router.post('/song/new', songController.songNew);
router.get('/song/update/:songid', songController.songFormUpdate);
router.get('/song/delete/:songid', songController.songRemove);

 module.exports = router;