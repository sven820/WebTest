const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var ImageminPlugin = require('imagemin-webpack-plugin').default; //图片压缩
// const CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
  mode: 'development',
  // context: path.resolve(__dirname)//上下文入口，默认当前文件夹，入口起点（entry）会相对于此目录查找
  context: path.resolve('./'),
  devtool: process.env.NODE_ENV === 'production' ? false : '#source-map',
  // entry:  __dirname + "/src/index.js",
  entry:  {
    // vue: "/static/vue.js",
    // index: ['babel-polyfill', './src/index.js'],
    // home: ['babel-polyfill', './src/home.js'], //polyfill支持es6
    index: "./src/index.js",
    home: "./src/home.js",
  },
  output: {
    // path: path.resolve('./dist/[hash:8]/'), // hashDigestLength: 8
    // path: path.resolve(`./dist/${Date.now()}/`),//打包后的文件存放的地方
    // path: path.resolve('dist'),
    path: __dirname + '/dist/app',
    filename: "[name].[chunkHash:8].js",//打包后输出文件的文件名,hash：整个项目hash，chunkHash：对应的入口文件hash
    chunkFilename:'[name].[chunkhash:8].chunk.js', //require.ensure引入的文件，非入口引入
    publicPath: '/', //静态资源路径
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production' ? true : false,
    splitChunks: { //https://github.com/webpack/webpack/tree/master/examples
      /*
      initial 入口chunk，对于异步导入的文件不处理
      async 异步chunk，只对异步导入的文件处理（个人理解）
      all 全部chunk（我反正选all，不甚理解）
      */
      chunks: "async",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
          vendors: {
              name: 'vendors',
              chunks: 'all',  //vue等分割的js解析不了
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              minChunks: 1,
          },
          commons: {
              name: "commons",
              chunks: "initial", //vue等分割的js解析不了
              minChunks: 2,
          },
          default: {
                  minChunks: 1,
                  priority: -20,
                  reuseExistingChunk: true
              }
          }
    },
    // runtimeChunk: {
    //   name: entrypoint => `manifest~${entrypoint.name}`
    // },
  },
  watch: false, // 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视
  watchOptions: { //不监听目录
        ignored: [/node_modules/ , /static/],
  },
  // 不进行打包的模块
  externals:{},
  module: { //webpack loader的执行顺序是从右到左
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',//实际是把html转为字符串导出，src，link等需要借助url-load,file-loader等才能正常解析
          }
        ],
        exclude: /src/
      },
      /*
1.url-loader和file-loader只能load js中的资源，html中无法load
2.css load file
      */
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader', //对file-loader的封装
            options: {
                // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                limit: 10240,
                // mimetype: 'image/png',
                name: 'images/[name].[ext]',
                // outputPath: '', //资源拷贝路径前缀
                // publicPath: '', //资源引用路径前缀，比如cdn，默认为output的publicPath
            }
          }
        ]
      },
      {
        test: /\.(avi|mp3|mp4|rmvb)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
            outputPath: 'av', //资源拷贝路径前缀
            // publicPath: '', //资源引用路径前缀，比如cdn，默认为output的publicPath
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
        exclude: file => (
          // vue-loader v15+版本 q`
          // /node_modules/中的.vue文件需要经过babel-loader转译
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, //exclude表示忽略node_modules文件夹下的文件，不用转码
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
      '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      //more https://www.cnblogs.com/wonyun/p/6030090.html
      title: 'jxf index',
      filename: 'index.html',
      template: './src/index.html', //使用指定模版
      inject: 'body',
      scripts: {},
      // favicon: '', //浏览器标签图标
      minify: {
        removeComments: process.env.NODE_ENV === 'production' ? true : false,
        collapseWhitespace: process.env.NODE_ENV === 'production' ? true : false,
        removeAttributeQuotes: process.env.NODE_ENV === 'production' ? true : false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      cache: true, //默认是true的，表示内容变化的时候生成一个新的文件。
      showErrors: true, //当webpack报错的时候，会把错误信息包裹再一个pre中，默认是true。
      chunks: ['index', 'vendors', 'commons'], //chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
      // excludeChunks: [], //排除掉一些js
      // xhtml: false, //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
      // chunksSortMode: 'none', //默认四个选项： none auto dependency {function}
    }),
    new HtmlWebpackPlugin({
      title: 'jxf的home',
      filename: 'home.html',
      // template: './src/index.html', //使用指定模版
      inject: 'body',
      chunks: ['home', 'vendors', 'commons']
    }),
    new webpack.BannerPlugin({ //这是webpack内置的插件，所以不用require导入，但是对于第三方插件要先导入
            banner: '每一次靠近，总是那么悄悄的'
        }),
    new CleanWebpackPlugin(['dist/*', 'dist/*',], {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose: true,        　　　　　　　　　　//开启在控制台输出信息
          dry: false        　　　　　　　　　　//启用删除文件
      }),
    // new webpack.optimize.RuntimeChunkPlugin({
    //         name: "manifest"
    //   }),
    // new webpack.optimize.SplitChunksPlugin({}), //通过插件方式加载
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // 开发时不启用
      pngquant: {//图片质量
        quality: '95-100'
      }
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: '',
    //     to: '',
    //     exclude: /node_modules/,
    //     // toType  file 或者 dir         可选，默认是文件
    //     // force   强制覆盖先前的插件           可选 默认false
    //     // context                         可选 默认base context可用specific context
    //     // flatten 只拷贝文件不管文件夹      默认是false
    //     // ignore  忽略拷贝指定的文件           可以用模糊匹配
    //   }
    // ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9090,
    // host: '10.5.221.131',
    open: true, //自动打开浏览器
    index:'index.html',//与HtmlWebpackPlugin中配置filename一样
    inline: true,// 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    hot: false,
    compress: true,
    progress: true, //只在命令行用
    // historyApiFallback: true,
    // overlay: true
  },
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin())
}

module.exports = config
