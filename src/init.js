const fs = require('fs');
const nconf = require('nconf');
const path = require('path');

const { DEFAULT_CONF_PATH, env, DEFAULT_CONF } = require('./constant');

nconf.argv().env({ lowerCase: true, separator: '__' });
nconf.file('default', { file: DEFAULT_CONF_PATH });

if (process.env.NODE_ENV) {
  const file = env[process.env.NODE_ENV] || path.join(process.cwd(), `.${process.env.NODE_ENV}.nscrc`);

  if (fs.existsSync(file)) {
    nconf.file(process.env.NODE_ENV, { file });
  }
} else if (fs.existsSync(env.development)) {
  nconf.file('development', { file: env.development });
}


nconf.defaults(DEFAULT_CONF);

module.exports = nconf;
