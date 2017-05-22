import util from '/static/script/util'
import helper from '/static/script/helper'

import module1 from '/view/module-module1'
import module2 from './module-module2'

import headerStyle from './header.scss'
import footerTemplate from './footer.html'

import other from './other'

const method2 = Symbol('method2');

export default class Page1 {
    constructor(data) {}

    method1() {}

    [method2]() {}

    static method3() {}
}
