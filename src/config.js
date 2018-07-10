const path = require('path');
const formatPath = require('./format-path');
const nconf = require('./init');

const { DEFAULT_CONF } = require('./constant');


class Config {
  constructor() {
    this.nconf = nconf;
  }

  /**
   *
   * @param key
   * @returns {*}
   */
  get(key) {
    if (key === 'instanceRoot') {
      return formatPath(this.nconf.get(key)
        .replace(/^\.(\/|\\)/, `${process.cwd()}/`))
        .replace('<rootDir>', `${process.cwd()}`);
    }
    return this.nconf.get(key);
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
    return this.get('currentWebsite');
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
    return formatPath(path.join(this.websiteRoot, 'App_config', 'Include', 'Unicorn', 'Unicorn.UI.config'));
  }

  /**
   * Return the absolute path of instance (example: `/path/to/build/`).
   * @returns {*|string}
   */
  get instanceRoot() {
    return this.get('instanceRoot');
  }

  /**
   *  Return the relative path of instance (example: `build/`).
   * @returns {*}
   */
  get buildRoot() {
    return formatPath(this.nconf.get('instanceRoot')
      .replace('<rootDir>', '.'));
  }

  /**
   * Return the website root (example: `path/to/build/Website/`).
   * @returns {*|string}
   */
  get websiteRoot() {
    return formatPath(path.join(this.instanceRoot, this.get('websiteRoot')));
  }

  /**
   * Return the website theme root (example: `path/to/build/Website/themes/`).
   * @returns {*|string}
   */
  get themeWebsiteRoot() {
    return formatPath(path.join(this.instanceRoot, this.get('websiteRoot'), 'themes'));
  }

  /**
   * Return the website theme root (example: `path/to/build/Website/themes/`).
   * @returns {*|string}
   */
  get currentWebsiteRoot() {
    return formatPath(path.join(this.instanceRoot, this.get('websiteRoot'), 'themes', this.currentWebsite));
  }

  /**
   * Path of the sitecore librairies
   * @returns {*|string}
   */
  get sitecoreLibrariesRoot() {
    return formatPath(path.join(this.instanceRoot, this.get('sitecoreLibrariesRoot')));
  }

  /**
   *
   * @returns {*|string}
   */
  get licensePath() {
    return formatPath(path.join(this.instanceRoot, this.get('licensePath')));
  }

  /**
   *
   * @returns {string}
   */
  get solutionPath() {
    return formatPath(`./${this.get('solutionName')}.sln`);
  }

  /**
   *
   * @returns {*|string}
   */
  get websiteViewsRoot() {
    return formatPath(path.join(this.websiteRoot, 'Views'));
  }

  /**
   *
   * @returns {*|string}
   */
  get websiteConfigRoot() {
    return formatPath(path.join(this.websiteRoot, 'App_Config'));
  }

  /**
   * Project root directory.
   * @returns {string}
   */
  get srcRoot() {
    return formatPath(this.get('srcRoot'));
  }

  /**
   *
   * @returns {*}
   */
  get foundationRoot() {
    return formatPath(this.get('foundationRoot'));
  }

  /**
   *
   * @returns {*}
   */
  get foundationScriptsRoot() {
    return formatPath(`./${path.join(this.get('foundationRoot'), this.get('foundationScriptsRoot'))}`);
  }

  /**
   *
   * @returns {*}
   */
  get featureRoot() {
    return formatPath(this.get('featureRoot'));
  }

  /**
   *
   * @returns {*}
   */
  get projectRoot() {
    return formatPath(this.get('projectRoot'));
  }

  /**
   *
   * @returns {*}
   */
  get projectScriptsRoot() {
    return formatPath(path.join(this.get('projectRoot'), this.currentWebsite, '/code/Scripts/'));
  }

  get currentProjectRoot() {
    return formatPath(path.join(this.get('projectRoot'), this.currentWebsite, '/code/'));
  }

  /**
   *
   * @returns {{src: string, featureDirectory: *, featureRoot: *, projectDirectory: *, projectRoot: *, foundationDirectory: *, buildDirectory: *, themeBuildDirectory: *|string}}
   */
  get directories() {
    return {
      src: this.srcRoot,
      featureDirectory: this.featureRoot,
      featureRoot: this.featureRoot,
      projectDirectory: this.projectRoot,
      projectRoot: this.projectRoot,
      foundationDirectory: this.foundationRoot,
      buildDirectory: this.buildRoot,
      themeBuildDirectory: this.themeWebsiteRoot.replace(process.cwd(), '.')
    };
  }

  get moduleNameMapper() {
    return {
      '^@Foundation(.*)$': `${this.foundationScriptsRoot.replace('./', '<rootDir>/')}$1`,
      '^@Feature(.*)$': `${this.featureRoot.replace('./', '<rootDir>/')}$1`,
      '^@Project(.*)$': `${this.projectRoot.replace('./', '<rootDir>/')}$1`,
      '^@/(.*)$': `${this.srcRoot.replace('./', '<rootDir>/')}/$1`
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
}

module.exports = new Config();
