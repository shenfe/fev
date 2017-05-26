/**
 * Created by godzilla on 5/18/17.
 */

const util = require('SCRIPTS/util.js');

module.exports = {
    '/user': ({ id: uid = '0' }, onSuccess, onError) => {
        return util.request({
            url: '/user',
            data: { id: uid }
        }).then(res => {
            return res.json().then(onSuccess);
        }, err1 => {
            console.log(err1);
        }).catch(err2 => {
            console.log(err2);
            onError(err2);
        });
    }
};
