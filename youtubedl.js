const fs = require('fs');
const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');
const mp4FilePath = "./files/mp4";
const mp3FilePath = "./files/mp3";
const ffmetadata = require("ffmetadata");

var downloadAsMP4 = function (url, filename, artist) {
	if (!fs.existsSync(mp4FilePath)) {
		fs.mkdirSync(mp4FilePath);
	}
	var video = youtubedl(url);

	video.on('info', function (info) {
		console.log('Download started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size);
	});

	video.pipe(fs.createWriteStream(`${mp4FilePath}/${filename}.mp4`));

	video.on('complete', function (info) {
		console.log(info);
		console.log(`filename: ${filename}.mp4 already downloaded.`);
	});

	video.on('end', function () {
		var data = {
			artist: artist,
			title:filename
		};
		ffmetadata.write(saveLocation, data, function (err) {
			if (err)
				console.error("Error writing metadata", err);
			else
				console.log('finished');
		});
	});
};

var downloadAsMP3 = function (url, filename, artist) {
	if (!fs.existsSync(mp3FilePath)) {
		fs.mkdirSync(mp3FilePath);
	}
	var stream = youtubedl(url);
	var saveLocation = `${mp3FilePath}/${filename}.mp3`;

	var proc = new ffmpeg({source: stream})
					.withAudioCodec('libmp3lame')
					.toFormat('mp3')
					.saveToFile(saveLocation, function (stdout, stderr) {
						console.log('file has been converted succesfully');
					});

	proc.on('end', function () {
		var data = {
			artist: artist,
			title:filename
		};
		ffmetadata.write(saveLocation, data, function (err) {
			if (err)
				console.error("Error writing metadata", err);
			else
				console.log('finished');
		});
	});
};



var downloadYoutube = function (config) {
	let {link, type, artist, title} = config;
	console.log(`${link}, ${type}, ${artist}, ${title}`);

	link = "https://www.youtube.com/watch?v=" + link;
	let filename = title;
	switch (type) {
		case "MP3":
			console.log("Downloading as MP3");
			return downloadAsMP3(link, filename, artist);
		case "MP4":
			console.log("Downloading as MP4");
			return downloadAsMP4(link, filename, artist);
		default:
			return false;
	}
};

let youtube = {
	link: "sgbvcfo59NA",
	type: "MP3",
	title: "Pierce",
	artist: "ONE OK ROCK"
};
downloadYoutube(youtube);

