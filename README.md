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

### build

Build a view fragment, or all.

`$ npm run build -- ./module-module1`

`$ npm run build`

`$ npm run build:online`

### server

Run a web server for development to serve pages, resources and mock data.

`$ npm run server`

### preview

Preview a page, module, component, or all.

`$ npm run preview -- ./module-module1`

`$ npm run preview`


## `mock/`

All mock data.


## 组件的编写

把`view/`中的 page、module、component 统称为组件。组件对任何外部或内部的依赖，都在 js 中使用 require 或 import 引入。

### 引入 js 类库

    var helper = require('/static/script/helper');
    import other from './other'

### 引入 css 样式

    require('./index.css'); // 如果在 index.js 中则无需 index.css
    import headerStyle from './header.scss'

### 引入其他组件

    var module1 = require('/view/module-module1');
    import module2 from './module-module2'

### 引入 html 模板

    import footerTemplate from './footer.html'

### 组件导出

    export default class