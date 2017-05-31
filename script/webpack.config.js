/**
 * Created by godzilla on 5/18/17.
 */

'use strict';

const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPageCss = new ExtractTextPlugin('[name].[contenthash:7].css');
const extractCommonCss = new ExtractTextPlugin('common.[contenthash:7].css');

const ManifestPlugin = require('webpack-manifest-plugin');

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');

const autoprefixer = require('autoprefixer');

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
        publicPath: '/dest/', // webpack-dev-server访问的路径
        filename: isProduction() ? '[name].[chunkhash:7].js' : '[name].js',
        chunkFilename: isProduction() ? '[name].[chunkhash:7].js' : '[name].js',
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
                include: [
                    path.resolve(cwd, 'src/view')
                ],
                use: extractPageCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [require('autoprefixer')()]
                        }
                    }]
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: [
                    path.resolve(cwd, 'src/view')
                ],
                use: extractPageCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(cwd, 'src/static')
                ],
                use: extractCommonCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [require('autoprefixer')()]
                        }
                    }]
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: [
                    path.resolve(cwd, 'src/static')
                ],
                use: extractCommonCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: isProduction() ? 'vendor.[chunkhash:7].js' : 'vendor.js',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context
                    && (module.context.indexOf('node_modules') !== -1
                    || module.context.indexOf('src/static/script') !== -1);
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: isProduction() ? 'common.[chunkhash:7].css' : 'common.css',
        //     minChunks: function (module) {
        //         return module.context
        //             && (module.context.indexOf('src/static/style') !== -1);
        //     }
        // }),
        extractPageCss,
        extractCommonCss,
        new WebpackMd5Hash(),
        new ManifestPlugin(),
        new ChunkManifestPlugin({
            filename: 'chunk-manifest.json',
            manifestVariable: 'webpackManifest'
        })
    ]
};
