## Website Performance Optimization portfolio project

Following optimization steps are taken to improve the performance of the portfolio website:

#### Build Tool
Integrated project w/ grunt task runner to minify javascript, css, html and images.

###### Uglify
Using [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify) to perform code check and compress js files.

###### CSSMin
Using [grunt-contrib-cssmin](https://www.npmjs.com/package/grunt-contrib-cssmin) to minify css files.

###### HTMLMin
Using [grunt-contrib-htmlmin](https://www.npmjs.com/package/grunt-contrib-htmlmin) to reduce html files of the project.

###### Imageoptim
[grunt-imageoptim](https://www.npmjs.com/package/grunt-imageoptim) app to make images take up less disk space and load faster. Its **ImageAlpha** option/[app](https://pngmini.com/) helps to reduces file sizes of 24-bit PNG files and **JPEGmini** [app](https://itunes.apple.com/us/app/jpegmini/id498944723) for reducing size of JPEG files.
