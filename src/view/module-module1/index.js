/**
 * Created by keshen on 2017/5/22.
 */

import api from 'CONTROLLERS/api'

import Component1 from 'VIEWS/component-component1'

export default {
    type: 'velocity',
    name: 'module-module1',

    // 如果数据需要通过js进行转换
    data: context => {
        return context;
    },

    // 如果数据需要使用另一个模板转换
    data: require('./data.vm'),

    // retrieve `this.data` from DOMs
    reData: function () {},

    // specify the main template; `index/*` will be imported by default
    template: require('./index.vm'),

    // will be DOMs as soon as the DOM is ready
    elements: {
        list: '[node-type="list"]'
    },

    methods: {
        renderList() {
            this.data.list.forEach(item => {
                React.render(Component1({
                    onClick: () => alert(item.text + 'clicked!'),
                    complete: item.completed || false,
                    text: item.text
                }), this.find('[node-type="list"]'));
            });
        }
    },

    // get data from DOMs, bind events, and so on
    ready: function () {}
}