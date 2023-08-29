```js
function fun() {
	return console.log(111);
}
  
console.log(fun);   // [Function: fun]
console.log(fun());  // 111  undefined
console.log(new fun());  // 111  fun {}
console.log(new fun);  // 111  fun {}
```

`new` 关键字一定会执行代码，`fun`不加`()`是不会执行的，只会返回函数体

## 面试题

**面试题一**

```js
function Foo() {
	// 没有使用关键字赋值，属于 window 的方法，不属于 Foo
	getName = function () {
		console.log(1);
	};
	// 这里的this取决于调用Foo()的对象，如果是window，那么返回的就是window
	// 如果是new Foo()，那么返回的就是Foo()的this
	return this;
}

// 直接在Foo上添加getName方法（相当于构造函数上添加）
Foo.getName = function () {
	console.log(2);
};

// 原型上的方法，自生有getName方法，所以不会再向上查找，不可能被调用
Foo.prototype.getName = function () {
	console.log(3);
};

// 在调用 Foo 时被重新赋值（window上的方法）
var getName = function () {
	console.log(4);
};

// 由于存在变量 getName 且不是变量提升，所以不可能被调用
function getName() {
	console.log(5);
}

// 直接调用自身的方法
Foo.getName(); // 2
// 变量声明大于普通函数声明，所以这里getName是变量
getName(); // 4
// 此时Foo()返回的是this会运行函数中的getName方法，然后getName被重新赋值，返回的this是window，相当于window.getName()
// 这里直接调用的函数，所以this是window
Foo().getName(); // 1
// 由于上述调用了Foo()，所以getName被重新赋值，所以这里的getName是window.getName()
getName(); // 1
// 采用 new 的方式调用，此时的this是Foo()的this，但是实例上并没有getName所以根据原型链找到了构造函数的原型上
new Foo().getName(); // 3
// new直接运行的Foo函数，函数中并没有方法，所以实例上不会有getName方法
```

**面试题二**

```js
const o = {
	a: 10,
	b: {
		// 谁调用了这个函数，this就指向谁
		fn: function () {
			console.log(this.a);  // undefined 
			console.log(this);  // { fn: [Function: fn] }
		}
	}
}
// 相当于 b 调用了 fn
o.b.fn()
```

**面试题三**

```js
window.name = 'name'
function A() {
	this.name = 123;
}

A.prototype.getA = function () {
	console.log(this);  // window
	return this.name + 1;
}

let a = new A();  // 创建实例 a，a的原型上（构造函数原型）有getA方法
let funcA = a.getA;   // 将 getA 的函数体赋值给 funcA
console.log(funcA());  // 在window下调用 funcA，此时this就是 window
```

**面试题四**

```js
var len = 10
function fn() {
	return this.len + 1
}

var obj = {
	len: 5,
	test1: function () {
	  return fn();
	}
}

obj.test2 = fn;

// 返回 fn() 就相当于 window.fn()
console.log(obj.test1()); // 11
// 相当于 11 === 6
console.log(fn() === obj.test2()); // false
// 相当于 11 === 6
console.log(obj.test1() == obj.test2()); // false
```