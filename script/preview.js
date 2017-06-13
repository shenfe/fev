/**
 * Created by godzilla on 5/18/17.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
args.forEach(function (val, index, array) {
    console.log(`${index}: ${val}`);
});

const viewDir = 'src/view';

const { cwd, getDirs } = require('./helper.js');

const builder = require('./builder');

let viewList = getDirs(path.resolve(cwd, viewDir));

if (!(args.length === 0 || (args.length === 1 && args[0] === 'all'))) {
    viewList = args.filter(file => fs.lstatSync(path.resolve(cwd, viewDir, file)).isDirectory());
}

// build the views
viewList.forEach(builder);

fs.writeFileSync(path.resolve(cwd, 'mock/ls.html'),
    viewList.map(p => {
        if (p.startsWith('page-') || p.startsWith('module-') || p.startsWith('component-')) {
            p = p.substr(p.indexOf('-') + 1);
        }
        return `<div><a href="/${p}.html">${p}.html</a></div>`;
    }).join(''));
