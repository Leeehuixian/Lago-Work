1.输出结果为10，通过for循环为数组a创建了10个成员，每个成员都是一个function，for循环之后i变成10，所以调用函数a[6]执行console.log，输出10。

2.执行会报错，因为在if条件内，用let声明的tmp为局部变量，而且不会进行变量提升，及不可以在声明前进行引用。

3.可用Math.min函数和es6的解构操作符（...)

```javascript
var arr = [12, 34, 32, 89, 4];
const min = Math.min(...arr)
console.log(min) // 4
```

4.

> 1. var 声明全局变量，会进行变量提升，可以在声明前进行引用；
> 2. let 声明局部变量，仅在声明的块级作用域可以访问，不存在变量提升，声明前引用将会报错；
> 3. const声明常量，也是局部变量，作用于块级作用域，一旦声明值不可以被修改；

5.最终输出20，this指向调用fn的对象obj， 而在obj内部a属性的值为20。

6.Symbol类型主要用来为对象添加独一无二的属性，从而避免了属性名重复导致的问题；

7.浅拷贝：也就是拷贝A对象里面的数据，但是不拷贝A对象咧面的子对象

深拷贝：会克隆出一个对象，数据相同，但是引用地址不同（就是拷贝A对象里面的数据，而且拷贝他里面的子对象）

8. >JS异步编程会改变程序的执行顺序，Event Loop主要是监听调用栈和消息队列的变化的，当调用栈中的任务都执行完了，Event Loop就会从消息队列中依次取出回调函数压入到调用栈中继续执行。回调队列里的任务称之为"宏任务"，微任务是在当前任务结束后立即执行的任务；

9.

```javascript
Promise.resolve('hello')
	.then((res) => {
		let b = ' lagou'
		return Promise.resolve(`${res}${b}`)
	})
	.then(res => {
		let c = ' I love you'
    		return Promise.resolve(`${res}${c}`)
	})
	.then(res => {
		console.log(res)
	})
```

10.TypeScript是JavaScript的超集，对原有语法进行了增强，提供了类型系统，可以进行静态类型检查，在编写代码的过程中就会提示错误。JavaScipt可以直接移植到TypeScript，TypeScript需要编译生成JavaScript才能被浏览器执行。

11.优点：TypeScript增加了代码的可读性和可维护性，TypeScript即使编译报错，也可以生成JavaScript文件，兼容用JavaScript写的第三方库；开源；支持ES6规范。

缺点：需要理解接口Interfaces、泛型Generics、类Classes、枚举类型等概念，还要多写一些类型的定义，短期会增加一些开发成本，不能直接在浏览器运行。









