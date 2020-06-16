# 函数式编程



### 内容概要

* 为什么学习函数编程以及什么是函数式编程
* 函数式编程的特性（纯函数、柯里化、函数组合等）
* 函数式编程的应用场景
* 函数编程库Loadsh



### 为什么学习函数式编程

* 函数式编程是随着React的流行受到越来越多的关注
* Vue3也开始拥抱函数式编程
* 函数编程可以抛弃this
* 打包过程中可以更好的利用tree shaking过滤无用代码
* 方便测试，方便并行处理
* 有很多库可以帮助我进行函数式开发：loadsh、underscore、ramda
* **注意：函数式编程并不能提高程序的性能，因为大量使用闭包在某种程度上会降低性能**



### 什么是函数式编程

函数式编程（Functional Programming, FP）,FP是编程范式之一，我们常听说的编程范式还有面向过程编程、面向对象编程

* 面向对象的编程思维：把现实世界中的事物也抽象成程序世界中的类和对象，通过封装继承和多态来演示事物事件的联系

* 函数式编程的思维方式：把现实世界中的事物和事物之间的联系抽象到程序世界（对运算过程进行抽象）

  * **函数式编程中的函数指的不是程序中的函数（方法）**，而是数学中的函数即映射关系，例如：y = sin(x), x和y的关系

    ````javascript
    // 非函数式编程
    let num1 = 2
    let num2 = 3
    let sum = num1 + num2
    console.log(sum)
    
    // 函数式编程
    function add(num1, num2) {
      return num1 + num2
    }
    let sum = add(2, 3)
    console.log(sum)
    ````

  * 函数编程可以使函数得到最大程度的重用
  
  

### 函数是一等公民（First-class Function）

* 函数可以存储在变量中
* 函数作为参数
* 函数作为返回值

在JS中**函数就是一个普通的对象**（可以通过` new Function()`来创建一个函数对象），我们可以把函数存储到变量、数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过`new Function(`alert(1)`)`来构造一个新的函数

 * 把函数赋值给变量

   ````javascript
   let fn = function () {
     console.log('Hello First-class Function')
   }
   
   // 一个示例
   const BlogController = {
     index (posts) { return Views.index(posts) },
     show(post) { return Views.show(post) },
     create(attrs) { return Db.create(attrs) }
   }
   
   // 优化
   const BlogController = {
     index：Views.index,
     show：Views.show,
     create：Db.create
   }
   ````



### 高阶函数（Higher-order function）

* 可以把函数作为参数传递给另一个函数

* 可以把函数作为另一个函数的返回结果

  ````javascript
  // 函数作为参数
  // 定义一个函数模拟filter
  function filter (array, fn) {
    let results = []
    for(let i = 0; i < array.length; i++) {
      if (fn(array[i])) {
        results.push(array[i])
      }
    }
    return results
  }
  
  // 测试
  let arr = [1, 2, 3, 4, 5]
  let r = filter(arr, function (item) {
    return item % 2 === 0
  })
  console.log(r)
  
  // ---------------------------------
  // 函数作为返回值
  // 定义一个只能执行一次的函数 once
  function once(fn) {
    let done = false;
    return function () {
      if (!done) {
        done = true;
        return fn.apply(this, arguments)
      }
    }
  }
  
  // 测试
  let pay = once(function (money) {
    console.log(`支付：${money} RMB`)
  })
  
  pay(5)
  pay(5)
  pay(5)
  pay(5)
  pay(5)
  // 多次调用，但是只会执行一次
  ````



### 闭包（Closure）

定义：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包。

	* 可以在另一个作用域中调用一个函数的内部函数，并访问到该函数作用域中的成员

闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员



### 纯函数

纯函数：**相同的输入得到的是相同的输出**，而且没有任何可观察的副作用

不纯的函数：相同的输入得到的是不同的输出

````javascript
// slice 返回数组中的指定部分，不会改变原数组（纯函数）
// splice 对数组进行操作返回该数组，会改变原数组（不纯的函数）
let numbers = [1, 2, 3, 4, 5]
// 纯函数
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]

// 不纯的函数
numbers.splice(0, 3)
// => [1, 2, 3]
numbers.splice(0, 3)
// => [4, 5]
````

* 函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态）
* 我们可以把一个函数的执行结果交给另一个函数去处理



### Lodash（纯函数的代表）

* 提供了函数式编程和函数组合的方法



### 纯函数的好处

* 可缓存
* 可测试
* 并行处理
  * 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
  * 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Worker）



### 副作用

````javascript
// 不纯的
let mini = 18
function checkAge(age) {
  return age > mini // 结果可能因为外部的mini变量不同，导致返回的结果不同
}

// 纯函数
function checkAge(age) {
  let mini = 18
  return age > mini
}
````



副作用让一个函数变得不纯（如上例），纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用。

副作用的来源：

* 配置文件
* 数据库
* 获取用户的输入
* ...

所有的外部交互都有可能带来副作用，副作用也使得方法通用性下降不适合扩展和可重用性，同时副作用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控范围内发生



### 柯里化

* 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）

* 然后返回一个新的函数接收剩余的参数，返回结果

  **总结：**

  * 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
  * 这是一种对函数参数的‘缓存’
  * 让函数变得更加灵活，让函数的粒度更小
  * 可以把多元函数换成一元函数，可以组合使用函数产生强大的功能

TODO：柯里化案例、模拟lodash的curry方法



### 函数组合（compose）

* 如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数

  * 函数就像是数据的管道，组合函数就是把这些管道连接起来，让数据穿过多个管道形成最终结果

  * **函数的组合默认是从右到左执行**

    ````javascript
    fn = compose(f1, f2, f3)
    b = fn(a)
    // 执行顺序：f3->f2->f1()
    ````



	#### 	Lodash中的组合函数

   * lodash中组合函数`flow()`或者`flowRight()`,他们都可以组合多个函数
   * `flow()`是从左到右运行
   * **`flowRight()`是从右到左运行，使用的更多一些**

TODO：组合函数原理模拟



		#### 	结合律（associativity）

 * 我们既可以把g 和 h组合，还可以把f 和 g组合，结果都是一样的

   ````javascript
   let f = compose(f, g, h)
   let associativite = compose(compose(f, g), h) == compose(f, compose(g, h))
   // true
   ````

   

### Lodash-fp模块

当我们在使用函数组合解决问题的时候，会使用到lodash中的方法，但是当这个方法需要传递多个参数的时候，我们需要对这些方法进行柯里化的处理，重新包装这些方法，比较麻烦。

lodash/fp(lodash founctional programmin)：lodash 中的函数式编程模块

* lodash的fp模块提供了实用的对函数式编程友好的方法
* 提供了不可变auto-curried iteratee-first data-last的方法



### PointFree（是一种编程风格，通过函数组合实现）

PointFree: 我们可以把数据的处理过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数。

* 不需要指明处理的数据
* **只需要合成运算过程**
* 需要定义一些辅助的基本运算函数（可以借助lodash中已有的函数）

````javascript
// world wild web => W. W. W
const fp = require('lodash/fp')

// 两次调用fp.map遍历数组，影响性能
// const f = fp.flowRight( fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
// 再次调用fp.flowRight将两次fp.map合成一次
const f = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))
console.log(f('world wild web'))
````



### 函子（Functor）

````javascript
class Container {
  static of (value) {
    return new Container(value)
  }
  
  constructor (value) {
    this._value = value
  }
  
  map (fn) {
    return Container.of(fn(this._value))
  }
}

const r = Container.of(5)
					.map(x => x + 2)
					.map(x => x * x)
console.log(r)

// 问题：当传递的值是null或者undefined时报错Cannot read property 'toUpperCase' of null，可以用下面的MyBe函子来处理
Container.of(null)
  .map(x => x.toUpperCase())
````



总结：

* 函数式编程的运算不直接操作值，而是由函子完成
* 函子就是一个实现了map契约的对象
* 我们可以把函子想象成一个盒子，这个盒子里封装了一个值
* 想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数对于值进行处理
* **最终map方法返回一个包含新值的盒子（函子）**



### MayBe函子

可以对外部的空值情况做处理（控制副作用在允许的范围内）

````javascript
class MyBe {
  static of (value) {
    return new MyBe(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this.isNothing() ? MyBe.of(null) : MyBe.of(fn(this._value))
  }

  isNothing () {
    return this._value === null || this._value === undefined
  }
}

const r = MyBe.of('hello world')
  .map(x => x.toUpperCase())
  .map(x => null)
  .map(x => x.split(' '))
  console.log(r) 
// 问题：可以处理空值，但是多次调用map是不能知道是哪一次出现空值的，可以通过Either函子来解决
````



### Either函子

MyBe函子当调用map出现问题时，不会明确指出哪里出了问题，出了什么问题，而Either函子在出现问题的时候会给出错误的有效信息，Either函子可以用来做异常处理

* Either两者中的任何一个，类似于if...else...的处理



### IO函子

IO:input & output

延迟处理不纯的函数

* IO函子中的_value是一个函数，这里是把函数作为值来处理
* IO函子可以把不纯的操作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作纯函数
* 把不纯的操作交给调用者来处理

````javascript
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用
const r = IO.of(process).map(p => p.execPath)
console.log(r)
console.log(r._value())
````

··



### Folktale(一个标准的函数式编程库)

* 和lodash、ramda不同的是，他没有提供很多功能函数

* 只提供了一些函数式处理的操作，例如：compose、curry等，一些函子Task、Either、MayBe等

  ````javascript
  // 安装folktale
  npm i folktale
  ````



### Task函子处理异步任务

```javascript
const fs = require('fs')
const { task } = require('folktale/concurrency/task') // 2.0函数的形式
const { find, split } = require('lodash/fp')

function readFile (filename) {
  return task(resolver => { // resolver参数固定
    return fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)

      resolver.resolve(data)
    })
  })
}

readFile('package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err)
    },
    onResolved: data => {
      console.log(data)
    }
  })
```



### Pointed函子

* Pointed函子是实现了of静态方法的函子
* of方法是为了避免使用new来创建对象，更深层的含义是of方法用来把值放到上下文Context（把值放到容器中，使用map来处理）



### Monad（单子）

解决嵌套调用IO函子的问题：IO(IO(x))

* 一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad





# JavaScript性能优化

## 

### 内容概要

### 内存管理

### JS中的垃圾回收

### GC算法介绍

#### 	什么是GC算法

  * GC是一种机制，垃圾回收器完成具体的工作

  * 工作的内容就是查找垃圾、释放空间、回收空间

  * 算法就是工作时查找和回收所遵循的规则

    

    #### 常见的GC算法

* 引用计数

* 标记清除

* 标记整理

* 分代回收

### 引用计数算法实现原理

* 核心思想：设置引用数，判断当前引用数是否为0
* 引用计数器
* 引用关系改变时修改引用数字
* 引用数字为0时立即回收

### 引用计数算法的优缺点

#### 优点：

* 可以及时回收垃圾对象
* 减少程序卡顿时间

#### 缺点：

* 无法回收循环引用的对象
* 资源消耗大

### 标记清除算法实现原理

* 核心思想：分标记和清除两个阶段完成
* 遍历所有对象找标记活动对象
* 遍历所有对象清除没有标记对象
* 回收响应的空间

### 标记清除算法优缺点

* 缺点：空间碎片化，不会立即回收垃圾
* 优点：可以解决循环引用无法回收的问题

### 标记整理算法实现原理

* 标记整理可以看做是标记清除的增强
* 标记阶段的操作和标记清除一致
* 清除阶段会先执行整理，移动对象位置，使空间连续，避免空间碎片化

### 标记整理算法优缺点

* 优点：减少碎片化空间
* 缺点：不会立即回收垃圾对象

### 认识V8

* V8是一款主流的JavaScript执行引擎
* V8采用及时编译，速度快
* V8内存设限：64位不超1.5G，32位不超800MB

### V8垃圾回收策略

* 采用分代回收的思想

* 内存分为新生代、老生代

* 针对不同对象采用不同算法

  #### V8常用的GC算法

  * 分代回收
  * 空间复制
  * 标记清除
  * 标记整理
  * 标记增量

  

### V8如何回收新生代对象

	#### V8内存分配

* V8内存一分为二
* 小空间用于存储新生代对象（32M | 16M）
* 新生代指的是存活时间较短的对象

#### 新生代对象回收实现

* 回收过程采用复制算法+标记整理
* 新生代内存分为二个等大小空间
* 使用空间为From，空闲空间为To
* 活动对象存储于From空间
* 标记整理后将活动对象拷贝至To
* From与To交换空间完成释放

#### 回收细节说明

* 拷贝过程中可能出现晋升
* 晋升就是将新生代对象移动至老生代
* 一轮GC还存活的新生代需要晋升
* To空间的使用率超过25%需要晋升



### V8如何回收老生代对象

	#### 老生代对象说明

* V8内存一分为二
* 大空间用于存储老生代对象（1.4G | 700M）
* 老生代对象就是指存活时间较长的对象

#### 老生代对象回收实现

* 主要采用标记清除、标记整理、增量标记算法
* 首先使用标记清除完成垃圾空间的回收
* 采用标记整理进行空间优化
* 采用增量标记进行效率优化

#### 标记增量如何优化垃圾回收

将整个的垃圾回收分成多个小段，组合着去执行，从而实现程序执行和垃圾回收交替进行，使得垃圾回收所需的时间消耗更加合理一些



#### 新生代VS老生代回收实现

* 新生代区域垃圾回收使用空间换时间，因为新生代区域空间本来就小，相比空间浪费，所花费的时间是微不足道的
* 老生代区域垃圾回收不适合复制算法，因为老生代的数据比较多



### Performance工具介绍

性能监控工具，通过Performance时刻监控内存

#### 使用步骤

* 打开浏览器输入目标网址
* 进入开发人员工具面板，选择性能
* 开启录制功能，访问具体界面
* 执行用户行为，一段时间后停止录制
* 分析界面中记录的内存信息（内存选项需要勾选）

#### 内存问题的外在表现

* 页面出现延迟加载或者经常性暂停（频繁的垃圾回收）
* 页面持续性出现糟糕的性能（内存膨胀）
* 页面的性能随时间延长越来越差（内存泄漏）

### 界定内存问题的标准

* 内存泄漏：内存使用持续升高
* 内存膨胀：在多数设备上都存在性能问题，所有设备都存在的话考虑程序本身的问题
* 频繁垃圾回收：通过内存变化图进行分析

### 监控内存的几种方式

* 浏览器任务管理器
* Timeline时序图记录
* 堆快照查找分离DOM
* 判断是否存在频繁的垃圾回收（Timeline中频繁的上升下降）



### 代码优化介绍

如何精准测试JavaScript性能：本质上就是采用大量的执行样本进行数学统计和分析

使用基于Benchmark.js的https://jspref.com/完成

#### 慎用全局变量

* 全局变量定义在全局执行上下文，是所有作用域的顶端，程序运行时需要沿着作用域链一直向上查找，影响程序执行效率
* 全局执行上下文一直存在于上下文执行栈，直到程序退出，影响垃圾回收，占用内存空间
* 如果某个局部作用域出现了同名变量则会遮盖或者污染全局

#### 在原型对象上新增实例对象需要的方法

#### 避免属性访问方法使用

#### for循环优化

#### 文档碎片优化节点添加

#### 克隆优化节点操作

#### 直接量替换new Object





























