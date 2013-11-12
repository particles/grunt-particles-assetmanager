# Synopsis

An asset manager for the Particles platform, based on Grunt.

[![NPM](https://nodei.co/npm/grunt-particles-assetmanager.png?downloads=true)](https://nodei.co/npm/grunt-particles-assetmanager/)

[![Build Status](https://travis-ci.org/particles/grunt-particles-assetmanager.png)](https://travis-ci.org/particles/grunt-particles-assetmanager)
[![Dependency Status](https://david-dm.org/particles/grunt-particles-assetmanager.png)](https://david-dm.org/particles/grunt-particles-assetmanager)

## What it does

The current pipeline will:

* Clean the old temporary assets directory
* Collect all assets directories using Scatter services `register_assets_dir`, `register_views_dir`
* Gather all assets into a temporary directory
* Compiles stylesheets registered with the Scatter service `use_scripts`
* Inject scripts, stylesheets and views from respectively the services `use_scripts`, `use_stylesheets`, `contribute_views`
* [Optional] Watch all the registered assets dirs for changes and re-run the pipeline if any change is detected
* [Optional] Run the application entry point (config param `main`) and restart the application if any change in the
application source (registered particles) is detected.

Limitations (TODO):
- Does not minify/bundle for production yet
- Supports only Jade for injections

# Available Grunt Tasks

* `particles-update`: build assets without cleaning
* `particles-build`: clean and build assets
* `particles-build-and-watch`: build then start to watch assets for changes
* `particles-develop`: build assets, starts the app. Watch assets and sources.

Before any of the above task can be run, a `grunt-particles` task has to execute to kickstart and configure
the Scatter container.

# Config

* `assets.viewsDir`
* `assets.assetsDir`
* `[assets.publicUrlRoot]`
* `[assets.defaultNamespace]`

### Example config

`{appRoot}/config/defaults.json`:

```javascript
{
  "generatedDir": "${appRoot}/generated",
  "assets": {
    "viewsDir": "${generatedDir}/views/",
    "assetsDir": "${generatedDir}/assets/",
    "publicUrlRoot": "public"
  },
  "particles": {
    "app": {
      "particles": ["${appRoot}/lib"]
    }
  }
}
```

# License

MIT

-----

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/particles/grunt-particles-assetmanager/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

