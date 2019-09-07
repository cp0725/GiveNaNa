/*
 * @Author: 常培
 * @Date: 2019-08-24 17:13:22
 * @LastEditTime: 2019-09-07 11:51:18
 * @Description: webpack配置啦
 */
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

// CommonJS
module.exports = {
  mode: 'development',
  entry: './src/main.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出路径
    filename: 'main.min.js'   // 出口文件名称
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true // 热更新
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },   
        exclude: path.resolve(__dirname, 'node_modules'),  // 忽略目录
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: {
          loader: 'text-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: './index.html', // 出口
      inject: 'body' // 把script插入到body里
    })
  ]
}