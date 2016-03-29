'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-uncss');

  // Define the configuration for all the tasks
  grunt.initConfig({
    uncss: {
      prod: {
        options:{
          csspath: '../public/'
        },
        files: {
          'public/stylesheets/bootstrap.prod.css': ['views/index.ejs']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'uncss'
  ]);

};
