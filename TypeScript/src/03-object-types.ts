/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-26 07:26:06
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 21:51:10
 * @FilePath: /TypeScript/src/03-object-types.ts
 * @Description: 
 */ 

// Obejct 类型
export {} // 确保跟其他示例没有成员冲突

const foo: object = function () {} // [] {}

// const obj: { foo: number, bar: string } = { foo: 123, bar: 'string', more: 123} // 报错，因为：对象类型限制要求，赋值的对象结构与类型结构必须完全一致，不能多，也不能少， 一般用接口定义对象类型限制

