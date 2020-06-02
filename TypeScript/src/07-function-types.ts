/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-26 22:16:52
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 22:35:29
 * @FilePath: /TypeScript/src/07-function-types.ts
 * @Description: 函数类型
 */ 

export {}

// 函数声明
function foo(a: number, b: number): string {
  return "It's a function"
}

foo(100, 200) // 形参与实参必须保证完全一致

// 可选参数（必须放在参数的最后）:在参数名称后面加？,或者给参数设置默认值
function fun1(a: number, b?: number): string {
  return 'fun1'
}

function fun2(a: number, b: number = 10): string {
  return 'fun1'
}

// 剩余参数（必须放在参数的最后
function fun3(a: number, ...rest: number[]): string {
  return 'fun3'
}

// -------------------------------------

// 函数表达式
const bar: (a: number, b: number) => string = function (a: number, b: number): string {
  return "It's another function"
}