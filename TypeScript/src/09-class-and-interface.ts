/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 11:12:05
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 11:29:09
 * @FilePath: /TypeScript/src/09-class-and-interface.ts
 * @Description: 类和接口
 */

export {}

// class Person {
//   eat(food: string):void {
//     console.log(`优雅的进餐：${food}`)
//   }

//   run(distance: number) {
//     console.log(`直立行走：${distance}`)
//   }
// }

// class Animal {
//   eat(food: string):void {
//     console.log(`呼噜呼噜的吃${food}`)
//   }

//   run(distance: number) {
//     console.log(`四肢爬行：${distance}`)
//   }
// }

// ----------------------------------
// 将吃和跑抽奖成接口EatAndRun
// interface EatAndRun {
//   eat(food: string): void
//   run(distance: number): void
// }

// class Person implements EatAndRun {
//   eat(food: string):void {
//     console.log(`优雅的进餐：${food}`)
//   }

//   run(distance: number) {
//     console.log(`直立行走：${distance}`)
//   }
// }

// class Animal implements EatAndRun {
//   eat(food: string):void {
//     console.log(`呼噜呼噜的吃${food}`)
//   }

//   run(distance: number) {
//     console.log(`四肢爬行：${distance}`)
//   }
// }

// ------------------------------------------
// 接口应该尽量简单，吃和跑可以分别抽象出一个接口
interface Eat {
  eat(food:string): void
}

interface Run {
  run(distance: number): void
}

class Person implements Eat,Run {
  eat(food: string):void {
    console.log(`优雅的进餐：${food}`)
  }

  run(distance: number) {
    console.log(`直立行走：${distance}`)
  }
}

class Animal implements Eat,Run {
  eat(food: string):void {
    console.log(`呼噜呼噜的吃${food}`)
  }

  run(distance: number) {
    console.log(`四肢爬行：${distance}`)
  }
}

