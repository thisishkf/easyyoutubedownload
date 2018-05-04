const fs = require('fs');
const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');
const ffmetadata = require("ffmetadata");
const assert = require('assert');

const ERR_DOWNLOAD_MP3 = new Error("Fail to download mp3");
const ERR_WRITE_META = new Error("Fail to wrtie metadata");


const _downloadAsMP4 = function (url, filename, artist, mp4FilePath) {
	return new Promise((resolve, reject) => {
		try {
			if (!fs.existsSync(mp4FilePath)) {
				fs.mkdirSync(mp4FilePath);
			}
			let video = youtubedl(url);

			video.on('info', function (info) {
				console.log('Download started');
				console.log('filename: ' + info._filename);
				console.log('size: ' + info.size);
			});
			var saveLocation = `${mp4FilePath}/${filename}.mp4`;
			video.pipe(fs.createWriteStream(saveLocation));

			video.on('complete', function (info) {
				console.log(info);
				console.log(`filename: ${filename}.mp4 already downloaded.`);
			});

			video.on('end', function () {
				let data = { artist: artist, title: filename };
				ffmetadata.write(saveLocation, data, function (err) {
					if (err)
						throw ERR_WRITE_META;
					else
						resolve(true);
				});
			});
		} catch (err) {
			console.log(`Error: [_downloadAsMP4] ${err}`);
			reject(false);
		}
	});

};

const _downloadAsMP3 = function (url, filename, artist, mp3FilePath) {
	return new Promise((resolve, reject) => {
		try {
			if (!fs.existsSync(mp3FilePath)) {
				fs.mkdirSync(mp3FilePath);
			}
			var stream = youtubedl(url);
			var saveLocation = `${mp3FilePath}/${filename}.mp3`;

			var proc = new ffmpeg({ source: stream })
				.withAudioCodec('libmp3lame')
				.toFormat('mp3')
				.saveToFile(saveLocation, function (stdout, stderr) {
					console.log('file has been converted succesfully');
				});

			proc.on('end', function () {
				var data = { artist: artist, title: filename };
				ffmetadata.write(saveLocation, data, function (err) {
					if (err)
						throw ERR_WRITE_META;
					else
						resolve(true);
				});
			});
		} catch (err) {
			console.log(`Error: [_downloadAsMP3] ${err}`);
			reject(false);
		}
	});
};

var _downloadYoutube = function (options, config, callback) {
	let { link, type, artist, title } = options;
	link = "https://www.youtube.com/watch?v=" + link;
	switch (type) {
		case "MP3":
			_downloadAsMP3(link, title, artist, config.path.mp3)
				.then(res => callback(res))
				.catch(res => callback(res));
				break;
		case "MP4":
			_downloadAsMP4(link, title, artist, config.path.mp4)
				.then(res => callback(res))
				.catch(res => callback(res));
				break;
		default:
			callback(false);
	}
};

module.exports = {
	downloadYoutube: _downloadYoutube
};




