/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-31 10:18:04
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-31 10:36:59
 * @FilePath: /FP/code/08-pointfree-demo.js
 * @Description: 
 */ 

// 把一个字符串中的首字母提取转换成大写，使用.作为分隔符
// world wild web => W. W. W
const fp = require('lodash/fp')

function log(e) {
  console.log(e)
  return e
}

// 两次调用fp.map遍历数组，影响性能
// const f = fp.flowRight( fp.join('. '), fp.map(fp.first), log, fp.map(fp.toUpper), log, fp.split(' '))
// 将两次fp.map合成一次
const f = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))
console.log(f('world wild web'))



