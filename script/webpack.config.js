/**
 * Created by godzilla on 5/18/17.
 */

const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCommonCss = new ExtractTextPlugin('static/common.css');
const extractPageCss = new ExtractTextPlugin('[name].css');

const { cwd, isProduction, getDirs } = require('./helper');

/**
 * configuration: specifying pages
 */
const specifiedPages = {}; // or an array

const getPagesEntry = () => {
    let folders = getDirs(path.resolve(cwd, 'src/view'));
    if (typeof specifiedPages === 'undefined'
        || !specifiedPages || specifiedPages.length === 0
        || Object.keys(specifiedPages).length === 0) {
        return folders.filter(name => name.startsWith('page-'))
            .reduce((prev, next) => {
                prev[next.substr(5)] = `view/${next}/index.js`;
                return prev;
            }, {});
    } else {
        if (Object.prototype.toString.call(specifiedPages) === '[object Array]') {
            return folders.filter(name => {
                return specifiedPages.indexOf(name) >= 0
                    || (name.startsWith('page-') && specifiedPages.indexOf(name.subtr(5)) >= 0);
            })
                .reduce((prev, next) => {
                    prev[next.startsWith('page-') ? next.substr(5) : next] = `view/${next}/index.js`;
                    return prev;
                }, {});
        } else {
            let re = {};
            for (let p in specifiedPages) {
                if (folders.indexOf(specifiedPages[p]) >= 0) {
                    re[p] = `view/${specifiedPages[p]}/index.js`;
                }
            }
            return re;
        }
    }
};

module.exports = {
    devtool: isProduction() ? 'cheap-module-source-map' : 'eval-source-map',
    context: path.resolve(cwd, 'src'),
    entry: Object.assign(getPagesEntry(), {
        vendor: ['static/script']
    }),
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
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'] // 指定公共 bundle 的名字
        })
    ]
};