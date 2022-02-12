const path= require('path')
const { name, version } = require('../package.json');

const dir = path.join(process.cwd())

module.exports = {
  name,
  version,
  dir
};