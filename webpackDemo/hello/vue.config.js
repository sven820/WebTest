const path = require('path')

// module.exports = {
// 	configureWebpack: {
// 		devServer: {
// 		    host: "localhost",
// 		    port: 8090, // 端口号
// 		    open: false,
// 		}
// 	}
// }

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: config => {
        config.entry = {
            app: './src/client/main.js'
        }
        config.resolve = {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@c': resolve('src/client'),
              '@s': resolve('src/server'),
            }
        }

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        }else if (process.env.NODE_ENV === 'test') {
            // 为测试环境修改配置...
        } else {
            // 为开发环境修改配置...
            config.devServer = {
                host: "localhost",
                port: 8090, // 端口号
                open: false,
            }
        }
    }
}