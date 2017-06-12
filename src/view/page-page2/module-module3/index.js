/**
 * This is a pre-render module.
 * Pre-render modules are rendered with the document,
 * thus they are parts of the page template.
 */

console.log('Module3 is defined.');

export default class Module3 {
    constructor() {
        let dt = new Date();
        this.createTime = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
    }
    ready($el) {
        $el.querySelector('[node-type="title"]').addEventListener('click', (e) => {
            alert(this.createTime);
        }, false);
    }
}
