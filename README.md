# fev

A simple and universal architecture for frontend projects.

    .
    ├── README.md                 # project document
    ├── package.json              # project profile
    ├── src                       # source files
    │   ├── controller/               # controller roles
    │   ├── view/                     # view fragments
    │   └── static/                   # static resources
    ├── dest/                     # built files
    ├── mock/                     # mock data
    └── script/                   # development scripts


## `src/` => `dest/`

`controller`、`view`、`static` 路径下的代码最终会被合入 `static`，如：

    └── src
        │
        ├── controller                    # controllers
        │   │
        │   ├── api.js                        #   API controller file (if necessary), APIs (and hooks)
        │   ├── event.js                      # event controller file (if necessary), events (and hooks)
        │   ├── route.js                      # route controller file (if necessary), routes (and hooks)
        │   ├── store.js                      # store controller file (if necessary), stored status (and hooks)
        │   └── ...
        │
        ├── view                          # views
        │   │
        │   ├── page-page1/                   # view fragment folder, page1
        │   ├── module-module1/               # view fragment folder, module1
        │   ├── component-component1/         # view fragment folder, component1
        │   └── ...
        │
        └── static                        # common static files
            │
            ├── script                        # common scripts
            │   │
            │   ├── helper.js
            │   ├── util.js
            │   └── ...
            │
            └── style                         # common styles
                │
                ├── reset.css
                ├── global.css
                └── ...

最终合并为：

    └── dest
        │
        └── static
            │
            ├── api.js
            ├── event.js
            ├── route.js
            ├── store.js
            ├── ...
            │
            ├── page-page1/
            ├── module-module1/
            ├── component-component1/
            ├── ...
            │
            ├── script/
            └── style/

并经过编译打包，如：

    └── dest
        │
        ├── page
        │   │
        │   ├── page1.html
        │   ├── page2.html
        │   └── ...
        │
        └── static
            │
            ├── app.js
            │
            ├── page1.js
            ├── page1.css
            ├── page2.js
            ├── page2.css
            ├── ...
            │
            ├── common.js
            └── common.css

因此：

    dest.static = pack(src.controller ∪ src.view ∪ src.static)

### 项目源码的调用关系

    view  ──────>  controller
      │              │
      │              │
      │              v
      └─────────>  static


## `package.json` => `script/`

All dev script entrances are defined in `package.json` file, and starting with `npm run`. `npm` commands will invoke
scripts in the `script` directory, where there are webpack config files, self-defined webpack loaders and plugins,
gulp config files, server-running scripts, or other self-defined processing scripts.

### development or production

Build for development environment or production environment.

`$ npm run dev`

`$ npm run pro`

### server

Run a web server for development to serve pages, resources and mock data.

`$ npm run server`

### preview

Preview a page, module, component, or all.

`$ npm run preview -- ./module-module1 ./page-page1`

`$ npm run preview`

### proxy

Run an extra server for proxy requests or resources.

`$ npm run proxy`


## `mock/`

All mock data.


## 组件的编写

把`view/`中的 page、module、component 统称为组件。组件对任何外部或内部的依赖，都在 js 中使用 require 或 import 引入。

一般地，组件最终导出为一个 function，function 可以是类，也可以不是类；组件还可以导出一个 object，像 `*.vue` 单文件那样，导出的 object 用于 Vue 的构造函数创建 Vue 组件实例 。

### 引入 js 类库

    var helper = require('/static/script/helper');
    import other from './other'

### 引入 css 样式

    require('./index.css'); // 如果在 index.js 中则无需 index.css

### 引入其他组件

    var module1 = require('/view/module-module1');
    var module2 = require('./module-module2');

### 引入 html 模板

    var headerTemplate = require('./header.tpl');
    var footerTemplate = require('./footer.vm');

### 编写组件类

    class MyComponent {
        constructor(props) {/**/}
        render() {/**/}
    }
    export default MyComponent

或者

    var MyComponent = function (props) {/**/};
    MyComponent.prototype.render = function () {/**/};
    module.exports = MyComponent;

### 编写函数式组件

    const MyComponent = (props) => {/**/}
    export default MyComponent

或者

    var MyComponent = function (props) {/**/};
    module.exports = MyComponent;

### 编写对象构造组件

`*.vue` 单文件是典型的将 Vue 组件抽象成一个 object，包含了 Vue 组件构造函数所需的组件信息。

例如在一个 `*.vue` 文件中：

    export default {
        name: 'MyComponent',
        data() {
            return {/**/}
        },
        methods: {/**/}
    };
    
`*.vue` 文件导出的组件默认为 Vue 组件类型。而一般地，组件要导出为一个 object，请指明组件的类型，即它最终会被传入哪种构造函数进而构造出实例。

    var MyComponent = {
        type: 'velocity',
        
        // 如果数据需要通过js进行转换
        data: function (data) {
            return data;
        },
        
        // 如果数据需要使用另一个模板转换
        data: require('./data.vm'),
        
        template: require('./index.vm'),
        
        // will be DOMs as soon as the DOM is ready
        elements: {
            el1: '#el1',
            el2: '[node-type~="el2"]'
        },
        
        methods: {},
        
        // get data from DOMs, bind events, and so on
        ready: function () {}
    };
    module.exports = MyComponent;

