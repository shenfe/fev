const path = require('path');

const cwd = process.cwd();

module.exports = {
    host: '127.0.0.1',
    port: 9000,
    publicPath: '/',
    // 配置代理服务器
    proxy: {
        '/api': 'http://localhost:3000' // 访问路由/api，会转发到localhost:3000的地址去
    },
    // 静态资源路径，需要配置编译后的模块文件存放的路径（同output中的path），也可以配置mock文件存放的路径等
    contentBase: [
        path.resolve(cwd, 'dest'),
        path.resolve(cwd, 'mock')
    ],
    compress: true, // 是否开启压缩
    historyApiFallback: true,
    hot: false, // 是否开启热更新
    noInfo: true, // 在热更新时，只输出错误与警告信息，不输出其他日志
    https: false, // 是否使用https
    stats: 'verbose' // 输出所有日志
};
