const vlc = require('../util/velocity.js');

export function useVelocity(targetClass) {
    targetClass.prototype.tmpl = (template, context) => {
        return vlc.render(template, context);
    };
}
