vue3废弃了过滤器，采用计算属性实现

vue2的特性，用来对文本进行格式化处理

使用它的两个地方，一个是插值表达式，一个是v-bind

1. 全局过滤器

```js
Vue.filter('add', function(v){
	return V < 10 ? '0'+V:V
})
<div>{{33| add}}</div>
```

2. 局部过滤器

```
filter:{
	add: function(v){
	return V < 10 ? 'O'+V: V
}
```