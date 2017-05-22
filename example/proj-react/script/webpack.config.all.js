/**
 * Created by keshen on 2017/5/22.
 */

module.exports = {
    devtool: 'eval-source-map',

    entry:  __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', // 在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};