#!/usr/bin/env node

// console.log('cli working!')

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

// inquirer通过inquirer.prompt()实现命令行交互询问，此方法接收一个数组由命令行交互的问题构成
inquirer.prompt([
  {
    type: 'input', // 问题的输入方式
    name: 'name', // 问题返回值的键
    message: 'Project name?' // 命令行里给用户的提示
  }
])
.then(answer => { // 接收用户输入内容
  // console.log(answer)
  // 根据用户回到的结果生成文件

  // 模板目录
  const tmpDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()

  // 将模板文件全部输出到目标目录
  fs.readdir(tmpDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      // console.log(file)
      // 通过模板引擎渲染文件,yarn add ejs
      ejs.renderFile(path.join(tmpDir, file), answer, (err, result) => {
        if (err) throw err
        
        // 将结果写入目标文件路径
        // console.log(result)
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
  
})