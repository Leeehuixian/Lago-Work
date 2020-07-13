/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-06-11 13:06:03
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-07-13 21:14:16
 * @FilePath: /vue-app-base/webpack.common.js
 * @Description: 
 */ 
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[contenthash:6].[ext]',
            esModule: false,
            limit: 5 * 1024 // kb
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Vue App Sample'
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"/"'
    })
  ]
}