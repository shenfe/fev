/**
 * Created by godzilla on 5/18/17.
 */

'use strict';

const webpack = require('webpack');

const fs = require('fs');
const path = require('path');

const helper = require('./helper');
const cwd = helper.cwd,
    isProduction = helper.isProduction,
    getDirs = helper.getDirs;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ManifestPlugin = require('webpack-manifest-plugin');

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');

const logUpdate = require('log-update');

const autoprefixer = require('autoprefixer');

/**
 * configuration: specifying pages
 */
let specifiedPages = {}; // or an array

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
                    || (name.startsWith('page-') && specifiedPages.indexOf(name.substr(5)) >= 0);
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

const templateExtract = absFilePath => {
    console.log('templateExtract: ' + absFilePath);
    let tmpl = helper.readFile(absFilePath);
    let findParses = helper.matchReg(tmpl, /(?:#parse\(")([^\(\)]*)(?:"\))/g)
        .concat(helper.matchReg(tmpl, /(?:#parse\(')([^\(\)]*)(?:'\))/g));
    let getFileDir = p => {
        let splitter = p.indexOf('/') >= 0 ? '/' : '\\';
        let dirs = p.split(splitter);
        dirs.pop();
        return dirs.join(splitter);
    };
    findParses.forEach(p => {
        tmpl = tmpl.replaceAll(p[0], templateExtract(path.resolve(getFileDir(absFilePath), p[1])));
    });
    return tmpl;
};

const pageTemplateRender = (filePath, options) => {
    let tmpl = templateExtract(path.resolve(cwd, 'src', filePath));
    return helper.makeFile(tmpl, options);
};

let devServerConfig = require('./webpack.devserver.config.js');

module.exports = (specifiedEntries, options) => {
    const pathPrefix = 'static/';
    specifiedPages = specifiedEntries;
    let entries = getPagesEntry();
    let isPro = (options && options.isProduction) || isProduction();

    let htmlWebpackPluginCreator = entries => Object.keys(entries).map(p => new HtmlWebpackPlugin({
            filename: `${p}.html`,
            excludeChunks: Object.keys(entries).filter(q => p !== q),
            templateContent: pageTemplateRender(entries[p].replace('.js', '.vm'), {
                title: p,
                description: `sample page ${p}`
            }),
            favicon: path.resolve(cwd, 'src/static/image/favicon.ico')
        })
    );

    let extractPageCss = new ExtractTextPlugin(`${pathPrefix}[name]/[name].[contenthash:7].css`);
    let extractCommonCss = new ExtractTextPlugin(`${pathPrefix}common/common.[contenthash:7].css`);
    return {
        devtool: isPro ? 'cheap-module-source-map' : 'eval-source-map',
        target: 'web',
        context: path.resolve(cwd, 'src'),
        entry: Object.assign(entries, {}),
        output: {
            path: path.resolve(cwd, 'dest'),
            publicPath: '/', // dev-server访问的路径
            filename: `${pathPrefix}[name]/[name].[chunkhash:7].js`
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
        watch: !isPro,
        devServer: isPro ? undefined : devServerConfig,
        performance: {
            hints: isPro ? 'error' : 'warning', // 当资源不符合性能规则时，以什么方式进行提示
            maxAssetSize: 400000, // 单个资源允许的最大文件容量，单位：字节，默认250kb
            maxEntrypointSize: 800000, // 单个入口模块引用的所有资源的最大文件容量，单位：字节，默认250kb
            assetFilter: function(assetFilename) { // 控制哪些文件需要进行性能检测
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
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
                    test: /\.(jpg|png|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                },
                { test: /\.(woff|woff2)$/, use: ['url-loader'] },
                {
                    test: /\.vm$/,
                    use: ['raw-loader']
                },
                {
                    test: /\.html/,
                    use: ['raw-loader']
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
                        use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }, 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: `${pathPrefix}[name]/[name].[chunkhash:7].js`,
                minChunks: function (module, count) {
                    // This prevents stylesheet resources with the .css or .scss extension
                    // from being moved from their original chunk to the vendor chunk
                    if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                        return false;
                    }
                    // This assumes your vendor imports exist in the node_modules directory
                    return module.context
                        && (module.context.indexOf('node_modules') !== -1
                        || module.context.split('\\').join('/').indexOf('src/static/script') !== -1);
                }
            }),
            extractCommonCss,
            extractPageCss,
            new WebpackMd5Hash(),
            // new ManifestPlugin(),
            // new ChunkManifestPlugin({
            //     filename: 'chunk-manifest.json',
            //     manifestVariable: 'webpackManifest'
            // }),
        ].concat(htmlWebpackPluginCreator(entries)).concat(isPro ? [
            new webpack.optimize.UglifyJsPlugin({ // 解析/压缩/美化所有js模块，通过配置except可以防止变量被改变
                sourceMap: true,
                mangle: {
                    except: []
                }
            })
        ] : [
            // new webpack.ProgressPlugin(function (percentage, msg) {
            //     logUpdate(percentage * 100 + '%', msg); // 实时更新编译进度，使用实时更新日志模块log-update
            // })
        ]).concat([
            // 自定义插件函数，函数会接受到webpack的编译对象compiler（用this同样也能获取到）
            function (compiler) {
                this.plugin('done', function (stats) { // 使用.plugin api增加自定义插件，'done'表示触发时机为编译结束后，stats表示编译生成的模块的详细信息
                    // 如果来自临时builder，则不进行后续操作
                    if (options && options.fromBuilder) return;

                    helper.renderPreviewPage(Object.keys(entries).map(p => {
                        return {
                            link: `/${p}.html`,
                            text: `${p}.html`
                        };
                    }));
                    // 在编译完成后控制自动唤起浏览器并打开页面
                    require('open')((options && options.ru)
                        ? options.ru
                        : ((devServerConfig.https ? 'https' : 'http') + `://127.0.0.1:${devServerConfig.port}/ls.html`));
                    console.log('Webpack done!');
                });
            }
        ]).concat([
            function (compiler) {
                this.plugin('done', function () {
                    options && options.done && options.done();
                });
            }
        ])
    };
};
