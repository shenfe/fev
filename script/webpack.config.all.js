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
            filename: 'bundle.js',
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
                        loader: 'style!css?modules!postcss'
                    }
                ],
                plugins: []
            }
        },
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
