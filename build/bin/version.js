var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
// Only expose current fork versions in docs version switcher
var content = {};
content[version] = version;
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
