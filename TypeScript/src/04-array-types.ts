/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-26 07:36:24
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 07:40:41
 * @FilePath: /TypeScript/src/04-array-types.ts
 * @Description: 
 */

// 数组类型

const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// ----------------------------------

function sum (...args: number[]) {
  return args.reduce((prev, current) => prev + current, 0)
}

// sum(100, 200, 'foo') // 报错

