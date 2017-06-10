/**
 * Created by godzilla on 6/10/17.
 */

require('STYLES/reset.css');
require('STYLES/global.css');

import * as util from 'SCRIPTS/util'
import helper from 'SCRIPTS/helper'

const $ = function (sel) {
    return window.document.querySelector(sel);
};

const module3 = require('./module-module3/index.html');

class Page2 {
    // dom ready
    constructor() {
        let $module3 = $('module3');
        $module3.outerHTML = $module3.outerHTML.replace(/module3/g, 'div');
        $module3.innerHTML = module3;
    }

    method1() {}
}

new Page2();