module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '网易云音乐',
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://cloud-music.pl-fe.cn',
                pathRewrite: {'^/api': ''}, // 删除前缀
                ws: true, // 用于支持 websocket
                changeOrigin: true // 用于控制请求头中的 host 字段，默认为 true
            },
        }
    }
}