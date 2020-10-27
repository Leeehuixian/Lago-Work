### 简答题：

### 一、请简述Vue的首次渲染过程

答：

第一步、Vue初始化，实例成员、静态成员

首先Vue初始化，即初始化实例成员及静态成员。

第二步、new Vue()

初始化结束以后，调用vue的构造函数new Vue(), 在构造函数中调用`this._init()`方法

第三步、`this.init()`

`this.init()`相当于整个项目的入口，在这个方法中，最终调用`vm.$mount()`

第四步、`vm.$mount()`

这个`$mount()`是`src/platform/web/entry-runtime-width-compile.js`中定义的，核心作用是把模板编译为`render`函数，判断是否有`render`选项，如果没有，则会获取template选项，如果template也没有，会把el中的内容作为模板，通过`compileToFunction()`方法将模板编译为render函数，编译好以后，将render存入到options.render中。

第五步、`vm.$mount()`

调用`src/platform/web/runtime/index.js`文件中的$mount方法，这个方法中会重新获取el，因为如果是运行时版本的话，是不会走`entry-runtime-width-compile.js`这个入口获取el，所以如果是运行时版本的话，我们会在`runtime/index.hs`的`$mount()`中重新获取el。

第六步、`mountComponent(this, el)`

这个方法在`src/core/instance/lifecycle.js`中定义的，首先判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境，则发出警告（运行时版本不支持编译器），触发`beforeMount`钩子函数（开始挂载之前），定义updateComponents函数但是并未调用，在这个函数中调用`render()`和`update()`两个方法，render是生成虚拟dom，update是将虚拟dom转化为真实dom并挂载到页面上，创建Watcher实例对象，创建时，传递函数updateComponents，然后调用get方法，创建完毕后，触发钩子函数`mounted()`挂载结束，返回vue实例

第七步、`Watcher.get()`

创建完watcher，会调用一次get，在get方法中会调用`updateComponent()`,`updateComponent`会调用实例化时传入的`render()`或是编译模板以后生成的`render()`,返回vnode。然后`vm._update()`,调用`vm._patch_`方法,将虚拟dom转化为真实的dom并挂载到页面上，将生成的真实dom记录到`vm.$el()`中。



### 二、请简述Vue响应式原理

答：从vue实例的init()开始，把data对象注入到vue实例中，并且通过调用observe()方法把data对象转换成响应式对象。observe()作为响应式的入口，接收一个参数及响应式要处理的对象，当这个参数的类型为对象且没有`_ob_`属性(表明未进行过响应式处理)时，创建observer对象并且返回。在Observer构造函数里会给value对象定义不可枚举的`_ob_`属性，用来记录当前的observer对象，然后分别对数组和对象进行响应化的处理。对对象进行响应化的处理，主要是通过遍历对对象的每一个属性调用`defineReactive()`，在`defineReactive`中会为每一个属性创建dep对象，`defineReactive`的核心是定义getter，返回属性的值和收集依赖，定义setter，保存新值和派发更新（及发送通知，调用`dep.notify()`）。当访问data中的属性时，会进行依赖收集。当数据发生变化的时候，会触发`dep.notify()`进而调用watcher对象的update方法，在update方法中会调用`queuewatcher（）`判断watcher是否被处理，如果没有的话添加到queue队列中，并刷新队列（调用`flushSchedulerQueue()`），`flushSchedulerQueue()`中调用`watcher.run()`,实现把数据更新到视图上。



### 三、请简述虚拟DOM中key的作用和好处

答：key值的作用其实是追踪列表中哪些元素被添加、被修改、被移除的辅助标志。以便基于key的变化重新排列元素顺序，从而重用和重新排序现有元素，并且会移除key不存在的元素。方便让vnode在diff过程中找到对应的节点，然后成功复用。好处：可以减少dom操作，减少diff和渲染所需要的时间，提升性能。



### 四、请简述Vue中模板编译的过程

答：模板编译的入口函数compileToFunctions(template,...)会先从缓存中加载编译好的render函数，如果缓存中没有则调用compile(template, options)进行编译，在compile函数中会先合并options，然后调用baseCompile(template.trim(), finalOptions)编译模板，baseCompile方法的核心是parse()解析器：把template转换成AST tree抽象语法树、optimize()优化器：标记AST tree中的静态根节点，静态根节点不需要每次被重绘，patch过程会跳过静态根节点、generate()代码生成器：把优化过后的AST tree抽象语法树转换成js的创建代码。当compile方法执行结束会回到compileToFunctions(template,...)入口函数，继续把上一步中生成的字符串形式js代码通过createFunction方法转换成函数，当render和staticRenderFns初始化完毕，最终会被挂载到Vue实例的options对应的属性上，到此结束模板编译。



