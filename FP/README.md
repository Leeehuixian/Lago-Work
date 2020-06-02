<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-06-02 06:17:41
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-06-02 06:17:42
 * @FilePath: /FP/README.md
 * @Description: Part1-模块2作业
--> 

#### 简答题：

1.描述引用计数的工作原理和优缺点

原理：设置引用数及引用计数器，引用关系改变时修改引用数字，引用数字为0时立即回收。

优点：可以及时进行垃圾回收，减少程序卡顿。

缺点：无法对循环引用的对象进行回收，资源消耗大；



2.描述标记整理算法的工作流程

* 是增强的标记清除
* 标记阶段：遍历对象对可达对象进行标记
* 清除阶段：先执行整理，移动对象位置，使空间连续，避免空间碎片化



3.描述V8中新生代存储区垃圾回收的流程

* v8将内存一分为二
* 小的空间用来存储新生代对象及新生代区域
* 新生代回收采用复制算法+标记整理
* 新生代区域又分成等大小的两部分：From和To
* 使用空间为From，空闲空间为To
* 活动对象存储于From空间
* 标记整理后将活动对象拷贝至To
* From与To交换空间完成释放



4.描述增量标记算法在何时使用，及工作原理。

增量标记算法在V8的老生代回收中使用，采用增量标记进行效率优化。

原理：将整个的垃圾回收分成对个小段，组合着去执行，从而实现程序执行和垃圾回收交替进行，使得垃圾回收所需的时间消耗更加合理些。



### 代码题1

练习1：使用函数组合`fp.flowRight()`重新实现下面这个函数

````javascript
// 包装一下fp.prop使其使用于函数组合
const isInstock = car => fp.prop('in_stock', car)
let isLastInStock = fp.flowRight(isInstock, fp.last)(cars)
````

练习2：使用`fp.flowRight()、fp.prop()、fp.first()`获取第一个`car`的`name`

````javascript
const carName = car => fp.prop('name', car)
let firstCarName = fp.flowRight(carName, fp.first)(cars)
````

练习3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现

````javascript
let _average =  xs => fp.reduce(fp.add, 0, xs) / xs.length

// let averageDollarValue = cars => {
//   let dollar_values = fp.map((car) => car.dollar_value, cars)
//   return _average(dollar_values)
// }

// 重构
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))(cars)
````

练习4：使用flowRight写一个`sanitizeName()`函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]

````javascript
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.map(item => (
  {
    ...item,
    name: fp.flowRight(
      _underscore,
      fp.lowerCase
    )(item.name)
  }
))(cars)
console.log(sanitizeNames)
````



### 代码题2

练习1：使用fp.add(x,y) 和fp.map(f, x)创建一个能让functor里的值增加的函数ex1

````javascript
const fp = require('lodash/fp')
const { Maybe, Container } require('./support.js')

let maybe = Maybe.of([5, 6, 1])
// 使每个元素都增加 x
let ex1 = x => maybe.map(fp.map(item => fp.add(item, x)))
````

练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素

````javascript
const fp = require('lodash/fp')
const { Maybe, Container } require('./support.js')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.first)
````

练习3：实现一个函数ex3， 使用safeProp和fp.first找到user的首字母

````javascript
const fp = require('lodash/fp')
const { Maybe, Container } require('./support.js')

let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let user = { id: 2, name: 'Albert' }
let ex3 = safeProp('name')(user).map(fp.first)
````

练习4：使用Maybe重写ex4, 不要有if语句

````javascript
const fp = require('lodash/fp')
const { Maybe, Container } require('./support.js')

// let ex4 = n => {
//   if (n) { return parseInt(n)}
// }

// 重构ex4
let ex4 = n =>  Maybe.of(n).map(parseInt)
````





