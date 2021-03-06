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



#### CRP of index.html
1. Grunt tasks to minify js, css, html and images.
2. Commented out googleapi fonts link.
3. Inline CSS.
4. Move js script tag end of body.

Pagespeed score:
Desktop: 93
Mobile: 96
![](https://cloud.githubusercontent.com/assets/6732675/12636366/0fecd1da-c541-11e5-9b25-fc53f8274790.png)



#### Framerate for pizza.html
* Reduce for loop count from 200 to only visible pizza images visible on screen. This is achieved by getting user's screen height and Math.ceil().
```
document.addEventListener('DOMContentLoaded', function() {
    var cols = 8;
    var s = 256;

    // cal no. of rows needed depending upon the screen height
    var rows = Math.ceil(window.screen.availHeight / s);

    // depending upon the rows and cols, we will cal 'for' loop count
    var loopCount = rows * cols;

    // reduced for loop from 200 to what ever
    // user screen is
    for (var i = 0; i < loopCount; i++) {
        var elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        document.querySelector("#movingPizzas1").appendChild(elem);
    }
    updatePositions();
});
```
* Using .getElementsByClassName() instead of .querySelectorAll() because it is much more efficient.
* Moving out ```document.body.scrollTop / 1250``` calculation out of for loop because this calculation needs to be done only once in updatePositions().
* Creating lookup table for `phase` by using Map() datastructure.
```
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame");

    // getElementsByClassName() is much more efficient than using
    // .querySelectorAll() to access dom elements.
    // var items = document.querySelectorAll('.mover');
    var items = document.getElementsByClassName('mover');

    // moving out scrollTop calc. out of the for loop
    // it needed to be cal only once per updatePositions() call
    var st = document.body.scrollTop / 1250;

    // move phase cal outside for loop
    // as it just has 5 cal to do; no need to run it items.length times 
    // add lookup table using map datastructure for cal phase
    // this will reduce Math.sin() cal and improve perf.
    var phaseMap = new Map();

    for (var k = 0; k < 5; k++) {
        phaseMap.set(k, Math.sin(st + (k % 5)));
    }

    for (var i = 0; i < items.length; i++) {
        var phase = phaseMap.get(i % 5);
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
    }

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
    }
}
```
* Finally using `backface-visibility: hidden` style for mover class to support mobile devices w/ low VRAM.

**Before Optimization**
![](https://cloud.githubusercontent.com/assets/6732675/12636368/0fee4df8-c541-11e5-909a-540d1dfd3503.png)

**After Optimization**
![](https://cloud.githubusercontent.com/assets/6732675/12636367/0fed2f2c-c541-11e5-995b-2ccde7faf96a.png)



#### Computation Efficiency for pizza.html
* Pulled out `dx` and `newwidth` out of `for` loop as we need to calculate them only once.
* Moved out `.querySelectorAll()` out of `for` loop and assign list to `var`.
```
function changePizzaSizes(size) {
        // pull dx and newwidth out of for loop as
        // we need to cal them only once.
        var dx = determineDx(document.getElementById("pizza0"), size);
        var newwidth = (document.getElementById("pizza0").offsetWidth + dx) + 'px';

        // assign querySelectorAll() to var; this way we get elem list only once
        // querySelectorAll() itself does depth-first pre-order traversal on the document's nodes
        // so calling querySelectorAll() all the time is expensive
        var randomPizzaContainerElements = document.querySelectorAll(".randomPizzaContainer");

        for (var i = 0; i < randomPizzaContainerElements.length; i++) {
            randomPizzaContainerElements[i].style.width = newwidth;
        }
    }
```

**After Optimization** time to resize pizza is around 1ms in pizza.html shown in browser console:

![](https://cloud.githubusercontent.com/assets/6732675/12636829/37ce1610-c545-11e5-930e-a1bb44f6dc59.gif)
