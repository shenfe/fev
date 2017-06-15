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

const viewDir = 'src/view';

const { cwd, getDirs } = require('./helper.js');

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

// prepare the preview-list page file
fs.writeFileSync(path.resolve(cwd, 'mock/ls.html'),
    viewList.map(p => {
        if (p.startsWith('page-') || p.startsWith('module-') || p.startsWith('component-')) {
            p = p.substr(p.indexOf('-') + 1);
        }
        return `<div><a href="/dest/${p}.html">${p}.html</a></div>`;
    }).join(''));

// build the views
viewList.forEach(builder);

if (viewList.length) {
    let port = 9000;
    exec(`python -m SimpleHTTPServer ${port}`, { encoding: 'utf8' }, function (err, stdout, stderr) {
        if (err) {
            console.log('set up server error: ' + stderr);
        } else {
            var data = stdout; // JSON.parse(stdout);
            console.log(data);
            require('open')(`http://127.0.0.1:${port}/mock/ls.html`);
        }
    });
}
