const { download } = require('./index');

let options = {
	link: "sgbvcfo59NA",
	type: "MP3",
	title: "Pierce",
	artist: "ONE OK ROCK"
};

download(options, function(res){
	console.log(res);
})