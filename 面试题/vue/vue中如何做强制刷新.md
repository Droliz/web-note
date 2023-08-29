1. 页面刷新
	1. `localtion.reload()`
	2. `this.$router.go(0)`
2. 组件刷新
	1. `$forceUpdate()`
		1. `$forceUpdate()` 方法会强制组件重新渲染，从而更新组件的状态
		2. 使用前需要在配置中启用`Vue.forceUpdate()`
		3. forceUpdate只会强制更新页面，不会更新现有的计算属性。
	2. `v-if`
		1. `v-if`通过创建与删除的方式，可以达到强制刷新
	3. 修改`key`属性