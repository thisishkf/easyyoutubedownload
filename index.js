const { downloadYoutube } = require('./lib/youtubedl');
var config = {
	path: {
		mp3: __dirname + "/files/mp3",
		mp4: __dirname + "/files/mp4"
	}
};

/**
 * 
 * @param {Object} options { link : String , type : String , title : String, atrist : String}
 */
const _download = function (options = null, callback = function () { }) {
	if (options == null || !('link' in options)) {
		callback(false);
	}
	downloadYoutube(options, config, callback);
}

const _setDownloadPath = function (key = "", value = "") {
	if (!(key in config.path))
		return false;
	config.path[key] = value;
	return true;
}

const _getConfig = function () {
	return config;
}

module.exports = {
	download: _download,
	setDownloadPath: _setDownloadPath,
	getConfig: _getConfig
}