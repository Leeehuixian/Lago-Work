"use strict";
/*
 * @Author: LeeHuiXian
 * @version:
 * @Date: 2020-05-29 15:42:54
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 15:56:56
 * @FilePath: /TypeScript/dist/11-generics.js
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
function createArray(length, value) {
    var arr = new Array(length).fill(value);
    return arr
}
var res3 = createArray(3, 10);
var res4 = createArray(2, 'dog');
console.log(res3)
console.log(res4)
//# sourceMappingURL=11-generics.js.map