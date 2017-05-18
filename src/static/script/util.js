/**
 * Created by godzilla on 5/18/17.
 */

var ajax = function ({
    url: url,
    type: type = 'get',
    data: data = {},
    promise: promise = false,
    success: resolve = () => {},
    error: reject = () => {}
}) {
    return fetch(url).then(resolve, reject);
};

var route = function (url) {
    url = url === undefined ? window.location.href : url;
};

var cookie = function () {};

module.exports = {
    ajax,
    route,
    cookie
};
