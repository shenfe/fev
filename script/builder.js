/**
 * Created by godzilla on 5/24/17.
 */

const webpack = require('webpack');
const webpackConfigCreator = require('./webpack.config.creator');

module.exports = viewPath => {
    console.log('building ' + viewPath);
    webpack(webpackConfigCreator([viewPath], {
        isProduction: true
    }), (err, stats) => {
        // ...
    });
};
