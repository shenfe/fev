require('STYLES/reset.css');
require('STYLES/global.css');

// import * as util from 'SCRIPTS/util'
import helper from 'SCRIPTS/helper'

import Vue from 'vue'

var modules = {
    module1: require('VIEWS/module-module1'),
    module2: require('./module-module2/index.vue')
};

import headerStyle from './header.scss'
var footerTemplate = require('./footer.html');

const method2 = Symbol('method2');

import { Page } from 'SCRIPTS/base'

class Page1 extends Page {
    // dom ready
    constructor() {
        super();
        this.modules = {};
    }

    method1() {}

    [method2]() {}

    static method3() {}

    ready($body) {
        for (let moduleId in modules) {
            if (modules[moduleId].type === 'vue') {
                modules[moduleId].el = `[module="${moduleId}"]`;
                this[moduleId] = new Vue(modules[moduleId]);
            } else {
                this[moduleId] = new modules[moduleId]($body.querySelector(`[module="${moduleId}"]`));
            }
        }
    }
}

new Page1();

export default Page1
