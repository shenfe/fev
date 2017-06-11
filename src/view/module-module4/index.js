/**
 * This is a self-render module.
 * Self-render modules are rendered with the document,
 * thus they are parts of the page script.
 */

console.log('Module4 is defined.');

const tmpl = require('./index.html');

import { render } from 'SCRIPTS/util'

export default class Module4 {
    constructor() {
        let dt = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        this.createTime = dt;
    }
    render($container) {
        $container.innerHTML = render(tmpl, {
            moduleName: 'module4'
        });

        this.ready($container);
    }
    ready($el) {
        $el.querySelector('[node-type="title"]').addEventListener('click', (e) => {
            alert(this.createTime);
        }, false);
    }
}
