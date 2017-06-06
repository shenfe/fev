/**
 * Created by godzilla on 5/18/17.
 */

import './polyfill'

import * as pubsub from './util/pubsub'
import * as request from './util/request'
import * as url from './util/url'
import * as cookie from './util/cookie'
import * as storage from './util/storage'
import te from './util/velocity.min.js'

export default {
    pubsub,
    request,
    url,
    cookie,
    storage,
    render: (template, context, mode) => {
        let result = te.render(template, context);
        if (mode === 'raw') { /* server rendering */
            //TODO: hide data into output
        }
        return result;
    }
}
