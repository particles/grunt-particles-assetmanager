
var fs = require('fs'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      main: 'config!main'
    },
    provides: {"grunt/tasks/configure_task": {}}
  },
  
  TASK_NAME: 'particles',

  configure_task: function(input) {   
    var grunt = input.grunt;

    var main;
    try {
      main = require("package.json").main;
      if(!main) {
        main = "index.js";
      }
    } catch(e) {
      main = self.main;
    }
    if(main && fs.existsSync(main)) {
      if(fs.statSync(main).isDirectory()) {
        main = path.join(main, 'index.js');
      }
    } else {
      self.log.warn("Cannot resolve main executable file, grunt-develop will not work");
    }
    
    //now set the grunt config
    grunt.config.set('develop.'+self.TASK_NAME, {
      file: main,
      nodeArgs: ['--debug']
    });

    input.tasks.develop.push('develop:'+self.TASK_NAME);
    return input;
  }
};
