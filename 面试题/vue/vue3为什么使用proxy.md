## Proxy是什么？

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

通俗的讲Proxy是一个对象操作的**拦截器**，拦截对目标对象的操作，进行一些自定义的行为。

## 相比defineproperty优势

- 便利性
	**使用Object.defineProperty方法需要给属性添加set,get访问器的笨拙做法**。
	也就是说`proxy`不需要遍历了，而是直接监控data对象。
- 不污染原始对象
	而且`defineProperty`会修改原始对象
	`proxy`是生成新的代理对象，不修改原对象
- 不需要重载数组方法
	`defineProperty`无法监听数组方法导致的数组变化，需要重载数组方法来手动监听
	`proxy`直接监听
