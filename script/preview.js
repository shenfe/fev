/**
 * Created by godzilla on 5/18/17.
 */

const fs = require('fs');
const path = require('path');
let exec = require('child_process').exec;

const args = process.argv.slice(2);
args.forEach(function (val, index, array) {
    console.log(`${index}: ${val}`);
});

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const viewDir = 'src/view';

const helper = require('./helper.js');
const cwd = helper.cwd, getDirs = helper.getDirs;

const builder = require('./builder');

let viewList = getDirs(path.resolve(cwd, viewDir));

let prefixes = ['page-', 'module-', 'component-'];

if (!(args.length === 0 || (args.length === 1 && args[0] === 'all'))) {
    let table = {};
    args.forEach(arg => {
        if (prefixes.indexOf(arg) >= 0) {
            viewList.filter(fn => fn.startsWith(arg)).forEach(fn => {
                table[fn] = 1;
            });
        } else if (fs.lstatSync(path.resolve(cwd, viewDir, arg)).isDirectory()) {
            table[arg] = 1;
        } else {
            for (let prefix of prefixes) {
                if (fs.lstatSync(path.resolve(cwd, viewDir, prefix + arg)).isDirectory()) {
                    table[prefix + arg] = 1;
                    break;
                }
            }
        }
    });
    // viewList = args.filter(file => fs.lstatSync(path.resolve(cwd, viewDir, file)).isDirectory());
    viewList = Object.keys(table);
}

let launchDevServer = function () {
    /* Using dev-server through the Node.js API, with the devServer option ignored in webpack config */
    const devServerConfig = require('./webpack.devserver.config');
    const hostString = (devServerConfig.https ? 'https' : 'http') + `://${devServerConfig.host}:${devServerConfig.port}`;
    const webpackConfig = require('./webpack.config.creator')([], {
        isProduction: true,
        ru: `${hostString}/mock/ls.html`
    });
    const compiler = Webpack({
        entry: [path.resolve(cwd, `mock/ls.js?${hostString}`)],
        output: {
            publicPath: '/'
        },
        plugins: [
            function (compiler) {
                this.plugin('done', function (stats) {
                    // prepare the preview-list page file
                    helper.renderPreviewPage(viewList.map(p => {
                        if (p.startsWith('page-') || p.startsWith('module-') || p.startsWith('component-')) {
                            p = p.substr(p.indexOf('-') + 1);
                        }
                        return {
                            link: `/${p}.html`,
                            text: `${p}.html`
                        };
                    }));
                    require('open')((devServerConfig.https ? 'https' : 'http') + `://127.0.0.1:${devServerConfig.port}/ls.html`);
                    console.log('Webpack done!');
                });
            }
        ]
    });
    const devServer = new WebpackDevServer(compiler, devServerConfig);
    devServer.listen(devServerConfig.port, devServerConfig.host, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`WebpackDevServer listening at ${devServerConfig.host}:${devServerConfig.port}`);
        }
    });
};

// build the views
let defers = viewList.length;
viewList.forEach(function (v) {
    builder(v, function () {
        defers--;
        if (defers === 0) {
            launchDevServer();
        }
    });
});
