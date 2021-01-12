/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2021-01-08 13:55:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2021-01-10 22:10:45
 * @FilePath: /fed-e-task-03-05/05-reactivity/reactivity/index.js
 * @Description: 
 */
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target,key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      console.log('get', key)
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        console.log('set', key, value)
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hasKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hasKey && result) {
        // 触发更新
        console.log('delete', key)
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象的属性， 去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) { // 收集依赖
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  dep.add(activeEffect)
}

export function trigger(target, key) { // 触发更新
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

export function ref(raw) {
  // 判断raw是否是对象，如果是对象且是ref创建的对象则直接返回
  if (isObject(raw) && raw.__v_isRef) return
  
  let value = convert(raw) // 如果raw是普通对象，convert函数会调用reactive把raw转换成响应式对象
  const r = {
    __v_isRef: true,
    get value () {
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw) // 保证重新赋值后，返回的还是响应式的对象
        trigger(r, 'value')
      }
    }
  }
  return r
}

export function toRefs(proxy) {
  let ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }

  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      // 此处不再需要收集依赖因为proxy是reactive对象
      return proxy[key]
    },
    set value (newValue) {
      proxy[key] = newValue
      // 此处不再需要触发更新因为proxy是reactive对象
    }
  }
  return r
}

export function computed(getter) {
  let result = ref()

  effect(() => (result.value = getter()))

  return result
}