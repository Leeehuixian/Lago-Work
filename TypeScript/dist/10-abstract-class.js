"use strict";
/*
 * @Author: LeeHuiXian
 * @version:
 * @Date: 2020-05-29 15:11:53
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 15:28:09
 * @FilePath: /TypeScript/src/10-abstract-class.ts
 * @Description: 抽象类
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function (food) {
        console.log("\u547C\u565C\u547C\u565C\u7684\u5403\uFF1A" + food);
    };
    return Animal;
}());
// 抽象类不能创建示例，只能被继承
// const dog = new Animal() // 报错：无法创建抽象类的示例
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.run = function (distance) {
        console.log("\u56DB\u80A2\u722C\u884C\uFF1A" + distance);
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.eat('bone');
dog.run(300);
//# sourceMappingURL=10-abstract-class.js.map