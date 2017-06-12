/**
 * This is a pre-render module.
 * Pre-render modules are rendered with the document,
 * thus they are parts of the page template.
 */

console.log('Module3 is defined.');

import { usePubSub } from 'SCRIPTS/decorator'

@usePubSub
class Module3 {
    constructor() {
        let dt = new Date();
        this.createTime = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        this.on('module4-clicked', function () {
            console.log('module3 hears module4 clicked');
        });
    }
    ready($el) {
        $el.querySelector('[node-type="title"]').addEventListener('click', (e) => {
            alert(this.createTime);
        }, false);
    }
}

export default Module3
