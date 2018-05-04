# NPM repository
https://www.npmjs.com/package/easyyoutubedownload

# downloadYoutube
This is a command line node program for downloading Youtube video as MP3 || MP4 format. Enjoy. :)

# Before Use
## Install Node.js
As this is a node program, Node.js must be included.
Please Install the [Latest Current Version] for Node.js

* Install from offical website
- download link : `https://nodejs.org/en/download/`

## Install Node Dependencies
- `npm install fs youtube-dl fluent-ffmpeg ffmetadata`

## Install ffmpeg for Transfer Media Format
### Install in offical website
- download link : `https://www.ffmpeg.org/download.html`

### Install with homebrew
- brew install libvpx
- brew install ffmpeg --with-libvpx
 
# Config your own program
1. Change the download destination 
- const filePath = "./files/";
2. Fill in the target Youtube video inforamtion 
- let youtube = {
	link : [youtube video code] ,
	type: [donwload as],
	title : [title]
};

2.1 [youtube video code] 
- is the value in query param v
- eg . `-zHVW7Zy_vg` for https://www.youtube.com/watch?v=-zHVW7Zy_vg

2.2 [donwload as]
- is the target downloading format
- only support `MP3` or `MP4`

2.3 [title]
- any valid filename for os
- eg. "enjoyThisProgram"

# Run the program
Run `node youtubedl.js` OR `npm start` to run the program.
