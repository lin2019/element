var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function (key) {
  externals[`yq-ui-code/packages/${key}`] = `yq-ui-code/lib/${key}`;
});

externals['yq-ui-code/src/locale'] = 'yq-ui-code/lib/locale';
utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`yq-ui-code/src/utils/${file}`] = `yq-ui-code/lib/utils/${file}`;
});
mixinsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`yq-ui-code/src/mixins/${file}`] = `yq-ui-code/lib/mixins/${file}`;
});
transitionList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`yq-ui-code/src/transitions/${file}`] = `yq-ui-code/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'yq-ui-code': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js|utils\/lodash\.js/;
