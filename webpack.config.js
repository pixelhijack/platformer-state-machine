var webpack = require('webpack');
var path = require('path');


var BUILD_DIR = path.resolve(__dirname, 'client/dist');
var APP_DIR = path.resolve(__dirname, 'client/src');

var rootDir = path.resolve(__dirname),
    phaser_module = path.join(rootDir, "node_modules", "phaser-ce"),
    phaser = path.join(phaser_module, "build", "custom", "phaser-split.js"),
    pixi = path.join(phaser_module, "build", "custom", "pixi.js"),
    p2 = path.join(phaser_module, "build", "custom", "p2.js");

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.json', '.js'], // <-- extended by considering also extension '.js'
    modules: [path.resolve('node_modules')],
    // new for alias resolve (begin)
    alias: {
      "pixi": pixi,
      "p2": p2,
      "phaser-ce": phaser
    }
    // new for alias resolve (end)
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // new for exposing pixi, correct phaser and p2 into global scope (begin)
      {
        test: /pixi\.js/,
        loader: "expose-loader?PIXI"
      },
      {
        test: /phaser-split\.js/,
        loader: "expose-loader?Phaser"
      },
      {
        test: /p2\.js/,
        loader: "expose-loader?p2"
      }
    ]
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
