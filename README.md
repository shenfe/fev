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
