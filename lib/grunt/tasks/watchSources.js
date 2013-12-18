var _ = require('lodash'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      scatter: 'container!'
    },
    provides: {"grunt/tasks/configure_task": {after: ['grunt/tasks/develop']}}
  },

  TASK_NAME: 'particles-sources',

  configure_task: function(input) {
    var filesDesc = [];
    var grunt = input.grunt;

    self.scatter.module.container.resolver.iterateParticles(function(component) {
      filesDesc.push(path.join(component.root, "**/*.{js,json}"));
      Array.prototype.push.apply(filesDesc, component.descriptor.excludeFull);
    });
    
    self.log.debug({taskConfig: filesDesc}, "watch:"+self.TASK_NAME+" task");
    
    //now set the grunt config
    grunt.config.set('watch.'+self.TASK_NAME, {
      files: filesDesc,
      tasks: ['particles-build', 'particles-develop-internal'],
      options: {
        spawn: false
      }
    });

    input.tasks.develop.push("watch");
    return input;
  }
};
