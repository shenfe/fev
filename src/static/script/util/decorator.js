/**
 * Created by keshen on 2017/5/20.
 */

function getTypeOf(v) {
    let t = Object.prototype.toString.call(v);
    return t.substring(8, t.length - 1).toLowerCase();
}

function redirector(obj) {
    let pattern = obj;
    return function (target, name, descriptor) {
        descriptor.value = function () {
            let args = [].slice.call(arguments);
            let method = pattern[args.map(getTypeOf).join(',')];
            if (method.startsWith('static ')) {
                method = method.split(' ');
                return descriptor[method[method.length - 1]].apply(descriptor, args);
            } else if (method === 'this') {
                return new target(...args);
            } else {
                return target[method].apply(this, args);
            }
        };

        return descriptor;
    };
}

export default { redirector }