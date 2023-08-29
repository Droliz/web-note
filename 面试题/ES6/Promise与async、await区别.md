- 1. 都是处理异步请求的方式
- 2. **`promise` 是 `ES6`，`async` `await` 是 `ES7` 的语法**
- 3. `async` `await` 是基于 `promise` 实现的，他和 `promise` 都是非阻塞性的

## 优缺点

- 1. promise是返回对象我们要用then, catch方法 去处理和捕获异常，并且书写方式是链式，容易造成代码重叠，不好维护，async await是通过tra catch进 行捕获异常

- 2. async await最大的优点就是能让代码看起来像同步- 样，只要遇到await就会立刻返回结果，然后再执行后面的操作promise . then()的方式返回，会出现请求还没返回，就执行了后面的操作


## 前端异步发展史


最开始出现 `Promise` 用于解决回调地狱的问题，每次请求可以放到`.then`中，而且请求的顺序有保证。但是这样代码臃肿不够简洁


```js
Promise.resolve(1)
.then()
.then()
.then()
...
```

为了解决臃肿问题出现了 `generator`，生成器函数，但是这样写还是不够简洁

```js
function * getData() {
	yield http.$axios({url: "/home"});
	yield http.$axios({url: "/list"});
}

let t = getData();

t.next().then(res => {})  // 第一个
t.next().then(res => {})  // 第二个
```

`es7`出现`async、await`，返回的直接就是解析后的数据，不用再`.then`取数据

```js
let h = await http.$axios({url: "/home"})
let l = await http.$axios({url: "/list"})
```