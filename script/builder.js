/**
 * Created by godzilla on 5/24/17.
 */

const webpack = require('webpack');
const webpackConfigCreator = require('./webpack.config.creator');

let compiler;

module.exports = viewPath => {
    console.log('building ' + viewPath);
    compiler = webpack(webpackConfigCreator([viewPath], {
        isProduction: true
    }));
    compiler.run((err, stats) => {
        // ...
    });
};
