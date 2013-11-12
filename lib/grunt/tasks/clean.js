var _ = require('lodash');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config'
    },
    provides: {configure_task: {before: 'grunt/tasks/*'}}
  },
  
  TASK_NAME: 'particles',

  configure_task: function(input) {
    var grunt = input.grunt;

    grunt.config.set('clean.'+self.TASK_NAME, [
      self.config.get('assets.assetsDir'),
      self.config.get('assets.viewsDir')
    ]);
    return input;
  }
};
