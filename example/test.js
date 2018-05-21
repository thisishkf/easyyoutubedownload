const { download } = require('../index');

let options = {
	link: "sgbvcfo59NA",
	type: "MP3",
	title: "Pierce",
	artist: "ONE OK ROCK"
};
download.setDownloadPath("mp3", __dirname + "/../files/mp3");
download.setDownloadPath("mp4", __dirname + "/../files/mp4");

download(options, function(res){
	console.log(res);
})