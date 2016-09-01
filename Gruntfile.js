'use strict';
/*global module:false*/

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * <%= pkg.title || pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * \n' +
            ' * @author <%= pkg.author %> \n' +
            ' * @since <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
            ' * @version v<%= pkg.version %>\n' +
            ' */\n',
        // Task configuration.
        jshint: {
            src: ['js/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        clean: {
            development: {
                src: ['build']
            }
        },
        copy: {
        	development: {
        		files: [
        			{src: 'index.html', dest: 'build/index.html'}
        		]
        	}
        },
        less: {
            development: {
                compress: true,
                yuicompress: true,
                optimization: 2,
                files: {
                    'build/css/styles.css': 'less/styles.less'
                }
            }
        },
        browserify: {
            development: {
                files: {
                    'build/js/main.js': ['js/**/*.js', '!src/js/main.js']
                }
            }
        },
        handlebars: {
            options: {
                namespace: 'APP',
                node: true,
                wrapped: false,
                processName: function(fp) {
                    return fp.replace(/^hbs\//, '').replace(/\.hbs$/, '');
                }
            },
            all: {
                files: {
                    'js/templates.js': ['hbs/**/*.hbs']

                }
            }
        },
        watch: {
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['js/**/*.js', 'data/**/*.json'], // which files to watch
                tasks: ['clean', 'jshint', 'handlebars', 'copy', 'less', 'browserify', 'uglify'],
                options: {
                    nospawn: true
                }
            },
            hbs: {
                files: ['hbs/**/*.hbs'], // which files to watch
                tasks: ['clean', 'jshint', 'handlebars', 'copy', 'less', 'browserify', 'uglify'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['index.html'], // which files to watch
                tasks: ['copy'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-git-release');

    grunt.registerTask('default', ['clean', 'jshint', 'handlebars', 'copy', 'less', 'browserify']);
};
