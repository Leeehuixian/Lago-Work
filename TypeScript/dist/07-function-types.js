"use strict";
/*
 * @Author: LeeHuiXian
 * @version:
 * @Date: 2020-05-26 22:16:52
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 22:35:29
 * @FilePath: /TypeScript/src/07-function-types.ts
 * @Description: 函数类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 函数声明
function foo(a, b) {
    return "It's a function";
}
foo(100, 200); // 形参与实参必须保证完全一致
// 可选参数（必须放在参数的最后）:在参数名称后面加？,或者给参数设置默认值
function fun1(a, b) {
    return 'fun1';
}
function fun2(a, b) {
    if (b === void 0) { b = 10; }
    return 'fun1';
}
// 剩余参数（必须放在参数的最后
function fun3(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return 'fun3';
}
// -------------------------------------
// 函数表达式
var bar = function (a, b) {
    return "It's another function";
};
//# sourceMappingURL=07-function-types.js.map