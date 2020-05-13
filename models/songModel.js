class Song {
    title ="";
    singer ="";
    nalbum ="";
    userid ="";
    playid ="";

    constructor(title,singer,nalbum,userid,playid)
    {
        
        this.title = title;
        this.singer = singer;
        this.nalbum = nalbum;
        this.userid = userid; 
        this.playid = playid;
    }
    
};

module.exports = Song;