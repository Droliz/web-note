**都是改变 this 指向和函数的调用，call与apply的功能类似，传参方法不同。**

```js
函数.call()
函数.apply()
函数.bind()
```

`call` 方法传递参数列表（写多个参数），`apply` 将参数以数组形式传递

`bind` 传参不会立刻执行，会返回一个改变 `this` 指向的函数，此函数可以传参。

`call` 性能比 `apply` 高

```js
function fn(...arg) {
	console.log(arg);
}
  
fn.apply(null, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
fn.call(null, 1, 2, 3, 4, 5, 6, 7, 8, 9);
fn.bind(null, 1, 2, 3, 4, 5, 6, 7, 8, 9)();
```
