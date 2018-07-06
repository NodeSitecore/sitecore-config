const { expect, Sinon } = require('../tools');
const config = require('../../src/config');
const formatPath = require('../../src/format-path');

describe('Config', () => {
  describe('has()', () => {
    it('should return true', () => expect(config.has('siteUrl')).to.be.true);
    it('should return false', () => expect(config.has('siteUrl2')).to.be.false);
  });

  describe('save()', () => {
    before(() => {
      this.nconfSaveStub = Sinon.stub(config.nconf, 'save');

      config.save();
    });

    after(() => {
      this.nconfSaveStub.restore();
    });

    it('should write the configuration', () => {
      this.nconfSaveStub.should.have.been.calledWithExactly();
    });
  });

  describe('create()', () => {
    before(() => {
      this.nconfSaveStub = Sinon.stub(config.nconf, 'save');

      config.create();
    });

    after(() => {
      this.nconfSaveStub.restore();
    });

    it('should write the configuration', () => {
      this.nconfSaveStub.should.have.been.calledWithExactly();
    });
  });

  describe('pushProxyUrl()', () => {
    before(() => {
      this.nconfSaveStub = Sinon.stub(config.nconf, 'save');

      config.pushProxyUrl('https://test.fr');
      config.pushProxyUrl('https://test.fr');
    });

    after(() => {
      this.nconfSaveStub.restore();
    });

    it('should write the configuration', () => {
      this.nconfSaveStub.should.have.been.calledWithExactly();
    });
  });


  describe('proxyUrls', () => {
    before(() => {
      config.set('proxyUrls', ['test']);
    });
    it('should return proxyUrls', () => {
      expect(config.proxyUrls).to.deep.eq(['test']);
    });
  });

  describe('property', () => {
    before(() => {
      const instanceRoot = config.get('instanceRoot');
      config.set('instanceRoot', instanceRoot);
    });
    it('should return currentWebsite', () => {
      expect(config.currentWebsite).to.eq('Common');
    });

    it('should return siteUrl', () => {
      expect(config.siteUrl).to.eq('http://base.dev.local');
    });

    it('should return authConfigFile', () => {
      expect(config.authConfigFile).to.contains(formatPath('build/Website/App_config/Include/Unicorn/Unicorn.UI.config'));
    });

    it('should return instanceRoot', () => {
      expect(config.instanceRoot.replace(process.cwd(), '')).to.contains(formatPath('/build'));
    });

    it('should return buildRoot', () => {
      expect(config.buildRoot).to.contains(formatPath('/build'));
    });

    it('should return websiteRoot', () => {
      expect(config.websiteRoot).to.contains(formatPath('build/Website'));
    });

    it('should return themeWebsiteRoot', () => {
      expect(config.themeWebsiteRoot).to.contains(formatPath('build/Website/themes'));
    });

    it('should return sitecoreLibraries', () => {
      expect(config.sitecoreLibrariesRoot).to.contains(formatPath('build/Website/bin'));
    });

    it('should return licensePath', () => {
      expect(config.licensePath).to.contains(formatPath('build/Data/license.xml'));
    });

    it('should return solutionPath', () => {
      expect(config.solutionPath).to.contains(formatPath('./Base.sln'));
    });

    it('should return websiteViewsRoot', () => {
      expect(config.websiteViewsRoot).to.contains(formatPath('build/Website/Views'));
    });

    it('should return websiteConfigRoot', () => {
      expect(config.websiteConfigRoot).to.contains(formatPath('build/Website/App_Config'));
    });

    it('should return srcRoot', () => {
      expect(config.srcRoot).to.contains(formatPath('./src'));
    });

    it('should return foundationRoot', () => {
      expect(config.foundationRoot).to.contains(formatPath('./src'));
    });

    it('should return foundationScriptsRoot', () => {
      expect(config.foundationScriptsRoot).to.contains(formatPath('./src/Foundation/Core/code/Scripts'));
    });

    it('should return featureRoot', () => {
      expect(config.featureRoot).to.contains(formatPath('./src'));
    });

    it('should return projectRoot', () => {
      expect(config.projectRoot).to.contains(formatPath('./src'));
    });

    it('should return projectScriptsRoot', () => {
      expect(config.projectScriptsRoot).to.contains(formatPath('src/Project/Common/code/Scripts/'));
    });

    it('should return directories', () => {
      expect(config.directories).to.deep.eq({
        buildDirectory: './build',
        featureDirectory: './src/Feature',
        featureRoot: './src/Feature',
        foundationDirectory: './src/Foundation',
        projectDirectory: './src/Project',
        projectRoot: './src/Project',
        src: './src',
        themeBuildDirectory: './build/Website/themes'
      });
    });

    it('should return bundle', () => {
      expect(config.bundle).to.deep.eq({
        bundleName: 'bundle',
        polyfills: 'polyfills',
        styleguide: 'styleguide'
      });
    });

    it('should return bundles', () => {
      expect(config.bundles).to.deep.eq({
        bundleName: 'bundle',
        polyfills: 'polyfills',
        styleguide: 'styleguide'
      });
    });

    it('should return moduleNameMapper object', () => {
      expect(config.moduleNameMapper).to.deep.eq({
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@Feature(.*)$': '<rootDir>/src/Feature$1',
        '^@Foundation(.*)$': '<rootDir>/src/Foundation/Core/code/Scripts$1',
        '^@Project(.*)$': '<rootDir>/src/Project$1'
      });
    });
  });
});
