/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-24 17:43:16
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-24 20:31:25
 * @FilePath: /ES2015/webpack.config.js
 * @Description: 
 */ 

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'none',
  stats: 'none',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
