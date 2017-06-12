/**
 * Created by godzilla on 5/24/17.
 */

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

const getDirs = srcPath => {
    srcPath = path.resolve(__dirname, srcPath || './');
    return fs.readdirSync(srcPath)
        .filter(file => fs.lstatSync(path.resolve(srcPath, file)).isDirectory());
};

const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

const read = fileName => fs.readFileSync(fileName, 'utf8');

const vlc = require('./helper/velocity');

const render = (template, context) => vlc.render(template, context);

const matchReg = (string, regexp) => {
    let match, result = [];
    while ((match = regexp.exec(string)) != null) {
        result.push(match);
    }
    return result;
};

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
}

module.exports = {
    cwd,
    getDirs,
    isProduction,
    readFile: read,
    makeFile: render,
    matchReg
};
