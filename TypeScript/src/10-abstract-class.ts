/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 15:11:53
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 15:28:09
 * @FilePath: /TypeScript/src/10-abstract-class.ts
 * @Description: 抽象类
 */

abstract class Animal {
  eat(food: string): void {
    console.log(`呼噜呼噜的吃：${food}`)
  }

  abstract run (distance: number): void // 抽象方法也不需要方法体,需要在子类中实现
}

// 抽象类不能创建示例，只能被继承
// const dog = new Animal() // 报错：无法创建抽象类的示例

class Dog extends Animal {
  run(distance: number): void {
    console.log(`四肢爬行：${distance}`)
  }
  
}

const dog = new Dog()
dog.eat('bone')
dog.run(300)

