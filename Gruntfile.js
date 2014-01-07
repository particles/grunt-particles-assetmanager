/*
 * grunt-particles
 * https://github.com/particles/grunt-particles-assetmanager
 *
 * Copyright (c) 2013 Mario Casciaro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Unit tests.
    nodeunit: {
      test:  ['test/test.js']
    }

  });

  grunt.option('appRoot', __dirname);
  grunt.option('configDir', __dirname + "/test/config");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-particles-linker');

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.

  grunt.registerTask('test', ['clean', 'particles-build', 'nodeunit']);
  
  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
