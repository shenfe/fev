/**
 * Modified by keshen on 2017/5/20.
 */

/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */

function extend () {
    let args = [].slice.call(arguments, 0);
    return args.reduce((prev, next) => {
        for (var key in next) {
            prev[key] = next[key];
        }
        return prev;
    }, {});
}

function init () {
    function api (key, value, attributes) {
        var result;
        if (typeof document === 'undefined') {
            return;
        }

        // Write

        if (arguments.length > 1) {
            if (typeof key !== 'string' || typeof value !== 'string') return false;

            attributes = extend({
                path: '/'
            }, api.defaults, attributes);

            if (typeof attributes.expires === 'number') {
                var expires = new Date();
                expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                attributes.expires = expires;
            }

            // We're using "expires" because "max-age" is not supported by IE
            attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

            value = encodeURIComponent(String(value))
                .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

            key = encodeURIComponent(String(key));
            key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
            key = key.replace(/[\(\)]/g, escape);

            var stringifiedAttributes = '';

            for (var attributeName in attributes) {
                if (!attributes[attributeName]) {
                    continue;
                }
                stringifiedAttributes += '; ' + attributeName;
                if (attributes[attributeName] === true) {
                    continue;
                }
                stringifiedAttributes += '=' + attributes[attributeName];
            }
            return (document.cookie = key + '=' + value + stringifiedAttributes);
        }

        // Read

        if (key === undefined) {
            result = {};
        } else if (typeof key !== 'string') {
            return false;
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling "get()"
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var rdecode = /(%[0-9A-Z]{2})+/g;

        for (let eachCookie of cookies) {
            var parts = eachCookie.split('=');
            var cookie = parts.slice(1).join('=');

            if (cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }

            try {
                var name = parts[0].replace(rdecode, decodeURIComponent);
                cookie = cookie.replace(rdecode, decodeURIComponent);

                if (key === name) {
                    result = cookie;
                    break;
                }

                if (!key) {
                    result[name] = cookie;
                }
            } catch (e) {}
        }

        return result;
    }

    api.set = api;
    api.get = function (key) {
        return api.call(api, key);
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
        api(key, '', extend(attributes, {
            expires: -1
        }));
    };

    return api;
}

var cookie = init();

export default cookie