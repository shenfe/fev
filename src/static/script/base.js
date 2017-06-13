/**
 * Created by godzilla on 6/11/17.
 */

import domready from './domready'

class Page {
    constructor() {
        domready(() => {
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
        $container = $container || document.body;
        data = data || {};
        this.$data = this.data(data, $container);
        this.$el = this.render($container) || $container;
        this.ready(this.$el);
    }
}

class Component {
    constructor() {}
}

export { Page, Module, Component }
