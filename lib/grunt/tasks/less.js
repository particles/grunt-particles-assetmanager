var _ = require('lodash'),
  path =require('path'),
  glob = require('glob');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      assetsDir: 'config!assets.assetsDir'
    },
    provides: {"grunt/tasks/configure_task": {after: ['./copy', './collect']}}
  },

  TASK_NAME: 'particles',

  configure_task: function(input) {
    var filesDesc = [];
    var newStylesheets = {};
    _.each(input.stylesheets, function(resources, namespace) {
      newStylesheets[namespace] = {
        urls: resources.urls
      };

      var processedFiles = [];
      _.each(resources.files, function(file) {
        var src = path.resolve(self.assetsDir, file);
        var dest = null;
        var extension = path.extname(file);
        switch(extension) {
          case ".less":
            dest = file.replace(/\.less$/, ".css");
            processedFiles.push(dest);
            break;
//          case ".css":
//            dest = file;
//            processedFiles.push(dest);
//            break;
          default:
            processedFiles.push(file);
            //do not process the file, extension not supported
            return;
        }
        
        dest = path.resolve(self.assetsDir, dest);

        filesDesc.push({
          src: src,
          dest: dest
        });
      });
      newStylesheets[namespace].files = processedFiles;
    });

    input.stylesheets = newStylesheets;
    var taskConf = {
      files: filesDesc,
      options: {
        compile: true
      }
    };
    self.log.debug({taskConfig: taskConf}, "Less config");
    input.grunt.config.set('less.'+self.TASK_NAME, taskConf);
    input.tasks.build.push('less:'+self.TASK_NAME);
    return input;
  }
};
