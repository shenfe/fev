/**
 * Created by godzilla on 5/18/17.
 */

var path = require('path');

module.exports = function (options) {
    options = options || {};
    var debug = (options.debug !== undefined) ? options.debug : true;

    var config = {
        entry: __dirname + '/src/main.js',
        output: {
            path: __dirname + '/dest',
            filename: '[name]-[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [],
        postcss: [
            require('autoprefixer')
        ]
    };

    if (debug) {
        config.devtool = 'eval-source-map';
    } else {

    }

    return config;
};
