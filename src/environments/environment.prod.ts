declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: true,
  api: 'http://180.250.111.28:7812/api',
  name,
  description,
  version
};
