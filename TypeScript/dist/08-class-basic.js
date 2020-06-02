"use strict";
/*
 * @Author: LeeHuiXian
 * @version:
 * @Date: 2020-05-29 09:50:06
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 11:05:46
 * @FilePath: /TypeScript/src/08-class-basic.ts
 * @Description: 类的基本使用
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
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    Person.prototype.sayHi = function (msg) {
        console.log("I am " + this.name + ", " + msg);
        console.log(this.age);
    };
    return Person;
}());
var tom = new Person('Tom', 17);
tom.sayHi('I like play basketball');
// console.log(tom.age) // 报错：age是私有属性，只能在Person内部访问
// console.log(tom.gender) // 报错：gender属性受保护，只能在Person类内部及其子类中被访问
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // 如果构造函数被设置为private（私有），那么类就不能用来实例化了，也不能被继承；如果设置为protected，是可以被继承的
    function Student(name, age) {
        var _this = _super.call(this, name, age) || this;
        console.log(_this.gender); // protected属性可以在子类中使用
        return _this;
    }
    // 添加静态方法，在静态方法中创建实例
    Student.creat = function (name, age) {
        return new Student(name, age);
    };
    return Student;
}(Person));
// const student1 = new Student() // 报错:类“Student”的构造函数是私有的，仅可在类声明中访问。
var jack = Student.creat('Jack', 16); // 通过调用类的静态方法来创建实例
//# sourceMappingURL=08-class-basic.js.map