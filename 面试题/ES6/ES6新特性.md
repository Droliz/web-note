## 块级作用域

`let`、`const`存在暂时性死区问题
`let`防止像`var`一样的变量提升，以及在声明前调用得到 `undefined`
`let`和`const`都不能在同一作用域重复声明

## 新增类的定义

`class`关键字来声明类

## 新增一种基本数据类型

`symbol`代表独一无二的值

```js
// symbol
const symbol = Symbol('foo');
const symbol2 = Symbol('foo');
  
console.log(symbol === symbol2); // false
```

## 新增解构赋值

从数组或对象中取出值，然后给其他变量赋值（函数参数也可）

```js
// 解构赋值
  
let [a, ...c] = [1, 2, 3];
console.log(a, c)
  
// 函数参数
function add([x, y]) {
  return x + y;
}
  
console.log(add([1, 2]))
```

## 新增函数参数默认值

```js
// 函数默认值
function fn(a, b = 1) {
    console.log(a, b);
}
  
fn(2); // 2 1
```

## 数组新的api

- 1. `Array.from()` 将类数组转换为数组
- 2. `Array.of()` 将一组值转换为数组
- 3.` find()` 实例方法，用于找出第一个符合条件的数组成员
- 4. `findIndex()` 实例方法，用于找出第一个符合条件的数组成员的位置
- 5. `fill()` 实例方法，使用给定值，填充一个数组
- 6. `entries() keys() values()` 实例方法，用于遍历数组
- 7. `includes()` 实例方法，返回一个布尔值，表示某个数组是否包含给定的值
- 8. `flat() flatMap()` 实例方法，用于数组的扁平化和映射
- 9. 数组空位，数组的空位指，数组的某一个位置没有任何值。数组的空位不是undefined，一个位的值等于undefined，依然是有值的，空位是没有任何值的，in运算符可以说明这一点。ES6 则是明确将空位转为undefined。forEach() filter() reduce() every() some() map() 方法都会跳过空位

## 对象和数组的扩展运算符

`...`

```js
let arr = [1, 2, 3, 4, 5];
console.log(...arr);
// 1 2 3 4 5
// 用于函数调用
function add(x, y, z) {
    return x + y + z;
}
let numbers = [1, 2, 3];
console.log(add(...numbers));
// 6
// 用于构造字面量
let dateFields = [1970, 0, 1]; // 1 Jan 1970
let d = new Date(...dateFields);
console.log(d);
// Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
// 用于数组字面量
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
// 把 arr2 中所有元素附加到 arr1 后面并返回
arr1 = [...arr1, ...arr2];
```

## Promise

`Promise`用于解决回调地狱

自身有`all`、`reject`、`resolve`、`rece`方法
原型上有`then`、`catch`方法

把异步操作队列化

三种状态：`pending`初始、`fulfilled`成功、`rejected`失败

`pending` -> `fulfilled`、`pending` -> `rejected` 不可再改变

`async`、`await`：同步代码做异步操作，必须搭配使用。函数前面加上`async`函数内有异步操作，调用函数会返回`Promise`。

`await`是组成`async`的表达式，结果取决于它等待的内容，如果是`Promise`那么就返回`Promise`的结果，如果是普通的函数就进行链式调用。

如果`await`后的`Promise`变成`reject`状态，那么就会立刻停止`async`函数，之后的都不会运行


## 模块化

`import`、`export`

## set和map数据结构

set：不重复

map：键值对，key类型不受限制

## generator

生成器函数，返回一个迭代器对象，可以通过next()方法依次遍历生成器函数中的每一个值

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function* gen(arr) {
	for (let i = 0; i < arr.length; i++) {
		yield arr[i];
	}
}
let g = gen(arr);
console.log(g.next());
console.log(g.next());
console.log(g.next());
```

可以用`for of` 直接遍历

```js
for (let i of g) {
	console.log(i);
}
```

通过生成器可以解决多个请求导致代码臃肿问题（确保了顺序问题）

```js
function * getData() {
	yield http.$axios({url: "/home"});
	yield http.$axios({url: "/list"});
}

let t = getData();

t.next().then(res => {})  // 第一个
t.next().then(res => {})  // 第二个
```

## 箭头函数

ES6之前调用函数会有this指向问题

- 箭头函数不能作为构造函数（无法通过new关键字创建实例）
- 没有原型
- 箭头函数没有`arguments`
- 箭头函数不能使用`call`、`apply`、`bind`
- 箭头函数自身没有this，this指向外层函数
