'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    jshint: {
      all: ['server.js', 'Gruntfile.js', 'test/client/*.js', 'test/server/*.js',
      'app/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['server.js', 'Gruntfile.js', 'test/client/*.js', 'test/server/*.js',
      'app/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/test_bundle.js', 'test/server/*.js'],
      options: {
        timeout: 3000
      }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: ['*.scss'],
          dest: 'build/',
          ext: '.css'
        }]
      }
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html', 'css/**/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*.js'],
        dest:'test/test_bundle.js',
        options:{
          transform: ['debowerify']
        }
      }
    }
  });
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev',
    'sass:dev']);
  grunt.registerTask('default', ['test']);
};
