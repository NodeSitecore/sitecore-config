# NodeSitecore Config

[![Build Status](https://travis-ci.org/NodeSitecore/sitecore-config.svg?branch=master)](https://travis-ci.org/NodeSitecore/sitecore-config)
[![Coverage Status](https://coveralls.io/repos/github/NodeSitecore/sitecore-config/badge.svg?branch=master)](https://coveralls.io/github/NodeSitecore/sitecore-config?branch=master)
[![Package Quality](http://npm.packagequality.com/badge/@node-sitecore/config.png)](http://packagequality.com/#?package=@node-sitecore/config)
[![npm version](https://badge.fury.io/js/%40node-sitecore%2Fconfig.svg)](https://badge.fury.io/js/%40node-sitecore%2Fconfig)
[![Dependencies](https://david-dm.org/NodeSitecore/sitecore-config.svg)](https://david-dm.org/NodeSitecore/sitecore-config#info=dependencies)
[![img](https://david-dm.org/NodeSitecore/sitecore-config/dev-status.svg)](https://david-dm.org/NodeSitecore/sitecore-config/#info=devDependencies)
[![img](https://david-dm.org/NodeSitecore/sitecore-config/peer-status.svg)](https://david-dm.org/NodeSitecore/sitecore-config/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/NodeSitecore/sitecore-config/badge.svg)](https://snyk.io/test/github/NodeSitecore/sitecore-config)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> A shared configuration between `@node-sitecore/cli` and `@node-sitecore/vue`

## Features

- Control over configuration values.
- Support multiple configuration files by environment (`.development.nsrc`, `.test.nsrc`, `.production.nsrc`).
- All value can be overridden by env or args variable ([nconf](https://github.com/indexzero/nconf))

## Installation

```bash
$ npm install -g @node-sitecore/config
```

## Configuration fields

Key | Default value | Tags | Description
---|---|---
currentWebsite | `Common` | Sitecore, Vuejs | Current code name of the sitecore website.
solutionName | `Base` | Sitecore | Solution name of the Visual Studio project.
siteUrl | `http://base.dev.local` |  Sitecore | Site url use on your local machine. You change this value in a separated file like `.dev.nsrc`.
instanceRoot | `http://base.dev.local` |  Sitecore | Directory the Sitecore files instance.
srcRoot | `./src` |  Sitecore | Source code directory.
websiteRoot | `./website` |  Sitecore | Website directory used by Sitecore.
foundationRoot | `./src/Foundation` |  Sitecore | Foundation level directory (Helix structure).
foundationScriptsRoot | `./Core/code/Scripts` |  Sitecore | Scripts Foundation directory. Shortcut to the shared code.
featureRoot | `./src/Feature` |  Sitecore | Feature level directory (Helix structure).
projectRoot | `./src/Project` |  Sitecore | Project level directory (Helix structure).
sitecoreLibrariesRoot | `./Website/bin` | Sitecore | Sitecore libraries directory.
licensePath | `./Data/license.xml` | Sitecore | License path required by Sitecore.
buildConfiguration | `Debug` | MsBuild | MsBuild Configuration (Release or Debug).
buildToolsVersion | `15.0` | MsBuild | MsBuild .NET Tools-Version (1.0, 1.1, 2.0, 3.5, 4.0, 12.0, 14.0, 15.0, auto).
buildMaxCpuCount | `0` | MsBuild | Maximal CPU-Count to use. (`-1`: MSBuild Default, `0`: Automatic selection, `> 0`: Concrete value).
buildVerbosity | `minimal` | MsBuild | Specify the amount of information to display in the build output (`quiet`, `minimal`, `normal`, `detailed`, `diagnostic`).
buildNodeReuse | `false` | MsBuild | MsBuild Specify whether to enable or disable the re-use of MSBuild nodes (`true` or `false`).
buildLogCommand | `false` | MsBuild | Logs the MsBuild command that will be executed.
excludeFilesFromDeployment | `['packages.config']` | MsBuild | Exclude files from the deployment on the Sitecore instance.
buildTargets | `['Build']` | MsBuild | Build targets options (`Build`, `Clean`, `Rebuild`).
buildPlatform | `Any CPU` | MsBuild | Build targets options (e.g. x86, x64, Any CPU).
buildProperties | `{}` | MsBuild | Additional build properties.
publishTargets | `['Build']` | MsBuild | Publish targets options (`Build`, `Clean`, `Rebuild`).
publishPlatform | `AnyCpu` | MsBuild | Publish platform (e.g. x86, x64, AnyCpu).
publishProperties | `{...}` | MsBuild | Additional publish properties.
bundles | `{...}` | Vuejs | Additional publish properties.

### PublishProperties

Default value of publishProperties:
```json
{
  DeployOnBuild: 'true',
  DeployDefaultTarget: 'WebPublish',
  WebPublishMethod: 'FileSystem',
  DeleteExistingFiles: 'false',
  _FindDependencies: 'false'
}
```

### Bundles

Default value of bundles:
```json
{
  bundleName: 'bundle',
  polyfills: 'polyfills',
  styleguide: 'styleguide'
}
```

## Hierarchical configuration

Configuration management can get complicated very quickly for even trivial applications running in production. nconf addresses this problem by enabling you to setup a hierarchy for different sources of configuration with no defaults. The order in which you attach these configuration sources determines their priority in the hierarchy. Let's take a look at the options available to you

The priority of hierarchical configuration is defined like there :

1. Default configuration from `@node-sitecore/config`,
2. Arguments given by command line tools,
3. Environment variables,
4. From file `.nsrc`,
5. From `.development.nsrc`, `.test.nsrc`, `.production.nsrc` or `[process.env.NODE_ENV].nsrc` according to `process.env.NODE_ENV` value.


## License

The MIT License (MIT)

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
