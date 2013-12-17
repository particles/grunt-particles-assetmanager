var _ = require('lodash'),
  path =require('path'),
  glob = require('glob');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config'
    },
    provides: {grunt_configure_task: {after: 'grunt/tasks/collect'}}
  },

  TASK_NAME: 'particles',

  grunt_configure_task: function(input) {
    var assetsDir = self.config.get('assets.assetsDir');

    var filesDesc = [];
    var newStylesheets = {};
    _.each(input.stylesheets, function(resources, namespace) {
      newStylesheets[namespace] = {
        urls: resources.urls
      };

      var processedFiles = [];
      _.each(resources.files, function(file) {
        var src = path.resolve(assetsDir, file);
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
        
        dest = path.resolve(assetsDir, dest);

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
    self.log.debug({taskConfig: taskConf}, "Recess config");
    input.grunt.config.set('recess.'+self.TASK_NAME, taskConf);
    input.tasks.build.push('recess:'+self.TASK_NAME);
    return input;
  }
};
