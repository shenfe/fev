/**
 * Created by godzilla on 6/10/17.
 */

require('STYLES/reset.css');
require('STYLES/global.css');

import module3 from './module-module3/index.js'
import module4 from 'VIEWS/module-module4/index.js'

const documentReady = fn => {
    if (document.addEventListener) { // 标准浏览器
        document.addEventListener('DOMContentLoaded', function () {
            // 注销避免重复触发
            document.removeEventListener('DOMContentLoaded', fn, false);
            fn();
        }, false);
    } else if (document.attachEvent) { // IE浏览器
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                document.detachEvent('onreadystatechange', fn);
                fn();
            }
        });
    }
};

class Page2 {
    constructor() {
        this.$module3 = new module3();
        this.$module4 = new module4();

        documentReady(() => {
            this.ready(document.body);
        });
    }
    ready($el) {
        this.$module3.ready($el.querySelector('[module="module3"]'));
        this.$module4.render($el.querySelector('[module="module4"]'));
    }
    method1() {}
}

new Page2();
