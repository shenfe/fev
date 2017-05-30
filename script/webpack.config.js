/**
 * Created by godzilla on 5/18/17.
 */

'use strict';

const webpack = require('webpack');

const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCommonCss = new ExtractTextPlugin('static/common.css');
const extractPageCss = new ExtractTextPlugin('[name].css');

const helper = require('./helper');
const cwd = helper.cwd,
    isProduction = helper.isProduction,
    getDirs = helper.getDirs;

/**
 * configuration: specifying pages
 */
const specifiedPages = {}; // or an array

const getPagesEntry = () => {
    let folders = getDirs(path.resolve(cwd, 'src/view'));
    let ps;
    if (typeof specifiedPages === 'undefined'
        || !specifiedPages || specifiedPages.length === 0
        || Object.keys(specifiedPages).length === 0) {
        ps = folders.filter(name => name.startsWith('page-'))
            .reduce((prev, next) => {
                prev[next.substr(5)] = `./view/${next}/index.js`;
                return prev;
            }, {});
    } else {
        if (Object.prototype.toString.call(specifiedPages) === '[object Array]') {
            ps = folders.filter(name => {
                return specifiedPages.indexOf(name) >= 0
                    || (name.startsWith('page-') && specifiedPages.indexOf(name.subtr(5)) >= 0);
            })
                .reduce((prev, next) => {
                    prev[next.startsWith('page-') ? next.substr(5) : next] = `./view/${next}/index.js`;
                    return prev;
                }, {});
        } else {
            let re = {};
            for (let p in specifiedPages) {
                if (folders.indexOf(specifiedPages[p]) >= 0) {
                    re[p] = `./view/${specifiedPages[p]}/index.js`;
                }
            }
            ps = re;
        }
    }

    console.log(ps);
    return ps;
};

module.exports = {
    devtool: isProduction() ? 'cheap-module-source-map' : 'eval-source-map',
    context: path.resolve(cwd, 'src'),
    entry: Object.assign(getPagesEntry(), {}),
    output: {
        path: path.resolve(cwd, 'dest'),
        filename: '[name]-[hash].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(cwd, 'script'),
            'node_modules'
        ],
        alias: {
            SCRIPTS: path.resolve(cwd, 'src/static/script/'),
            STYLES: path.resolve(cwd, 'src/static/style/'),
            CONTROLLERS: path.resolve(cwd, 'src/controller/'),
            VIEWS: path.resolve(cwd, 'src/view/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.vm$/,
                use: ['vm-loader']
            },
            {
                test: /\.css$/,
                use: extractCommonCss.extract([ 'css-loader', 'postcss-loader' ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor', 'manifest'] // 指定公共 bundle 的名字
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                console.log(module.context);
                return module.context
                    && (module.context.indexOf('node_modules') !== -1
                    || module.context.indexOf('src/static') !== -1);
            }
        })
    ]
};
