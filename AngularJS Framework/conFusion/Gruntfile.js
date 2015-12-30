'use strict';

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                ]
            }
        },
        copy: {
            dist: {
                cwd: 'app',
                src: ['**', '!styles/**/*.css', '!scripts/**/*.js'],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app1: {
                files: [
                    {
                        expand: true,
                        src: ['app/scripts/app.js'],
                    }
                ]
            }
        },
        uglify: {
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [
                    {
                        src: [
                            'dist/scripts/*.js',
                            'dist/styles/*.css',
                        ]
                    }
                ]
            }
        },
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assertDirs: ['dist', 'dist/styles']
            }
        },
        watch: {
            copy: {
                files: ['app/**', '!app/**/*.css', '!app/**/*.js'],
                tasks: ['build']
            },
            gruntfile: {
              files: ['Gruntfile.js'],
              tasks: ['build']  
            },
            scripts: {
                files: ['app/scripts/*.js'],
                tasks: ['build']
            },
            styles: {
                files: ['app/styles/mystyles.css'],
                tasks: ['build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            dist: {
                options: {
                    open: true,
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        }
    });
    
    grunt.registerTask('build', ['clean', 'jshint', 'useminPrepare', 'concat', 'cssmin', 'ngAnnotate', 'uglify', 'copy', 'filerev', 'usemin']);
    grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
    grunt.registerTask('default', ['build']);
};