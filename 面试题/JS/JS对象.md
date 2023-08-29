## key

**JS的对象的`key`永远都是`string`类型**

```js
var o = {}
var j = {}
var obj1 = {
	a: 1,
}
  
obj1[o] = "111"  // 转为了 [object Object]
obj1[j] = "222"  // 覆盖

console.log(obj1);  // { a: 1, '[object Object]': '222' }
```

## 获取对象属性、方法

