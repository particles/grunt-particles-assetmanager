
module.exports = {
  __module: {
    provides: ["use_scripts", "use_stylesheets", "register_assets_dir", "register_views_dir", "contribute_views"]
  },

  register_assets_dir: function() {
    return __dirname + "/../../../fixtures/assets1";
  },

  register_views_dir: function() {
    return __dirname + "/../../../fixtures/views1";
  },
  
  use_scripts: function() {
    return {
      default: ["script.js", ["http://this_is_a_url/ok.js"]]
    };
  },

  use_stylesheets: function() {
    return {
      default: ["test.css", "http://this_is_a_url/css.js"]
    };
  },

  contribute_views: function() {
    return [{name: "myview", view: "view3.jade"}];
  }
};