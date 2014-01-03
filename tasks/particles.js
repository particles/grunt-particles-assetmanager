var Particles = require('particles'), 
  _ = require('lodash');

module.exports = function(grunt) {
  function runTask() {
    var app = new Particles({
      config: {
        configDir: grunt.option('configDir'),
        appRoot: grunt.option('appRoot')
      },
      runService: 'svc|pipeline!grunt/configure',
      serviceArgs: [{grunt: grunt}]
    });
    
    return app.run();
  }
  
  grunt.registerTask('particles-build', function() {
    var done = this.async();
    runTask().then(function(res) {
      grunt.task.run(_.unique(res.tasks.build));
      done();
    }).otherwise(done);
  });

  grunt.registerTask('particles-rebuild', function() {
    var done = this.async();
    runTask().then(function(res) {
      grunt.task.run(_.unique(res.tasks.clean));
      grunt.task.run(_.unique(res.tasks.build));
      
      done();
    }).otherwise(done);
  });

  grunt.registerTask('particles-watch', function() {
    var done = this.async();
    runTask().then(function(res) {
      grunt.registerTask('particles-build-internal', _.unique(res.tasks.build));
      
      grunt.task.run(_.unique(res.tasks.clean));
      grunt.task.run(_.unique(res.tasks.build));
      grunt.task.run(_.unique(res.tasks.watch));
      
      done();
    }).otherwise(done);
  });

  grunt.registerTask('particles-develop', function() {
    var done = this.async();
    runTask().then(function(res) {
      grunt.registerTask('particles-build-internal', _.unique(res.tasks.build));
      grunt.registerTask('particles-develop-internal', _.unique(res.tasks.develop));
      
      grunt.task.run(_.unique(res.tasks.clean));
      grunt.task.run(_.unique(res.tasks.build));
      grunt.task.run(_.unique(res.tasks.develop));
      grunt.task.run('watch');
      
      done();
    }).otherwise(done);
  });
  
  
//  grunt.registerTask('particles-build', ['copy:particles', 'recess:particles', 'particles-linker']);
//  grunt.registerTask('particles-rebuild', ['clean:particles', 'particles-update']);
//  grunt.registerTask('particles-watch', ['particles-build', 'watch:particles-assets']);
//  grunt.registerTask('particles-develop', ['particles-build', 'develop:particles', 'watch']);
};
