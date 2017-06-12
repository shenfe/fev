/**
 * Created by godzilla on 5/18/17.
 */

import './polyfill'

import pubsub from './util/pubsub'
import request from './util/request'
import url from './util/url'
import cookie from './util/cookie'
import storage from './util/storage'

export {
    pubsub,
    request,
    url,
    cookie,
    storage
}

const vlc = require('./util/velocity.js');
const render = (template, context, mode) => {
    let result = vlc.render(template, context);
    if (mode === 'raw') { /* server rendering */
        //TODO: hide data into output
    }
    return result;
};

export { render }

export function documentReady(fn) {
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
