const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //3种， development， production， none
  mode: 'development',
  /*
  devtool选项	配置结果
1.source-map	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
2.cheap-module-source-map	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
3.eval-source-map	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
4.cheap-module-eval-source-map	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
  */
  devtool: 'eval-source-map',
  //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
  // context: path.resolve(__dirname)//上下文入口，默认当前文件夹，
  entry:  __dirname + "/src/index.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
      '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录
      '#': path.resolve('src/ui/components') //import Table from '#/table'
    }
  },
  plugins: [new HtmlWebpackPlugin],
  //构建本地服务器
  /*
  1.contentBase	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
  2.port	设置默认监听端口，如果省略，默认为”8080“
  3.inline	设置为true，当源文件改变时会自动刷新页面
  4.historyApiFallback	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
https://webpack.js.org/configuration/dev-server/
  */
  devServer: {
    //本地服务器所加载的页面所在的目录
    // contentBase: false, //禁用
    // contentBase: path.join(__dirname, 'dist'), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    contentBase: "app",
    index: 'app/index.html',
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    open: true,
    port: 9090 //默认8080
  },

  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}
