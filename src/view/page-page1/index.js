import util from '/static/script/util'
import helper from '/static/script/helper'

var module1 = require('/view/module-module1');
var module2 = require('./module-module2');

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
