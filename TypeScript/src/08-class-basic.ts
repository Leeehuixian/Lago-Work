/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 09:50:06
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 11:05:46
 * @FilePath: /TypeScript/src/08-class-basic.ts
 * @Description: 类的基本使用
 */

export {}

class Person {
  name: string
  private age: number
  protected gender: boolean

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi(msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
    console.log(this.age)
  }
}

const tom = new Person('Tom', 17)
tom.sayHi('I like play basketball')
// console.log(tom.age) // 报错：age是私有属性，只能在Person内部访问
// console.log(tom.gender) // 报错：gender属性受保护，只能在Person类内部及其子类中被访问

class Student extends Person {
  // 如果构造函数被设置为private（私有），那么类就不能用来实例化了，也不能被继承；如果设置为protected，是可以被继承的
  private constructor (name: string, age: number) {
    super(name, age)
    console.log(this.gender) // protected属性可以在子类中使用
  }

  // 添加静态方法，在静态方法中创建实例
  static creat (name: string, age: number) {
    return new Student(name, age)
  }
}

// const student1 = new Student() // 报错:类“Student”的构造函数是私有的，仅可在类声明中访问。
const jack = Student.creat('Jack', 16) // 通过调用类的静态方法来创建实例