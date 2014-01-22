var _ = require('lodash');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      register_assets_dir: 'svc!assetManager/register_assets_dir',
      register_views_dir: 'svc!assetManager/register_views_dir',
      viewsDir: 'config!assets.viewsDir',
      assetsDir: 'config!assets.assetsDir'
    },
    provides: {"grunt/tasks/configure_task": {after: './clean'}}
  },
  
  TASK_NAME: 'particles',

  configure_task: function(input) {   
    var filesDesc = [];
    var grunt = input.grunt;

    //copy assets
    return self.register_assets_dir().then(function(results) {
      var dirs = _.flatten(results);
      _.each(dirs, function(dir) {
        filesDesc.push({
          expand: true,
          cwd: dir,
          src: ['**'],
          dest: self.assetsDir
        });
      });
    })
    //copy views
    .then(function() {
      return self.register_views_dir();
    }).then(function(results) {
      var dirs = _.flatten(results);
      _.each(dirs, function(dir) {
        filesDesc.push({
          expand: true,
          cwd: dir,
          src: ['**'],
          dest: self.viewsDir
        });
      });
    }).then(function() {
      self.log.debug({taskConfig: filesDesc}, "Assemble");
      //now set the grunt config
      grunt.config.set('copy.'+self.TASK_NAME+'.files', filesDesc);

      input.tasks.build.push('copy:'+self.TASK_NAME);
      return input;
    });
  }
};
