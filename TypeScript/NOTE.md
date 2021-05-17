<!--

 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-25 13:48:26
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-25 22:00:21
 * @FilePath: /TypeScript/概述.md
 * @Description: 
--> 
# TypeScript

TypeScript是基于JavaScript之上的语言，解决了JS自有的类型系统的不足，大大提高代码的可靠程度。

## 内容概要

* 强类型与弱类型（类型安全）
* 静态类型与动态类型（类型检查）
* JavaScript自有类型系统问题
* Flow静态类型检查方案
* TypeScript语言规范与基本应用

## 类型系统

### 强类型VS.弱类型

* 区别：是否允许随意的进行数据类型的隐式转换
* 强类型有更强的类型约束，而弱类型中几乎没有什么约束。强类型不允许有任意的数据隐式类型转换，而弱类型是允许的，比如：在JS中可以将数字类型和字符串类型进行求和运算，会得到新的字符串，而程序不报错。强类型是相对语法层面而言，在编译阶段不符合类型约束就会报错，而不是到运行的时候才抛出错误。

### 静态类型VS.动态类型

* 区别：是否允许随时修改变量的类型
* 静态类型变量声明时类型就是明确的，声明过后类型不允许修改；动态类型变量在运行时才明确变量的类型，且变量的类型可以随时发生变化。可以说变量是没有类型的，而变量的值是有类型的，JavaScript是动态类型

**注意**：因为区分的维度不同，强类型并不等同于静态类型，弱类型也不等同于动态类型。

### JavaScript类型系统特性

* 弱类型
* 动态类型
* 没有类型限制、比较“任性”，丢失了类型系统的可靠性，“不靠谱”
* 背景：早起JavaScript的应用比较简单，没有必要设置复杂的类型系统，JavaScript作为脚本语言没有编译环节

### 弱类型的问题

* 运行时才能发现代码中的语法错误
* 类型不确定导致函数功能发生改变，如求和却得到字符串拼接

### 强类型的优势

* 错误更早暴露
* 代码更智能，编码更准确
* 重构更牢靠
* 减少不必要的类型判断

## Flow概述

Flow：JavaScript的静态类型检查器，2014年由FaceBook推出，可以弥补JavaScript弱类型带来的弊端

工作原理：在代码中添加类型注解，来标记变量或者参数的类型，Flow根据类型注解去检查代码当中类型使用的异常，从而在编码阶段就实现了数据的类型检查，避免到运行时才暴露异常

```` javascript
function sum (a: number, b: number) {
  return a + b
}
````



## TypeScript概述

基于JavaScript之上，是JavaScript的超集，所谓超集就是对JavaScript的原有基础上进行了拓展，支持类型检查，支持ES新特性。

优点：

1. 支持类型检查，提前暴露错误
2. 支持ES新特性，开发不再需要依赖Bable
3. 兼容性好，可以编译成最早ES3，任何一种JavaScript运行环境都支持
4. 相比Flow（JS静态类型检查工具），作为完整的开发语言，功能更强大、生态更加健全、完善，微软自家的工具对TypeScript的支持都很好、大型前端框架（Angular/Vue.js 3.0）都开始用TS进行开发，TS可谓前端领域中的第二大语言

缺点：

1. 语言本身多了很多概念，如接口、泛型、枚举...，具有一定的学习成本，不过TS是渐进式的
2. 项目初期，TS会增加一些开发成本

**选择的原则**：小项目，短周期、求灵活可以用JS；大项目，长周期开发迭代维护，宜选用TS。

### 快速上手

安装：

````javascript
yarn add typescript --dev
````

项目下根目录下新建01-getting-started.ts文件

运行：

````typescript
yarn tsc 01-getting-started.ts
````

会发现项目根目录下会自动生成一个01-getting-started.js文件为ts编译后生成的文件

#### 配置文件

TS不仅可以编译单个文件还可以编译整个项目

（1）初始化配置文件

````javascript
yarn tsc --init
````

（2）执行命令过后，项目根目录会生成一个tsconfig.json的文件，为TS的配置文件，然后按照截图进行相关配置的修改

![tsconfig.json配置修改截图](/Users/golden/Library/Application Support/typora-user-images/image-20200525233304992.png)

（3）运行命令行进行编译

````javascript
yarn tsc
````



### 原始类型

````typescript
// 原始数据类型

const a: string = 'foobar'

const b: number = 100 // NaN Infinity

const c: boolean = true // false

// const d: boolean = null // 严格模式，string、number、boolean初始值不可以为null， 非严格模式可以

const e: void = undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol() // ? 为什么会报错 因为标准库不对，可以通过修改tsconfig.json中的target: ['es5']、或者lib：['es2015', 'DOM']
````



### 标准库

标准库：内置对象所对应的声明文件，代码中使用内置对象就必须引用对应的标准库，不然TS找不到类型就会报错

**引用方法**：通过修改tsconfig.json中的target或者lib选项

### Object 类型

TS中Object不仅单指普通的对象类型，而是泛指所有的非原始类型（Array、Object、Function）

````typescript
const foo: object = function () {} // [] {}

const obj: { foo: number, bar: string } = { foo: 123, bar: 'string', more: 123} // 报错，因为：对象类型限制要求，赋值的对象结构与类型结构必须完全一致，不能多，也不能少， 一般用接口定义对象类型限制
````



### 数组类型

````typescript
const arr1: Array<number> = [1, 2, 3] // 表示成员全部都是数字
const arr2: number[] = [1, 2, 3]
````



### 元组类型（Tuple）

特殊的数据结构：**元祖是明确数据类型和数据数量的数组**

````typescript
const tuple: [number, string] = [18, 'zce']
const age = tuple[0]
const name = tuple[1]
const [age, name] = tuple
````



### 枚举类型（Enum）

开发中经常用某几个值来表示某几种状态，此时可以使用枚举类型

````typescript
enum PostStatus {
	Draft =0,
  Published = 1,
  UnPublishen = 2
}

const post = {
  title: '月亮和六便士',
  status: PostStatus.Draft
}

// 注意：名称和值是用"="连接不是":"

// 枚举的值如果是数字，可以不指定，默认从0开始累加

// 普通的枚举类型，会入侵开发的代码，在编译过后会被转换成双向键值对对象（可以通过键获取值，也可以通过值获取键），如上面的PostStatus编译后：
(function (PostStatus) {
   PostStatus[PostStatus["Druft"] = 0] = "Druft";
   PostStatus[PostStatus["Published"] = 1] = "Published";
   PostStatus[PostStatus["UnPublished"] = 2] = "UnPublished";
})(PostStatus || (PostStatus = {}));

// 目的是可以通过值来获取枚举的名称,如果可以确定代码中不会使用索引器的方式来获取枚举的名称，就可以用常量枚举
PostStatus[0] // => Draft

// 常量枚举: 在enum前加const，编译之后会被清除，使用枚举的地方会被替代为具体的数值
var post = {
    title: '月亮和六便士',
    status: 0 /* Draft */
};
````



### 函数类型

对函数的参数和返回值进行类型约束

````typescript
// 函数声明
function foo(a: number, b: number): string {
  return "It's a function"
}

foo(100, 200) // 形参与实参必须保证完全一致

// 可选参数（必须放在参数的最后）:在参数名称后面加？,或者给参数设置默认值
function fun1(a: number, b?: number): string {
  return 'fun1'
}

function fun2(a: number, b: number = 10): string {
  return 'fun1'
}

// 剩余参数（必须放在参数的最后
function fun3(a: number, ...rest: number[]): string {
  return 'fun3'
}

// -------------------------------------

// 函数表达式
const bar: (a: number, b: number) => string = function (a: number, b: number): string {
  return "It's another function"
}
````



### 任意类型（Any）

Any仍然属于动态类型，TS不会再对Any进行类型检查，类型是不安全的慎用！

````typescript
function stringify(value: any) {
  return JSON.stringify(value)
}

let foo:any = 'string'
foo = 100 // 语法上不会报错
foo.bar() // 语法上不会报错
````



### Void类型

如果方法没有返回值，那么此方法的返回值类型就是Void类型

````typescript
function func(): void {
	console.log("蚂蚁部落")
}
// 上述函数没有任何返回值，所以返回值类型是void
````

 **void类型的变量值是有限制的，只能是undefined和null**

````typescript
let a: void = null
let b: void = undefined
````

**void类型是any类型的子类型，是null和undefined类型的父类型**

````typescript
let ant: void = null
let str: string = ant
// 上面的代码会报错，void类型不能赋值给字符串类型
````



### 隐式类型推断

如果没有对变量使用类型注解，TS会根据变量的使用情况对变量的类型进行推断，如果TS无法推断，数据的类型就是Any

````typescript
let age = 18 // 隐式推断age为number
age = 'string' // 将会报错

let foo // 声明变量时不进行初始化，隐式推断foo为any
foo = 100 // 不报错
foo = 'string' // 不报错
````



### 类型断言

特殊情况下TS没法推断出变量的类型，断言就是明确的告诉TS变量的数据类型，辅助TS明确数据类型

**注意**： 类型断言与类型转换是有本质区别的，类型断言是在代码的编译阶段的概念，类型转换是在代码的运行阶段，编译过后类型断言就不存在了

````typescript
// 假定这个nums，来自一个明确的接口
const nums = [10, 20, 30, 40, 50]

const res = nums.find(i => i > 0)

// const square = res * res // 此时对TS而言res的类型时不明确的

// 类型断言语法1
const num1 = res as number

// 类型断言语法2（会与JSX的标签产生冲突，JSX下不能使用这种方式）
const num2 = <number>res
````



### TypeScript接口(Interface)

规范、契约；用来约定对象的结构（有什么成员，成员的类型）

````typescript
// 接口只能用来约定对象的结构，编译之后的js文件中不会有接口的痕迹,在实际运行阶段并没有什么意义
interface Post {
  title: string // 应该用分号来分割成员，可以省略
  content: string
  subtitle?: string // 可选成员：在成员名称后面添加?
  readonly author: string // 只读成员：在成员名称前面添加readonly，初始化后不允许修改
}

function printPost(post:Post) { // 显式的要求传入的post必须有title，content两个字符串成员
  console.log(post.title)
  console.log(post.content)
}

printPost({
  title: 'Hello TypeScript',
  content: 'A javascript surperset'
})

// ---------------------
// 动态成员:不确定有哪些具体的成员，只能规定成员名和成员的类型
interface Cache { // 规定只能是字符串类型的键值
  [prop: string]: string
}

const cache: Cache = {}
cache.foo = 'value1'
cache.bar = 'value2'

````



### TypeScript的类

#### 基本使用

作用：描述一类具体事物的抽象特征

ES6以前，用function + 原型来模拟实现类

ES6之后，JS出现专门的Class

TS增强了类的相关语法

`````typescript
class Person {
  // TS需要明确类的属性，类必须设置初始值，可以在声明的时候=后面设置初始值，或者在构造函数中动态赋值
  name: string // = 'init name'
  age: number
  
	constructor (name: string, age:number) {
	// 在构造函数中动态给属性赋值
		this.name = name
		this.age = age
	}
  
  sayHi(msg: string):void {
    console.log(`I am ${this.name}, S{msg}`)
  }
}
`````



#### 类成员的访问修饰符

private（私有属性，只能在类的内部被访问）

public（公有属性，默认就是公有属性）

protected （受保护的，只允许在类的内部或者子类中访问）

**构造函数如果设置为private，那么类就不能被实例化了，也不能被继承**



#### 类的只读属性

readonly设置成员为只读，跟在访问修饰符的后面，可以在声明的时候初始化，或者在构造函数中初始化（二者选其一），初始化后不允许被修改



#### 类与接口

相比类，接口更抽象，类与类之间有共同特征，可以通过接口来抽象

eg：手机和座机属于不同的类，但是都可以打电话，实现了相同的协议，程序中协议就是接口



#### 抽象类

类似接口，用来约束子类中必须有某个成员，抽象类可以包含具体的实现，接口只是成员的抽象不包含具体的实现。**抽象类不能实例化，只能被继承**, 大的类目一般用抽象类，比如“Animal”

````typescript
// 抽象类用abstract修饰
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
````



### 泛型

定义函数、接口、类的时候不指定具体类型，使用时指定具体类型，目的：极大程度的复用代码

````typescript
// 泛型使用：函数名添加<T>
function creatArray<T>(length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

const res = creatArray<number>(3, 100) // [100, 100, 100]
const res2 = creatArray<string>(2, 'hello') // ['hello', 'hello']
````



### 类型声明

开发中使用第三方模块，如果找不到对应的第三方模块类型声明文件（import 引入的时候就会报错：找不到对应的类型声明文件如果给出了类型声明文件的安装命令，可以直接安装）

(1)可以用declare进行声明

````typescript
import { camelCase } from 'loadsh'
declare function camelCase (input: string): string
const res = camelCase('hello typed')
````

(2)安装第三方对应的类型声明模块

````typescript
npm i @types/modulesName --dev
````



































