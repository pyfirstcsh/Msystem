// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const paths = require('react-scripts/config/paths')
// eslint-disable-next-line no-undef
paths.appBuild = path.join(path.dirname(paths.appBuild), '../server/static')
