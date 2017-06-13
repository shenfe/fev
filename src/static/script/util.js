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
