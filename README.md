This is a command line node program for downloading Youtube video as MP3 || MP4 format. Enjoy. :)

# Before Use
## Install Node.js
* Install from offical website
- download link : `https://nodejs.org/en/download/`

## Install Node Dependencies
- `npm install fs youtube-dl fluent-ffmpeg`

## Install ffmpeg for Transfer Media Format
* Install in offical website
- download link : `https://www.ffmpeg.org/download.html` OR

* Install with homebrew
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

* [youtube video code] 
- is the value in query param v
- eg . -zHVW7Zy_vg for https://www.youtube.com/watch?v=-zHVW7Zy_vg

* [donwload as]
- is the target downloading format
- only support `MP3` or `MP4`

* [title]
- any valid filename for os
- eg. "enjoyThisProgram"
