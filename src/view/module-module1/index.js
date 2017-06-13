/**
 * Created by keshen on 2017/5/22.
 */

import api from 'CONTROLLERS/api'

// import React from 'react'
import ReactDom from 'react-dom'

import { Component1 } from 'VIEWS/component-component1/index.jsx'

import { usePubSub, useVelocity } from 'SCRIPTS/decorator'

import { Module } from 'SCRIPTS/base'
// import { name } from 'SCRIPTS/decorator'

const tmpl = require('./index.vm');

// @name('module1')
@usePubSub
@useVelocity
class Module1 extends Module {
    constructor($container, data) {
        super($container, data);
    }

    // 如果是pre-render，数据从DOM中获取
    // 如果是self-render，数据或需要转换
    data(context) {
        return {
            component1: {
                color: 'red'
            }
        };
    }

    // specify the main template; `index/*` will be imported by default
    // template: require('./index.vm'),

    // will be DOMs as soon as the DOM is ready
    // elements: {
    //     list: '[node-type="list"]'
    // },

    render($container) {
        $container.innerHTML = this.tmpl(tmpl, {
            moduleName: 'module1'
        });
    }

    renderList() {
        ReactDom.render(Component1({
            onClick: () => alert('module1 let component1 be clickable'),
            color: this.$data.component1.color,
            text: 'component1'
        }), this.$el.querySelector('[component="component1"]'));
    }

    ready($el) {
        this.renderList();
    }
}

module.exports = Module1;
