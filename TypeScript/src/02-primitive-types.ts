/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-25 23:17:03
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 07:09:58
 * @FilePath: /TypeScript/src/02-primitive-types.ts
 * @Description: 
 */ 

// 原始数据类型

const a: string = 'foobar'

const b: number = 100 // NaN Infinity

const c: boolean = true // false

// const d: boolean = null // 严格模式，string、number、boolean初始值不可以为null， 非严格模式可以

const e: void = undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol() // ? 为什么会报错
