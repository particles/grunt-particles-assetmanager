var _ = require('lodash'),
  path =require('path'),
  glob = require('glob');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config'
    },
    provides: {"grunt/tasks/configure_task": {after: ['./*']}}
  },

  configure_task: function(input) {
    input.grunt.config.set('notify.build', {
      options: {
        message: "Build completed"
      }
    });
    input.grunt.config.set('notify.develop', {
      options: {
        message: "Server restarted"
      }
    });
    
    input.tasks.build.push('notify:build');
    input.tasks.develop.push('notify:develop');
    return input;
  }
};
