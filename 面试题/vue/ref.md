`vue2` 用来获取DOM元素的

```js
<!-- 标签上设置ref属性 -->
<img ref='imgs' src="../1.jpg" />

// js获取DOM元素
this.$refs.imgs  // <img /> DOM 元素
```

`vue3` 的 `ref` 是用来构建响应式数据的

```js
import { ref } from 'vue'

const a = ref("a")
```
