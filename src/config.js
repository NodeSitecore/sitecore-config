const path = require('path');
const formatPath = require('./format-path');
const nconf = require('./init');

const { DEFAULT_CONF } = require('./constant');


class Config {
  constructor() {
    this.nconf = nconf;
    this.placeholders = [
      {
        pattern: '<masterDir>',
        replacement: path.join('<projectDir>', this.masterWebsite, 'code')
      },
      {
        pattern: '<currentDir>',
        replacement: path.join('<projectDir>', this.currentWebsite, 'code')
      },
      {
        pattern: '<foundationDir>',
        replacement: this.nconf.get('foundationRoot').replace(/^\.(\/|\\)/, '<rootDir>/')
      },
      {
        pattern: '<featureDir>',
        replacement: this.nconf.get('featureRoot').replace(/^\.(\/|\\)/, '<rootDir>/')
      },
      {
        pattern: '<projectDir>',
        replacement: this.nconf.get('projectRoot').replace(/^\.(\/|\\)/, '<rootDir>/')
      },
      {
        pattern: '<srcDir>',
        replacement: this.nconf.get('srcRoot').replace(/^\.(\/|\\)/, '<rootDir>/')
      },
      {
        pattern: '<themesDir>',
        replacement: path.join('<websiteDir>', 'themes')
      },
      {
        pattern: '<websiteDir>',
        replacement: this.nconf.get('websiteRoot').replace(/^\.(\/|\\)/, '<instanceDir>/')
      },
      {
        pattern: '<instanceDir>',
        replacement: this.nconf.get('instanceRoot').replace(/^\.(\/|\\)/, '<rootDir>/')
      },
      { pattern: '<rootDir>', replacement: `${process.cwd()}` }
    ];
  }

  /**
   *
   * @param key
   * @returns {*}
   */
  get(key) {
    const value = this.nconf.get(key);
    if (typeof value === 'string' && value.match(/<(.*)>/) || key === 'instanceRoot') {
      return this.resolve(key === 'instanceRoot' ? value.replace(/^\.(\/|\\)/, `${process.cwd()}/`) : value);
    }

    return value;
  }

  /**
   *
   * @param key
   * @param value
   * @returns {*}
   */
  set(key, value) {
    if (key === 'instanceRoot') {
      value = value.replace(process.cwd(), '<rootDir>');
    }

    return this.nconf.set(key, value);
  }

  /**
   *
   * @param key
   * @returns {*}
   */
  has(key) {
    return this.nconf.get(key) !== undefined;
  }

  /**
   *
   * @returns {*}
   */
  get currentWebsite() {
    return this.nconf.get('currentWebsite');
  }

  /**
   *
   * @returns {*}
   */
  get masterWebsite() {
    return this.nconf.get('masterWebsite');
  }

  /**
   *
   * @returns {*}
   */
  get siteUrl() {
    return this.get('siteUrl');
  }

  /**
   * return the path of auth config file required by unicorn synchro task.
   * @returns {*|string}
   */
  get authConfigFile() {
    return this.resolve('<websiteDir>', 'App_config', 'Include', 'Unicorn', 'Unicorn.UI.config');
  }

  /**
   * Return the absolute path of instance (example: `/path/to/build/`).
   * @returns {*|string}
   */
  get instanceRoot() {
    return this.resolve('<instanceDir>');
  }

  /**
   *  Return the relative path of instance (example: `build/`).
   * @returns {*}
   */
  get buildRoot() {
    return formatPath(this.nconf.get('instanceRoot').replace('<rootDir>', '.'));
  }

  /**
   * Return the website root (example: `path/to/build/Website/`).
   * @returns {*|string}
   */
  get websiteRoot() {
    return this.resolve('<websiteDir>');
  }

  /**
   * Return the website theme root (example: `path/to/build/Website/themes/`).
   * @returns {*|string}
   */
  get themeWebsiteRoot() {
    return this.resolve('<themesDir>');
  }

  /**
   * Return the website theme root (example: `path/to/build/Website/themes/`).
   * @returns {*|string}
   */
  get currentWebsiteRoot() {
    return this.resolve('<themesDir>', this.currentWebsite);
  }

  /**
   * Path of the sitecore librairies
   * @returns {*|string}
   */
  get sitecoreLibrariesRoot() {
    return this.resolve(this.get('sitecoreLibrariesRoot').replace(/^\.(\/|\\)/, '<instanceDir>'));
  }

  /**
   *
   * @returns {*|string}
   */
  get licensePath() {
    return this.resolve(this.get('licensePath').replace(/^\.(\/|\\)/, '<instanceDir>'));
  }

  /**
   *
   * @returns {string}
   */
  get solutionPath() {
    return this.resolve(`<rootDir>/${this.get('solutionName')}.sln`);
  }

  /**
   *
   * @returns {*|string}
   */
  get websiteViewsRoot() {
    return this.resolve('<websiteDir>', 'Views');
  }

  /**
   *
   * @returns {*|string}
   */
  get websiteConfigRoot() {
    return this.resolve('<websiteDir>', 'App_Config');
  }

  /**
   * Project root directory.
   * @returns {string}
   */
  get srcRoot() {
    return this.resolve('<srcDir>');
  }

  /**
   *
   * @returns {*}
   */
  get foundationRoot() {
    return this.resolve('<foundationDir>');
  }

  /**
   *
   * @returns {*}
   */
  get foundationScriptsRoot() {
    return this.resolve(this.nconf.get('foundationScriptsRoot').replace(/^\.(\/|\\)/, '<foundationDir>'));
  }

  /**
   *
   * @returns {*}
   */
  get featureRoot() {
    return this.resolve('<featureDir>');
  }

  /**
   *
   * @returns {*}
   */
  get projectRoot() {
    return this.resolve('<projectDir>');
  }

  /**
   * Path to the current project (master or localisation).
   * @returns {*}
   */
  get projectScriptsRoot() {
    return this.resolve('<currentDir>', 'Scripts');
  }

  /**
   * Path to the current project (master or localisation).
   * @returns {*}
   */
  get currentProjectRoot() {
    return this.resolve('<currentDir>');
  }

  /**
   * Path to the master project on Sitecore.
   * @returns {*}
   */
  get masterProjectRoot() {
    return this.resolve('<masterDir>');
  }

  /**
   *
   * @deprecated
   * @returns {{src: string, featureDirectory: *, featureRoot: *, projectDirectory: *, projectRoot: *, foundationDirectory: *, buildDirectory: *, themeBuildDirectory: *|string}}
   */
  get directories() {
    return {
      src: this.srcRoot.replace(process.cwd(), '.'),
      featureDirectory: this.featureRoot.replace(process.cwd(), '.'),
      featureRoot: this.featureRoot.replace(process.cwd(), '.'),
      projectDirectory: this.projectRoot.replace(process.cwd(), '.'),
      projectRoot: this.projectRoot.replace(process.cwd(), '.'),
      foundationDirectory: this.foundationRoot.replace(process.cwd(), '.'),
      buildDirectory: this.buildRoot.replace(process.cwd(), '.'),
      themeBuildDirectory: this.themeWebsiteRoot.replace(process.cwd(), '.')
    };
  }

  /**
   *
   * @returns {{'^@Foundation(.*)$': string, '^@Feature(.*)$': string, '^@Project(.*)$': string, '^@Master(.*)$': string, '^@/(.*)$': string}}
   */
  get moduleNameMapper() {
    return {
      '^@Foundation(.*)$': `${this.foundationScriptsRoot.replace(process.cwd(), '<rootDir>')}$1`,
      '^@Feature(.*)$': `${this.featureRoot.replace(process.cwd(), '<rootDir>')}$1`,
      '^@Project(.*)$': `${this.projectRoot.replace(process.cwd(), '<rootDir>')}$1`,
      '^@Master(.*)$': `${this.masterProjectRoot.replace(process.cwd(), '<rootDir>')}$1`,
      '^@/(.*)$': `${this.srcRoot.replace(process.cwd(), '<rootDir>')}/$1`
    };
  }

  /**
   *
   * @returns {*}
   */
  get bundles() {
    return this.get('bundles');
  }

  /**
   *
   * @returns {*}
   */
  get bundle() {
    return this.get('bundles');
  }

  /**
   *
   * @returns {*|Array}
   */
  get proxyUrls() {
    return this.get('proxyUrls') || [];
  }

  /**
   *
   * @param url
   */
  pushProxyUrl(url) {
    const { proxyUrls } = this;

    if (proxyUrls.indexOf(url) === -1) {
      proxyUrls.push(url);
    }

    this.set('proxyUrls', proxyUrls);
    this.save();
  }

  /**
   *
   */
  create(options = {}) {
    Object.keys(DEFAULT_CONF).forEach((key) => {
      nconf.set(key, options[key] || nconf.get(key));
    });
    this.save();
  }

  /**
   *
   */
  save() {
    this.nconf.save();
  }

  /**
   *
   * @param values
   * @returns {*}
   */
  resolve(...values) {
    let value = formatPath(path.join(...values));

    this.placeholders.forEach((placeholder) => {
      value = value.replace(placeholder.pattern, placeholder.replacement);
    });

    return value;
  }
}

module.exports = new Config();
