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
    currentWebsite: 'Common',
    solutionName: 'Base',
    siteUrl: 'http://base.dev.local',

    instanceRoot: formatPath('./build'),
    srcRoot: formatPath('./src'),
    websiteRoot: formatPath('./Website'),
    featureRoot: formatPath('./src/Feature'),
    projectRoot: formatPath('./src/Project'),
    foundationRoot: formatPath('./src/Foundation'),
    foundationScriptsRoot: formatPath('./Core/code/Scripts'),
    sitecoreLibrariesRoot: formatPath('./Website/bin'),
    licensePath: formatPath('./Data/license.xml'),


    buildConfiguration: 'Debug',
    buildToolsVersion: 15.0,
    buildMaxCpuCount: 0,
    buildVerbosity: 'minimal',
    buildNodeReuse: false,
    buildLogCommand: false,
    excludeFilesFromDeployment: ['packages.config'],

    // build
    buildTargets: ['Build'],
    buildPlatform: 'Any CPU',
    buildProperties: {},

    // publish
    publishTargets: ['Build'],
    publishPlatform: 'AnyCpu',
    publishProperties: {
      DeployOnBuild: 'true',
      DeployDefaultTarget: 'WebPublish',
      WebPublishMethod: 'FileSystem',
      DeleteExistingFiles: 'false',
      _FindDependencies: 'false'
    },

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
