/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 15:42:54
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 16:03:52
 * @FilePath: /TypeScript/src/11-generics.ts
 * @Description: 
 */ 

export {}

// function createNumberArray(length: number, value: number):number[] {
//   const arr = new Array<number>(length).fill(value)
//   return arr
// }

// const res = createNumberArray(3, 100)
// console.log(res)

// function createStringArray(length: number, value: string):string[] {
//   const arr = new Array<string>(length).fill(value)
//   return arr
// }

// const res2 = createStringArray(2, 'hello')
// console.log(res2)

function createArray<T>(length: number, value: T): T[] {
  const arr = new Array<T>(length).fill(value)
  return arr
}

const res3 = createArray<number>(3, 10)
console.log(res3)
const res4 = createArray<string>(2, 'dog')
console.log(res4)
