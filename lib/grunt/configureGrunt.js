
var _ = require('lodash'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      configure_task: 'svc|pipeline!grunt/tasks/configure_task'
    },
    provides: {
      configure_grunt: {}
    }
  },

  configure_grunt: function(options) {
    var grunt = options.grunt;

    //some important checks
    var assetsDir = self.config.get('assets.assetsDir');

    //prevent to clean or mess around with the wrong directory
    if(_.isEmpty(assetsDir) || _.isEmpty(path.relative(assetsDir, "/")) || _.isEmpty(path.relative(assetsDir, "./"))) {
      grunt.fail.fatal("Config 'assets.assetsDir' not set or wrong: " + assetsDir);
    }

    var viewsDir = self.config.get('assets.viewsDir');
    if(_.isEmpty(viewsDir) || _.isEmpty(path.relative(viewsDir, "/")) || _.isEmpty(path.relative(viewsDir, "./"))) {
      grunt.fail.fatal("Config 'assets.viewsDir' not set or wrong: " + viewsDir);
    }

    grunt.log.writeln("assets.assetsDir -> " + assetsDir);
    grunt.log.writeln("assets.viewsDir -> " + viewsDir);

    return self.configure_task(options);
  }

};

