
module.exports = {
  __module: {
    provides: ["use_scripts", "use_stylesheets", "register_assets_dir", "register_views_dir"]
  },

  register_assets_dir: function() {
    return __dirname + "/../../../fixtures/assets2";
  },

  register_views_dir: function() {
    return __dirname + "/../../../fixtures/views2";
  },

  use_scripts: function() {
    return [ {file: {cwd: __dirname + "/../../../fixtures/assets2", file: "scripts/*.js" }}]
  },

  use_stylesheets: function() {
    return ['testless.less'];
  }
};