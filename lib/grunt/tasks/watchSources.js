var _ = require('lodash'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      scatter: 'container!'
    },
    provides: {configure_task: {}}
  },

  TASK_NAME_SOURCES: 'particles-sources',

  configure_task: function(input) {
    var filesDesc = [];
    var grunt = input.grunt;

    self.scatter.module.container.resolver.iterateComponents(function(component) {
      filesDesc.push(path.join(component.root, "**/*.{js,json}"));
      Array.prototype.push.apply(filesDesc, component.descriptor.excludeFull);
    });
    
    self.log.silly("watch:"+self.TASK_NAME_SOURCES+" task: ", filesDesc);
    
    //now set the grunt config
    grunt.config.set('watch.'+self.TASK_NAME_SOURCES, {
      files: filesDesc,
      tasks: ['develop:particles'],
      options: {
        spawn: false
      }
    });

    return input;
  }
};
