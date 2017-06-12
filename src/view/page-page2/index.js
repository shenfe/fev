/**
 * Created by godzilla on 6/10/17.
 */

require('STYLES/reset.css');
require('STYLES/global.css');

import module3 from './module-module3/index.js'
import module4 from 'VIEWS/module-module4/index.js'

import { documentReady } from 'SCRIPTS/util'

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
