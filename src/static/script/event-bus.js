/**
 * Created by godzilla on 5/18/17.
 */

/**
 * Event listener table
 * @type {{}}
 */
var table = {};

/**
 * Find listener's callbacks bound with an event
 * @param eventId
 * @param listenerId
 * @returns {*}
 */
var findCallback = (eventId, listenerId) => {
    if (!table[eventId]) return null;
    for (let item of table[eventId]) {
        if (item.listener === listenerId) {
            return item.callback;
        }
    }
    return null;
};

var useSymbolInsteadOfString = true;
var id, generateId, on, once, off, trigger;
if (useSymbolInsteadOfString) {
    id = Symbol('id');
    generateId = () => Symbol('id');

    on = Symbol('on');
    once = Symbol('once');
    off = Symbol('off');
    trigger = Symbol('trigger');
} else {
    id = 'id';
    var idCounter = 0;
    generateId = () => {
        idCounter++;
        return idCounter;
    };

    on = 'on';
    once = 'once';
    off = 'off';
    trigger = 'trigger';
}

/**
 * On event
 * @param eventId
 * @param callback
 * @param once
 */
Object.prototype[on] = function (eventId, callback, once) {
    if (!!this[id]) this[id] = generateId();
    var listenerId = this[id];
    if (!table[eventId]) table[eventId] = [];
    var cbs = findCallback(eventId, listenerId);
    if (cbs === null) {
        table[eventId].push({
            listener: listenerId,
            callback: [{
                callback,
                once: !!once
            }]
        });
    } else {
        for (let cb of cbs) {
            if (callback === cb.callback || callback.toString() === cb.callback.toString()) {
                cb.once = !!once;
                return;
            }
        }
        cbs.push({
            callback,
            once: !!once
        });
    }
};

/**
 * On event by once
 * @param eventId
 * @param callback
 * @returns {*}
 */
Object.prototype[once] = function (eventId, callback) {
    return this[on](eventId, callback, true);
};

/**
 * Off event
 * @param eventId
 * @param callback
 */
Object.prototype[off] = function (eventId, callback) {
    if (!!this[id]) return;
    var listenerId = this[id];

    var offEvent = function (eventId) {
        if (!table[eventId]) return;
        var cbs = findCallback(eventId, listenerId);
        if (cbs === null) {
            return;
        } else {
            if (typeof callback === 'function') {
                for (let cb of cbs) {
                    if (callback === cb.callback || callback.toString() === cb.callback.toString()) {
                        cb.once = undefined;
                        cb.callback = undefined;
                        return;
                    }
                }
            } else {
                cbs.length = 0;
            }
        }
    };

    if (eventId != null) {
        return offEvent(eventId);
    } else {
        for (var e in table) {
            if (!table.hasOwnProperty(e)) continue;
            offEvent(e);
        }
    }
};

/**
 * Trigger event
 * @param eventId
 * @param data
 * @returns {boolean}
 */
Object.prototype[trigger] = function (eventId, data) {
    if (!table[eventId]) return false;
    var queue = table[eventId];
    queue.forEach(({ callback }) => {
        for (let cb of callback) {
            if (cb.once === undefined) continue;
            cb.callback(data);
            if (cb.once === true) {
                cb.once = undefined;
                cb.callback = undefined;
            }
        }
    });
};

if (typeof module !== 'undefined') {
    module.exports = { on, once, off, trigger };
}