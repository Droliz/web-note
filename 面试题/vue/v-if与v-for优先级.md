`v-for` 优先级高于 `v-if`

```html
<ul> 
	<li v-for="item in items" v-if="item.visible">{{ item.name }}</li> 
</ul>
```

因为 v-for 的优先级比 v-if 高，意味着 v-if 只会在每次循环时被考虑一次，而不是在每个元素中单独考虑。这可能会导致不必要的渲染，因为一些不需要渲染的元素仍然会被循环和渲染出来

```vue
<ul>
	<template v-for="item in filteredItems">
		<li>{{ item.name }}</li>
	</template>
</ul>

<script>
export defalut {
	computed: {
		filteredItems() {
			return this.items.filter(item => item.visible);
		}
	}
}
</script>
```

这样，我们就能够确保只有需要渲染的元素被渲染，从而提高应用的性能