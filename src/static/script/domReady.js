/**
 * DomReady
 * @refer https://github.com/ded/domready/blob/master/ready.js
 */

let fns = [],
    listener, doc = window.document,
    hack = doc.documentElement.doScroll,
    domContentLoaded = 'DOMContentLoaded',
    loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

if (!loaded) {
    doc.addEventListener(domContentLoaded, listener = function () {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while (listener = fns.shift()) listener();
    });
}

export default function domReady(fn) {
    loaded ? window.setTimeout(fn, 0) : fns.push(fn)
}
