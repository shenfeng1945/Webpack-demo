// 使用webpack app/main.js public/bundle.js
const webpack = require('webpack')
module.exports = {
   entry: __dirname + '/app/main.js',
   output: {
       path: __dirname + '/public',
       filename: 'bundle.js'
   },
   devtool: 'eval-source-map', // 配置生成Source Maps
   module: {
      loaders: [
          {
              test: /\.js$/, //匹配的文件名
              loader: 'babel-loader',
              exclude: '/node_modules',
              // babel的配置选项一般放在.babelrc里
            //   query: { 
            //       presets: ['es2015','react'] // 为loader提供额外的选项
            //   }
          },
          {
              test: /\.css$/,
              // style-loader将计算后样式加入页面中
              // css-loader使你能够使用类似@import和url(..)的方法实现require()的功能
              loader: 'style-loader!css-loader'
          },
          {
              test: /\.scss$/,
              use: ['style-loader','css-loader','sass-loader']
          }
      ]
   },
//    externals: {
//       'react': 'window.React',
//       'react-dom': 'window.ReactDOM'
//    },
    plugins: [
       new webpack.DllReferencePlugin({
           context: __dirname,
           manifest: require('./manifest.json')
       })
    ],
   // webpack-dev-server配置
   devServer: {
      contentBase: './public', //启动本地server的文件目录
      historyApiFallback: true,
      inline: true, //源文件改变会自动刷新
   }
}