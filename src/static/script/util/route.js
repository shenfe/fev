/**
 * Created by keshen on 2017/5/20.
 */

/* helper functions */

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

const TypeOf = function (v) {
    let t = Object.prototype.toString.call(v);
    return t.substring(8, t.length - 1).toLowerCase();
};

const MethodRedirector = function (args, pattern, target) {
    args = [].slice.call(args);
    let methodName = pattern[args.map(TypeOf).join(',')] || '';
    if (methodName.startsWith('static ')) {
        methodName = methodName.split(' ').pop();
        return target.constructor[methodName].apply(target.constructor, args);
    } else if (methodName === 'this') {
        return new target(...args);
    } else {
        return target[methodName].apply(target, args);
    }
};


/* symbols */

const __href__ = Symbol('href');


/* main class */

class Route {
    constructor() {
        if (arguments.length === 0) {
            this.href = window.location.href;
            return;
        }
        this.constructor$.apply(this, [].slice.call(arguments));
    }

    constructor$() {
        let pattern = {
            'string': 'constructor$1',
            'object': 'constructor$2'
        };
        return MethodRedirector(arguments, pattern, this);
    }

    constructor$1(href) {
        this.href = href;
    }

    constructor$2(obj) {}

    get href() {
        return this[__href__];
    }
    set href(v) {
        let a = document.createElement('a');
        a.href = v;
        this[__href__] = a.href;
        this.origin = a.origin;
        this.protocol = a.protocol;
        this.host = a.host;
        this.hostName = a.hostname;
        this.port = a.port;
        this.path = a.pathname;
        this.queryString = a.search;
        this.hash = a.hash;
    }

    get queryString() {
        return ObjectToQueryString(this.query);
    }
    set queryString(v) {
        this.query = QueryStringToObject(v);
    }

    static current() {
        return new this(window.location.href);
    }

    static create() {
        let pattern = {
            '': 'current',
            'string': 'this',
            'object': 'this'
        };
        return MethodRedirector(arguments, pattern, this);
    }
}

export default Route