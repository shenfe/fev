/**
 * Created by godzilla on 5/18/17.
 */

module.exports = function (options) {
    options = options || {};
    var debug = (options.debug !== undefined) ? options.debug : true;

    var config = {
        entry: __dirname + '/src/main.js',
        output: {
            path: __dirname + '/dest',
            filename: '[name]-[hash].js',
            module: {
                loaders: [
                    {
                        test: /\.json$/,
                        loader: 'json'
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel'
                    },
                    {
                        test: /\.css$/,
                        loader: 'style!css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss'
                    }
                ]
            }
        },
        postcss: [
            require('autoprefixer')
        ],
        plugins: []
    };

    if (debug) {
        config.devtool = 'eval-source-map';
    } else {

    }

    return config;
};
