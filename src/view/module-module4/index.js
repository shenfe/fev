/**
 * This is a self-render module.
 * Self-render modules are rendered with the document,
 * thus they are parts of the page script.
 */

console.log('Module4 is defined.');

const tmpl = require('./index.vm');

import { usePubSub, useVelocity } from 'SCRIPTS/decorator'

@usePubSub
@useVelocity
class Module4 {
    constructor() {
        let dt = new Date();
        this.createTime = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
    }
    render($container) {
        $container.innerHTML = this.tmpl(tmpl, {
            moduleName: 'module4'
        });

        this.ready($container);
    }
    ready($el) {
        $el.querySelector('[node-type="title"]').addEventListener('click', (e) => {
            alert(this.createTime);
            this.trigger('module4-clicked');
        }, false);
    }
}

export default Module4
