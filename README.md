# fev

A simple and universal architecture for frontend projects.

## file tree

    .
    ├── README.md                 # project document
    ├── package.json              # project profile
    ├── src                       # source files
    │   ├── view/                   # view fragments
    │   ├── controller/             # controller roles
    │   └── static/                 # static resources
    ├── dest/                     # built files
    ├── mock/                     # mock data
    └── script/                   # development scripts

## scripts

### preview

Preview a page, module, component, or all.

`$ npm run preview -- ./module-module1`

`$ npm run preview`

### build

Build a page, module, component, or all.

`$ npm run build -- ./module-module1`

`$ npm run build`

`$ npm run build-online`

### serve

Run a web server for development to serve pages, resources and mock data.

`$ npm run server`

## 设计原则

### 项目源码的层次

controller、view、static 路径下的代码最终会被合入同一个目录，如：

    └── src
         ├── controller
         │   ├── api.js
         │   ├── route.js
         │   └── store.js
         ├── view
         │   ├── page-page1/
         │   ├── module-module1/
         │   └── component-component1/
         └── static
              ├── script
              │   ├── helper.js
              │   └── util.js
              └── style
                   ├── reset.css
                   └── global.css

最终合并为：

    └── dest
         ├── api.js
         ├── route.js
         ├── store.js
         ├── page-page1/
         ├── module-module1/
         ├── component-component1/
         ├── script/
         │   └── (...)
         └── style/
              └── (...)

因此：

    `dest = controller ∪ view ∪ static`

### 项目源码的调用关系