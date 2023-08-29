>1、创建一个空对象
>2、把空对象和构造函数通过原型链进行连接
>3、把构造函数的this绑定到新的空对象上
>4、根据构建函数返回的数据类型判断，如果是值类型返回对象，引用类型返回此引用类型


```js
function newFun(Fun, ...args) {
  // 创建空对象
  let obj = {}
  // 将空对象的原型指向构造函数的原型
  obj.__proto__ = Fun.prototype
  // 将构造函数的this指向空对象，并运行 Fun
  const res = Fun.apply(obj, args) // apply返回值就是函数返回值
  // 根据返回值类型返回
  return res instanceof Object ? res : obj
}
  
function Person(name) {
  this.name = name
}
  
Person.prototype.say = function () {
  console.log(this.name)
}
  
const p1 = newFun(Person, '张三')
console.log(p1)
p1.say()
```