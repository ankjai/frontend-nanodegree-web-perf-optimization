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
    grunt.registerTask('default');
}
