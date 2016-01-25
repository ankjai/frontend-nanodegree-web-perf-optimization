'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pagespeed: {
            options: {
                url: 'http://9129e538.ngrok.io',
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            desktop: {
                options: {
                    // url: 'http://9129e538.ngrok.io',
                    strategy: "desktop",
                    threshold: 90
                }
            },
            mobile: {
                options: {
                    // url: 'http://9129e538.ngrok.io',
                    strategy: "mobile",
                    threshold: 90
                }
            }
        },
        cssmin: {
            index: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            },
            pizza: {
                files: [{
                    expand: true,
                    cwd: 'src/views/css',
                    src: ['*.css'],
                    dest: 'dist/views/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            all: {
                files: {
                    'dist/js/perfmatters.min.js': ['src/js/perfmatters.js'],
                    'dist/views/js/main.min.js': ['src/views/js/main.js']
                }
            }
        },
        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/project-2048.html': 'src/project-2048.html',
                    'dist/project-mobile.html': 'src/project-mobile.html',
                    'dist/project-webperf.html': 'src/project-webperf.html',
                    'dist/views/pizza.html': 'src/views/pizza.html'
                }
            }
        },
        imageoptim: {
            options: {
                imageAlpha: true,
                jpegMini: true
            },
            img: {
                src: ['dist/img']
            },
            views: {
                src: ['dist/views/images/pizza.png', 'dist/views/images/pizzeria_360_270.jpg']
            }
        },
        copy: {
            img: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/img/*'],
                    dest: 'dist/img',
                    filter: 'isFile'
                }]
            },
            views: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/views/images/*'],
                    dest: 'dist/views/images',
                    filter: 'isFile'
                }]
            }
        }
    });

    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed w/ ngrok', function() {
        var done = this.async();
        var port = 8000;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    // Register default tasks
    grunt.registerTask('default', [
        'uglify',
        'cssmin',
        'htmlmin'
    ]);
}
