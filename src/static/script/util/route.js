/**
 * Created by keshen on 2017/5/20.
 */

import { redirector } from './decorator'

const ObjectToQueryString = obj => {
    var queries = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        queries.push(i + '=' + encodeURIComponent(obj[i]));
    }
    return queries.length ? ('?' + queries.join('&')) : '';
};

const QueryStringToObject = str => {
    if (typeof str !== 'string' || str === '' || str === '?') return {};

    if (str.charAt(0) === '?') str = str.substr(1);

    return str.split('&').filter(v => v.indexOf('=') >= 0)
        .map(v => v.split('=').map(decodeURIComponent))
        .filter(v => v.length === 2)
        .reduce((prev, next) => {
            prev[next[0]] = next[1];
            return prev;
        }, {});
};

const href = Symbol('href');

class Route {
    constructor() {
        this.constructor$.apply(this, [].slice.call(arguments));
    }

    @redirector({
        '': 'static current',
        'string': 'constructor$1',
        'object': 'constructor$2'
    })
    constructor$() {}

    constructor$1(href) {
        if (typeof document === 'object' && document.createElement) {
            let a = document.createElement(href);
            a.href = href;
            this[href] = a.href;
            this.hash = a.hash;
            this.queryString = a.search;
        }
    }

    constructor$2(obj) {}

    get href() {
        return this[href];
    }

    get hash() {}
    set hash(v) {}

    get queryString() {}
    set queryString(v) {
        this.query = QueryStringToObject(v);
    }

    get path() {}

    static current() {
        return new this(window.location.href);
    }

    @redirector({
        '': 'current',
        'string': 'this',
        'object': 'this'
    })
    static create() {}
}

export default Route