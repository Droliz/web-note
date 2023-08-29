## sort

`sort` 是将数组排序的方法，默认按 `Unicode` 编码排序，也可以自定义排序方法

## 自定义排序

```js
let info = [
  {
    "name": "张三",
    "age": 18,
  },
  {
    "name": "李四",
    "age": 20,
  },
  {
    "name": "王五",
    "age": 22,
  },
]

// 函数返回的值为正数则交换位置
console.log(info.sort((o1, o2) => o2.age - o1.age))
```

**实现一个按指定属性的排序**

```js
function compareFn(arg) {
	return function fn(o1, o2) {
		return o2[arg] - o1[arg]
	}
}
  
console.log(info.sort(compareFn('age')))
```

## 原理

`V8` 引擎之前给出两种：长度小于 10 采用**插入排序**大于 `10` 采用**快速排序**，现在统一使用冒泡