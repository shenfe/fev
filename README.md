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

`controller`、`view`、`static` 路径下的代码最终会被合入同一个目录，如：

    └── src
        │
        ├── controller                  # controllers
        │   ├── api.js
        │   ├── route.js
        │   ├── store.js
        │   └── ...
        │
        ├── view                        # views
        │   ├── page-page1/
        │   ├── module-module1/
        │   ├── component-component1/
        │   └── ...
        │
        └── static                      # common static files
            ├── script
            │   ├── helper.js
            │   ├── util.js
            │   └── ...
            └── style
                ├── reset.css
                ├── global.css
                └── ...

最终合并为：

    └── dest
        │
        ├── api.js                      #   api controller file (if necessary)
        ├── route.js                    # route controller file (if necessary)
        ├── store.js                    # store controller file (if necessary)
        ├── ...
        │
        ├── page-page1/                 # view fragment folder, page1
        ├── module-module1/             # view fragment folder, module1
        ├── component-component1/       # view fragment folder, component1
        ├── ...
        │
        ├── script/                     # common scripts
        └── style/                      # common styles

因此：

    dest === (src => src.controller ∪ src.view ∪ src.static)(src)

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