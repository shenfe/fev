require('STYLES/reset.css');
require('STYLES/global.css');

import * as util from 'SCRIPTS/util'
import helper from 'SCRIPTS/helper'

var module1 = require('VIEWS/module-module1');
var module2 = require('./module-module2/index.vue');

import headerStyle from './header.scss'
var footerTemplate = require('./footer.html');

import other from './other'

const method2 = Symbol('method2');

export default class Page1 {
    constructor(data) {}

    method1() {}

    [method2]() {}

    static method3() {}
}
