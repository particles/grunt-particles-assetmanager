
var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config'
    },
    provides: {configure_task: {}}
  },
  
  TASK_NAME: 'particles',

  configure_task: function(input) {
    var grunt = input.grunt;

    var main = self.config.get('main');
    if(!main) {
      self.log.warn("Parameter 'main' not found in config, grunt-develop is not configured properly");
    }
    
    //now set the grunt config
    grunt.config.set('develop.'+self.TASK_NAME, {
      file: self.config.get('main'),
      nodeArgs: ['--debug']
    });
    return input;
  }
};
