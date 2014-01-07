var _ = require('lodash'), 
  util = require('util'),
  objectPath = require('object-path'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      log: 'grunt/log',
      config: 'config',
      contributeViewsSvc: 'svc!assetManager/contribute_views'
    },
    provides: {"grunt/tasks/configure_task": {after: "./*"}}
  },

  /**
   *
   */
  configure_task: function(input) {
    var grunt = input.grunt;

    self.configureLinker(
      grunt,
      input.scripts,
      'jadeScriptsLinker',
      '// INJECT-SCRIPTS-START[%s]',
      '// INJECT-SCRIPTS-END[%s]',
      'script(type="text/javascript", src="%s")',
      'jade',
      {isPublic: true}
    );

    self.configureLinker(
      grunt,
      input.stylesheets,
      'jadeCssLinker',
      '// INJECT-CSS-START[%s]',
      '// INJECT-CSS-END[%s]',
      "link(rel='stylesheet', href='%s')",
      'jade',
      {isPublic: true}
    );
    
    //get view contributions
    return self.contributeViewsSvc().then(function(contributions) {
      contributions = _(contributions).flatten(true).compact().value();
      var groupedContribution = {};
      contributions.forEach(function(contr) {
        objectPath.push(groupedContribution, [contr.name, 'files'], contr.view);
      });
        
      self.configureLinker(
        grunt,
        groupedContribution,
        'jadeViewContributor',
        '// VIEW-CONTRIBUTION-START[%s]',
        '// VIEW-CONTRIBUTION-END[%s]',
        "include %s",
        'jade',
        {isRelative: true, isView: true}
      );
    }).then(function() {
      input.tasks.build.push('particles-linker');
      return input;
    });
  },

  configureLinker: function(grunt, namespaces, taskName, startTag, endTag, fileTpl, extension, options) {
    var assetsDir = self.config.get('assets.assetsDir');
    var viewsDir = self.config.get('assets.viewsDir');
    var publicUrlRoot = self.config.get('assets.publicUrlRoot');
    var viewsGlob = path.join(viewsDir, '**/*.'+extension);

    var baseDir = options.isView ? viewsDir : assetsDir;
    //populate the linker config
    _.each(namespaces, function(resources, namespace) {
      var files = {};
      files[viewsGlob] = _.map(resources.files || [], function(resource) {
        return path.join(baseDir, resource);
      }).concat(resources.urls || []);

      var configObj = {
        options: {
          startTag: util.format(startTag, namespace),
          endTag: util.format(endTag, namespace),
          fileTmpl: fileTpl,
          appRoot: baseDir,
          isRelative: options.isRelative
        },
        files: files
      };
      if(options.isPublic) {
        configObj.options.publicUrlRoot = publicUrlRoot;
      }

      self.log.debug({taskConfig: configObj}, 'particles-linker:'+taskName+'_'+namespace);

      //now set the grunt config
      grunt.config.set('particles-linker.'+taskName+'_'+namespace, configObj);
    });
  }
};
