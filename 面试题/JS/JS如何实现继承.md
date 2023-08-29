>1、通过原型链
>2、通过借用构造函数
>3、组合式继承
>4、ES6中的class继承

## 1、原型链继承

让一个构造函数的原型是另一个构造函数的实例

```js
function Parent() {
	this.name = 'parent';
	this.play = [1, 2, 3];
}
  
function Child() {
    this.type = 'child';
}

// Child的原型为 Parent 的实例
Child.prototype = new Parent();
  
var s1 = new Child();
console.log(s1.name); // parent
```

此方法简洁易懂。

但是对象实例共享的所有继承的属性和方法，无法向父类构造器传参

## 2、通过借用构造函数

在子类型构造函数的内部调用父类型构造函数：使用`apply()` 或`cal1()`方法将父对象的构造函数绑定在子对象上。

```js
function Parent(gender) {
	this.info = {
		name: '张三',
		age: 18,
		gender
	}
}
  
function Child(gender) {
	Parent.call(this, gender)
}
  
var child = new Child('男')
child.info.nickname = '李四'
console.log(child.info);
  
var child2 = new Child('女')
console.log(child2.info);```

解决了原型链继承不能传参的问题，以及父类原型共享的问题

但是方法都在构造函数中定义，无法实现函数复用，而且在父类原型中的方法无法被子类调用

## 3、组合继承

将原型链和借用构造函数的组合到一块。使用原型链实现对原型属性和方法的继承，

而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，

又能够保证每个实例都有自己的属性

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
  
Person.prototype.sayName = function () {
  console.log(this.name);
}
  
function Student(name, age, score) {
  // 借用构造函数继承属性
  Person.call(this, name, age);
  this.score = score;
}
  
// 原型链继承
Student.prototype = new Person();
  
Student.prototype.sayScore = function () {
  console.log(this.score);
}
  
var s1 = new Student('小明', 18, 100);
s1.sayName();
s1.sayScore();
```

解决原型链与借用构造函数缺点，但是会调用两次父类构造函数

## 4、ES6 class

```js
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	say() {
		console.log(this.name, this.age);
	}
	work() {
		console.log("work");
	}
}
  
class Student extends Person {
	constructor(name, age, score) {
		super(name, age);
		this.score = score;
	}
	say() {
	    console.log(this.name, this.age, this.score);
	}
}
  
let s = new Student("张三", 18, 100);
s.say();
s.work();
```

简单易懂，但是是ES6提出

