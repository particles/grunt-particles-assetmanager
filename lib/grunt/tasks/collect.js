var _ = require('lodash'),
  objectPath = require('object-path'),
  glob = require('glob');


function isUrl(url) {
  return (/^http[s]?:\/\/./).test(url);
}

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      use_scripts: 'svc!assetManager/use_scripts',
      use_stylesheets: 'svc!assetManager/use_stylesheets'
    },
    provides: {configure_task: {}}
  },

  configure_task: function(input) {
    return self.use_scripts.invoke().then(function(scripts) {
      scripts = _.compact(_.flatten(scripts, true));
      input.scripts = self.groupByNamespaceAndNormalize(scripts);
    }).then(function() {
      return self.use_stylesheets.invoke();
    }).then(function(styles) {
      styles = _.compact(_.flatten(styles, true));
      input.stylesheets = self.groupByNamespaceAndNormalize(styles);

      return input;
    });
  },

  /**
   * Group by namespace, type (file/url) and expand blogs
   */ 
  groupByNamespaceAndNormalize: function(declarations) {
    var namespaces = {};
    var args = null;
    //build the namespaces
    _.each(declarations, function(resourceDeclaration) {
      _.each(resourceDeclaration, function(resources, namespace) {
        resources = _.flatten(resources);
        _.each(resources, function(resource) {
          //resource can be
          //"some/file.js"
          //{cwd: ,file: ""}

          var file, root;
          if(_.isString(resource)) {
            file = resource;
          } else {
            file = resource.file;
            root = resource.cwd;
          }

          var type = 'files';
          if(isUrl(file)) {
            type = 'urls';
            args = [file];
          } else if(root) {
            args = glob.sync(file, {cwd: root});
          } else {
            args = [file];
          }

          args.unshift(namespaces, [namespace, type]);
          objectPath.push.apply(null, args);
        });
      });
    });
    
    var namespacesNotDups = {};
    _.each(namespaces, function(res, namespace) {
      namespacesNotDups[namespace] = {
        files: _.unique(res.files),
        urls: _.unique(res.urls)
      };
    });
    return namespacesNotDups;
  }
};
