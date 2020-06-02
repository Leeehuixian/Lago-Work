"use strict";
/*
 * @Author: LeeHuiXian
 * @version:
 * @Date: 2020-05-29 11:12:05
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 11:29:09
 * @FilePath: /TypeScript/src/09-class-and-interface.ts
 * @Description: 类和接口
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.eat = function (food) {
        console.log("\u4F18\u96C5\u7684\u8FDB\u9910\uFF1A" + food);
    };
    Person.prototype.run = function (distance) {
        console.log("\u76F4\u7ACB\u884C\u8D70\uFF1A" + distance);
    };
    return Person;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function (food) {
        console.log("\u547C\u565C\u547C\u565C\u7684\u5403" + food);
    };
    Animal.prototype.run = function (distance) {
        console.log("\u56DB\u80A2\u722C\u884C\uFF1A" + distance);
    };
    return Animal;
}());
//# sourceMappingURL=09-class-and-interface.js.map