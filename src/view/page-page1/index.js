require('STYLES/reset.css');
require('STYLES/global.css');

import * as util from 'SCRIPTS/util'
import helper from 'SCRIPTS/helper'

var modules = {
    module1: require('VIEWS/module-module1'),
    module2: require('./module-module2/index.vue')
};

import headerStyle from './header.scss'
var footerTemplate = require('./footer.html');

import other from './other'

const method2 = Symbol('method2');

const $ = function (sel) {
    return window.document.querySelector(sel);
};

class Page1 {
    // dom ready
    constructor() {
        this.modules = {};
        for (let moduleId in modules) {
            console.log(moduleId, modules[moduleId]);
            // this[moduleId] = new modules[moduleId]($(moduleId));
        }
    }

    method1() {}

    [method2]() {}

    static method3() {}
}

new Page1();

export default Page1