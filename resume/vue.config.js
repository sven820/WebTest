const path = require('path')
const debug = process.env.NODE_ENV !== 'prod'

console.log('')
console.log('本地启动或构建的文件信息 | 开始--------------------------------------------------------------')

module.exports = {
    // baseUrl: vueConf.baseUrl, // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    devServer: {
        port: 8090, // 端口号
        open: false,
    },
    parallel: require('os').cpus().length > 1,
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    // pages: vueConf.pages,
    lintOnSave: debug, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度

    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        }

        if (process.env.NODE_ENV === 'test') {

        } else if (process.env.NODE_ENV === 'prod') {

        } else {
            // 为开发环境修改配置...
            config.devtool = 'cheap-module-eval-source-map'
        }
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    css: { // 配置高于chainWebpack中关于css loader的配置
        modules: true, // 是否开启支持‘foo.module.css’样式
            extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
            sourceMap: false, // 是否在构建样式地图，false将提高构建速度
            loaderOptions: { // css预设器配置项
            css: {
                localIdentName: '[name]-[hash]',
                    camelCase: 'only'
            },
            stylus: {}
        }
    },

    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    pluginOptions: { // 第三方插件配置
    },
}
