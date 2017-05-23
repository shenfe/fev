/**
 * Created by godzilla on 5/18/17.
 */

var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

module.exports = {
    devtool: isProduction() ? 'cheap-module-source-map' : 'eval-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        page1: './view/page-page1/index.js',
        vendor: ['./static/script']
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: '[name]-[hash].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'script'),
            'node_modules'
        ],
        alias: {
            SCRIPTS: path.resolve(__dirname, 'src/static/script/'),
            STYLES: path.resolve(__dirname, 'src/static/style/'),
            CONTROLLERS: path.resolve(__dirname, 'src/controller/'),
            VIEWS: path.resolve(__dirname, 'src/view/')
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
                use: ['webpack-vm-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
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