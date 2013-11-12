'use strict';

module.exports = function(grunt) {
  grunt.registerTask('particles-update', ['copy:particles', 'recess:particles', 'particles-linker']);
  grunt.registerTask('particles-build', ['clean:particles', 'particles-update']);
  grunt.registerTask('particles-build-and-watch', ['particles-build', 'watch:particles-assets']);
  grunt.registerTask('particles-develop', ['particles-build', 'develop:particles', 'watch']);
};
