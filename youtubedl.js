// https://github.com/przemyslawpluta/node-youtube-dl
const fs = require('fs');
const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');
const filePath = "./files/";

var downloadAsMP4 = function (url, filename) {
	if (!fs.existsSync(filePath)){
		fs.mkdirSync(filePath);
	}
	var video = youtubedl(url);
	
	video.on('info', function (info) {
		console.log('Download started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size);
	});

	video.pipe(fs.createWriteStream(`${filePath}/${filename}.mp4`));

	video.on('complete', function complete(info) {
		'use strict';
		console.log(`filename: ${filename}.mp4 already downloaded.`);
	});

	video.on('end', function () {
		console.log('finished downloading!');
	});
};

var downloadAsMP3 = function (url, filename) {
	if (!fs.existsSync(filePath)){
		fs.mkdirSync(filePath);
	}
	var stream = youtubedl(url);
	var saveLocation = `${filePath}/${filename}.mp3`;

	var proc = new ffmpeg({ source: stream })
		.withAudioCodec('libmp3lame')
		.toFormat('mp3')
		.saveToFile(saveLocation, function (stdout, stderr) {
			console.log('file has been converted succesfully');
		});
		proc.on('end', function() {
			console.log('finished');
		});
};



var downloadYoutube = function (url, format, filename) {
	const filepath = "./files";
	if (!fs.existsSync(filepath)){
		fs.mkdirSync(filepath);
	}
	url = "https://www.youtube.com/watch?v=" + url;
	switch (format) {
		case "MP3":
			console.log("Downloading as MP3");
			return downloadAsMP3(url, filename);
		case "MP4":
			console.log("Downloading as MP4");
			return downloadAsMP4(url, filename);
		default:
			return false;
	}
};

let youtube = {
	link : "-zHVW7Zy_vg",
	type: "MP3",
	title: "DJ Lubel,Taryn Southern,Scott Baio-WRONG HOLE"
};
downloadYoutube(youtube.link, youtube.type, youtube.title);

