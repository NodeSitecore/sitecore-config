const path = require('path');
const formatPath = require('./format-path');

module.exports = {
  /**
   *
   * @type {*|string}
   */
  DEFAULT_CONF_PATH: path.join(process.cwd(), '.nscrc'),
  /**
   *
   */
  DEFAULT_CONF: {
    /**
     * Current code name of the sitecore website.
     * @tags Sitecore, Vuejs
     */
    currentWebsite: 'Common',
    /**
     * Solution name of the Visual Studio project.
     * @tags Sitecore
     */
    solutionName: 'Base',
    /**
     * Site url use on your local machine. You change this value in a separated file like `.dev.nsrc`.
     * @tags Sitecore
     */
    siteUrl: 'http://base.dev.local',
    /**
     * Directory the Sitecore files instance.
     * @tags Sitecore
     */
    instanceRoot: formatPath('./build'),
    /**
     * Source code directory.
     * @tags Sitecore
     */
    srcRoot: formatPath('./src'),
    /**
     * Website directory used by Sitecore.
     * @tags Sitecore
     */
    websiteRoot: formatPath('./Website'),
    /**
     * Foundation level directory (Helix structure).
     * @tags Sitecore
     */
    foundationRoot: formatPath('./src/Foundation'),
    /**
     * Scripts Foundation directory. Shortcut to the shared code.
     * @tags Sitecore
     */
    foundationScriptsRoot: formatPath('./Core/code/Scripts'),
    /**
     * Feature level directory (Helix structure).
     * @tags Sitecore
     */
    featureRoot: formatPath('./src/Feature'),
    /**
     * Project level directory (Helix structure).
     * @tags Sitecore
     */
    projectRoot: formatPath('./src/Project'),
    /**
     * Sitecore libraries directory.
     * @tags Sitecore
     */
    sitecoreLibrariesRoot: formatPath('./Website/bin'),
    /**
     * License path required by Sitecore.
     * @tags Sitecore
     */
    licensePath: formatPath('./Data/license.xml'),
    /**
     * MsBuild Configuration (Release or Debug).
     * @tags MsBuild
     */
    buildConfiguration: 'Debug',
    /**
     * MsBuild .NET Tools-Version (1.0, 1.1, 2.0, 3.5, 4.0, 12.0, 14.0, 15.0, auto).
     * @tags MsBuild
     */
    buildToolsVersion: 15.0,
    /**
     * Maximal CPU-Count to use. (`-1`: MSBuild Default, `0`: Automatic selection, `> 0`: Concrete value).
     * @tags MsBuild
     */
    buildMaxCpuCount: 0,
    /**
     * Specify the amount of information to display in the build output (`quiet`, `minimal`, `normal`, `detailed`, `diagnostic`).
     * @tags MsBuild
     */
    buildVerbosity: 'minimal',
    /**
     * MsBuild Specify whether to enable or disable the re-use of MSBuild nodes (`true` or `false`).
     * @tags MsBuild
     */
    buildNodeReuse: false,
    /**
     * Logs the MsBuild command that will be executed.
     * @tags MsBuild
     */
    buildLogCommand: false,
    /**
     * Exclude files from the deployment on the Sitecore instance.
     * @tags MsBuild
     */
    excludeFilesFromDeployment: ['packages.config'],

    // build
    /**
     * Build targets options (`Build`, `Clean`, `Rebuild`).
     * @tags MsBuild
     */
    buildTargets: ['Build'],
    /**
     * Build platform (e.g. x86, x64, Any CPU).
     * @tags MsBuild
     */
    buildPlatform: 'Any CPU',
    /**
     * Additional build properties.
     * @tags MsBuild
     */
    buildProperties: {},

    // publish
    /**
     * Publish targets options (`Build`, `Clean`, `Rebuild`).
     * @tags MsBuild
     */
    publishTargets: ['Build'],
    /**
     * Publish platform (e.g. x86, x64, AnyCpu).
     * @tags MsBuild
     */
    publishPlatform: 'AnyCpu',
    /**
     * Additional publish properties.
     * @tags MsBuild
     */
    publishProperties: {
      DeployOnBuild: 'true',
      DeployDefaultTarget: 'WebPublish',
      WebPublishMethod: 'FileSystem',
      DeleteExistingFiles: 'false',
      _FindDependencies: 'false'
    },
    /**
     * Bundles configurations use by Vue.js and fractal.
     * @tags Vuejs
     */
    bundles: {
      bundleName: 'bundle',
      polyfills: 'polyfills',
      styleguide: 'styleguide'
    }
  },
  /**
   *
   */
  env: {
    /**
     *
     */
    development: path.join(process.cwd(), '.dev.nscrc'),
    /**
     *
     */
    dev: path.join(process.cwd(), '.dev.nscrc'),
    /**
     *
     */
    production: path.join(process.cwd(), '.prod.nscrc'),
    /**
     *
     */
    prod: path.join(process.cwd(), '.prod.nscrc'),
    /**
     *
     */
    test: path.join(process.cwd(), '.test.nscrc')
  }
};
