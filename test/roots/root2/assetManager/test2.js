
module.exports = {
  __module: {
    provides: ["assetManager/use_scripts", "assetManager/use_stylesheets", 
      "assetManager/register_assets_dir", "assetManager/register_views_dir"]
  },

  register_assets_dir: function() {
    return __dirname + "/../../../fixtures/assets2";
  },

  register_views_dir: function() {
    return __dirname + "/../../../fixtures/views2";
  },

  use_scripts: function() {
    return {
      default:  [
        {cwd: __dirname + "/../../../fixtures/assets2", file: "scripts/*.js" }
      ]
    };
  },

  use_stylesheets: function() {
    return {
      default:  ['testless.less']
    };
  }
};