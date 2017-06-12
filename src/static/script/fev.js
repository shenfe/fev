/**
 * Created by godzilla on 6/11/17.
 */

import { documentReady } from 'SCRIPTS/util'

class Page {
    constructor() {
        documentReady(() => {
            this.$el = document.body;
            window.setTimeout(() => {
                this.ready(document.body);
            }, 0);
        });
    }
    ready($body) {}
}

class Module {
    constructor($container, data) {
        this.$data = this.data(data, $container);
        this.$el = this.render($container) || $container;
        this.ready(this.$el);
    }
}

class Component {
    constructor() {}
}

export { Page, Module, Component }
