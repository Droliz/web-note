const path = require('path');

// 向外导出webpack的配置对象
module.exports = {
    mode: 'development',
    // mode 用来指定构建模式 
    // development：开发阶段（不会压缩，时间段，空间大），production：上线（压缩混淆，时间长，空间小）
    // 指定处理的文件
    entry: {
        index: path.join(__dirname, './src/index.js'),
        worker: path.join(__dirname, './src/worker.js'),
        test: path.join(__dirname, './src/test.js'),
        sharedWorker: path.join(__dirname, './src/sharedWorker.js'),
    },
    // 指定生成的文件
    output: {
        // 存放目录
        path: path.join(__dirname, './dist'),
        // 文件名
        filename: '[name].js'
    },
    devServer: {
        open: true,   // 初次打包，自动打开浏览器
        host: '127.0.0.1',  // 访问的ip地址
        port: 8080,   // 端口
        contentBase: './dist',
        hot: true,
    }
}