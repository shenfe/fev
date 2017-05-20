/**
 * Created by keshen on 2017/5/20.
 */

var request = function ({
    url: url,
    type: type = 'get',
    data: data = {},
    promise: promise = false,
    success: resolve = () => {},
    error: reject = () => {}
}) {
    return fetch(url).then(resolve, reject);
};

export default request
