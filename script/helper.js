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

module.exports = {
    cwd,
    getDirs,
    isProduction
};