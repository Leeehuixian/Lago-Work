/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-31 19:06:04
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-31 19:26:00
 * @FilePath: /FP/code/12-task.js
 * @Description: Task函子处理异步任务
 */ 

const fs = require('fs')
const { task } = require('folktale/concurrency/task') // 2.0函数的形式
const { find, split } = require('lodash/fp')

function readFile (filename) {
  return task(resolver => {
    return fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)

      resolver.resolve(data)
    })
  })
}

readFile('package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err)
    },
    onResolved: data => {
      console.log(data)
    }
  })
