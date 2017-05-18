/**
 * Created by godzilla on 5/18/17.
 */

var table = {};

var callbackQueueHas = (eventId, listenerId) => {
    if (!table[eventId]) return false;
    for (let item of table[eventId]) {
        if (item.listener === listenerId) {
            return item;
        }
    }
    return false;
};

module.exports = {
    on: (eventId, callback) => {
        var listenerId = this.guid || 'unknown';
        if (!table[eventId]) table[eventId] = [];
        var check = callbackQueueHas(eventId, listenerId);
        if (check === false) {
            table[eventId].push({
                listener: listenerId,
                callback: [callback]
            });
        } else {
            var callbackList = check.callback;
            for (let cb of callbackList) {
                if (callback === cb) return;
            }
            callbackList.push(callback);
        }
    },
    once: (id, callback) => {},
    off: (id, callback) => {},
    trigger: data => {}
};
