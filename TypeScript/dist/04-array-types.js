"use strict";
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
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
// ----------------------------------
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (prev, current) { return prev + current; }, 0);
}
// sum(100, 200, 'foo') // 报错
//# sourceMappingURL=04-array-types.js.map