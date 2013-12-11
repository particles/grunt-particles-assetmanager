var _ = require('lodash'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      register_assets_dir: 'svc!assetManager/register_assets_dir',
      register_views_dir: 'svc!assetManager/register_views_dir'
    },
    provides: {configure_task: {}}
  },
  
  TASK_NAME_ASSETS: 'particles-assets',

  configure_task: function(input) {
    var filesDesc = [];
    var grunt = input.grunt;

    //copy assets
    return self.register_assets_dir.sequence().then(function(results) {
      var dirs = _.flatten(results);
      _.each(dirs, function(dir) {
        filesDesc.push(path.join(dir, "**"));
      });
    })
    //copy views
    .then(function() {
      return self.register_views_dir.sequence();
    }).then(function(results) {
      var dirs = _.flatten(results);
      _.each(dirs, function(dir) {
        filesDesc.push(path.join(dir, "**"));
      });
    }).then(function() {
      self.log.debug({taskConfig: filesDesc}, "watch:"+self.TASK_NAME_ASSETS+" task");
      //now set the grunt config
      grunt.config.set('watch.'+self.TASK_NAME_ASSETS, {
        files: filesDesc,
        //TODO make this configurable
        tasks: ['update']
      });
      return input;
    });
  }
};
