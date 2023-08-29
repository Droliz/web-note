1、除了函数之外，JS没有块级作用域

```js
function fn() {
	var a = 1;
}
  
fn();
console.log(a)  // error  未定义

for (var b = 0; b < 1; b++) {}

console.log(b)  // 1
```

2、作用域链：内部可以访问外部的变量，但是外部不能访问内部变量，如果内部有，优先内部的，如果内部没有，就先查找外部的

```js
function foo() {
	var a = 2;
	function bar() {
		console.log(a);  // 2
	}
	bar();
}
  
foo();   
```

3、**注意声明变量是用var，还是没有写，如果没写var，直接赋值，就是(`window.`下面的全局)**


```js  
function fn() {
	// 如果没写var，直接赋值，相当于在 window 下
	var a = b = 20
	// 注意这样是会导致覆盖 window 上的属性和方法的
}

fn()

console.log(window.b, window.a)  // 20  undefined
```

4、变量提升（var声明的变量，在作用域顶部声明，在赋值位置才赋值）

```js
function foo() {
	var a = 1;
	function bar() {
		console.log(b);  // undefined
		var b = 2;
		console.log(b);  // 2
	}
	bar();
	console.log(a);   // 1
}
  
foo();
```


```js
var name = 'a';
(function () {
	if (typeof name == 'undefined') {
		var name = 'b'
		console.log('111' + name)
	} else {
		console.log('222' + name)
	}
})()

// 111b
```

>if是没有块级作用域的，if中的变量提升，函数是有块级作用域的，所以判断时仅仅是声明了name

5、优先级：$声明变量 > 普通声明函数 > 参数 > 变量提升$。普通声明函数，不看写函数的时候的顺序，反正都是要变量提升的，而且取值就是函数本身，这就相当于是，函数不仅声明提升了，定义也提升了

```js
// 参数 > 变量提升
function a(a) {
	console.log(a)  // 2 
	var a = 1
}
  
a(2)
```

```js
// 普通函数声明 > 参数
function a(a) {
	console.log(a)  // [Function: a]
	function a() {}
}
  
a(2)
```

```js
// 声明变量 > 普通函数声明
var a = 1;
function a() { }
console.log(a);  // 1
```


## 步骤

- 1、注意本层的变量提升（只有函数有块级作用域）
- 2、注意声明的优先级$声明变量 > 普通声明函数 > 参数 > 变量提升$

