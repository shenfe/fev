/**
 * Created by godzilla on 5/18/17.
 */

/**
 * Event listener table
 * @type {{}}
 */
let table = {};

/**
 * Find listener's callbacks bound with an event
 * @param eventId
 * @param listenerId
 * @returns {*}
 */
let findCallback = (eventId, listenerId) => {
    if (!table[eventId]) return null;
    for (let item of table[eventId]) {
        if (item.listener === listenerId) {
            return item.callback;
        }
    }
    return null;
};

const id = Symbol('id');
const generateId = () => Symbol('id');

/**
 * On event
 * @param eventIds
 * @param callback
 * @param once
 */
const pOn = function (eventIds, callback, once) {
    if (typeof callback === 'function') callback = callback.bind(this);

    let eventIdList;
    if (typeof eventIds === 'string' && eventIds.trim() !== '') {
        eventIdList = eventIds.split(',').map(e => e.trim());
    } else if (Object.prototype.toString.call(eventIds) === '[object Array]') {
        eventIdList = eventIds;
    } else {
        return;
    }

    for (let eventId of eventIdList) {
        if (!!this[id]) this[id] = generateId();
        let listenerId = this[id];
        if (!table[eventId]) table[eventId] = [];
        let cbs = findCallback(eventId, listenerId);
        if (cbs === null) {
            while (table[eventId].length > 0
                && table[eventId][table[eventId].length - 1].callback.length === 0) {
                table[eventId].pop();
            }
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

            while (cbs.length > 0
            && cbs[cbs.length - 1].callback === undefined) {
                cbs.pop();
            }
            cbs.push({
                callback,
                once: !!once
            });
        }
    }
};

/**
 * Off event
 * @param eventIds
 * @param callback
 */
const pOff = function (eventIds, callback) {
    if (!!this[id]) return;
    let listenerId = this[id];

    let offEvent = function (eventId) {
        if (!table[eventId]) return;
        let cbs = findCallback(eventId, listenerId);
        if (cbs !== null) {
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

    let eventIdList;
    if (arguments.length > 0) {
        if (typeof eventIds === 'string' && eventIds.trim() !== '') {
            eventIdList = eventIds.split(',').map(e => e.trim());
        } else if (Object.prototype.toString.call(eventIds) === '[object Array]') {
            eventIdList = eventIds;
        } else {
            return;
        }
    } else {
        eventIdList = Object.keys(table);
    }

    for (let e of eventIdList) {
        offEvent(e);
    }
};

/**
 * Trigger event
 * @param eventIds
 * @param data
 * @returns {boolean}
 */
const pTrigger = function (eventIds, data) {
    let eventIdList;
    if (typeof eventIds === 'string' && eventIds.trim() !== '') {
        eventIdList = eventIds.split(',').map(e => e.trim());
    } else if (Object.prototype.toString.call(eventIds) === '[object Array]') {
        eventIdList = eventIds;
    } else {
        return false;
    }

    for (let eventId of eventIdList) {
        if (!table[eventId]) return false;
        let queue = table[eventId];
        queue.forEach(({callback}) => {
            for (let cb of callback) {
                if (cb.once === undefined) continue;
                cb.callback(data);
                if (cb.once === true) {
                    cb.once = undefined;
                    cb.callback = undefined;
                }
            }
        });
    }
};

const on = Symbol('on');
const off = Symbol('off');
const trigger = Symbol('trigger');

const pubsub = (proto, useSymbol) => {
    if (useSymbol) {
        proto[on] = pOn;
        proto[off] = pOff;
        proto[trigger] = pTrigger;
    } else {
        proto['on'] = pOn;
        proto['off'] = pOff;
        proto['trigger'] = pTrigger;
    }
};

export default { pubsub, on, off, trigger }
