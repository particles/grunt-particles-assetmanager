
var _ = require('lodash'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      grunt_configure_task: 'svc|pipeline!grunt/tasks/configure_task'
    },
    provides: {
      "grunt/configure": {}
    }
  },

  configure: function(options) {
    var grunt = options.grunt;
    
    options.tasks = {
      build: [],
      clean: [],
      watch: [],
      develop: []
    };

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

    return self.grunt_configure_task(options);
  }

};

