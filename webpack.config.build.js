const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_DIR = __dirname;

const SRC_DIR_NAME = 'src';
const DIST_DIR_NAME = 'dist';

const SRC_DIR = path.resolve(ROOT_DIR, SRC_DIR_NAME);
const DIST_DIR = path.resolve(ROOT_DIR, DIST_DIR_NAME);

const config = module.exports = {}

/*  COMMON CFG
 *  ************************************************ */
config.context = ROOT_DIR;
config.debug = true;

config.resolve = {
  extensions: ['', '.js', '.scss', '.less'],
  modulesDirectories: ['node_modules', SRC_DIR_NAME],
  root: ROOT_DIR
}

config.entry = {
  "ng-chroma": path.join(SRC_DIR, 'index.js'),
};

config.output = {
  path: DIST_DIR,
  filename: '[name].js',
};

config.module = {
  preLoaders: [],
  loaders: [{
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.js$/,
    exclude: [/node_modules/],
    loaders: ['ng-annotate', 'babel-loader'],
  }, {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('css-loader!less-loader'),
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css-loader'),
  }, {
    test: /src[\/\\].+\.html$/,
    loader: 'raw',
  }],

};

config.plugins = [
  new ExtractTextPlugin('ng-chroma.css'),
];
