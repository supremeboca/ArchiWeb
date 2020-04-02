class Song {
    title ="";
    songid ="";
    singer ="";
    nalbum ="";
    cateid ="";
    playid ="";

    constructor(title,id,singer,nalbum,cateid,playid)
    {
        this.songid = id;
        this.title = title;
        this.singer = singer;
        this.nalbum = nalbum;
        this.cateid = cateid; 
        this.playid = playid;
    }
    
};

module.exports = Song;