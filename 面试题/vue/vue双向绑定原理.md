## vue2

`viewmodle` 是连接视图与数据的桥梁

ViewModel的主要职责：
-   数据变化后更新视图
-   视图变化后更新数据

当然，它还有两个主要部分组成
-   监听器（Observer）：对所有数据的属性进行监听
-   解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

### 原理

Vue是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过使用ES5中的`Object.defineProperty()`方法来劫持各个属性的 `setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调来渲染视图。

>Object.defineProperty()允许在对象上定义新的属性，以及修改或删除现有属性的特性，其中包括get、set、enumerable和configurable等。


![[img/Pasted image 20230823230016.png]]


### 步骤

1.  数据劫持：当创建Vue实例时，Vue2会对data选项中的所有属性进行数据劫持。这通过使用Object.defineProperty()方法将每个属性转换为getter和setter，并在数据被访问或修改时触发相应的操作。

2.  Watcher监听器的创建：在编译模板时，Vue2会解析模板中的指令和表达式，并创建相应的Watcher监听器。每个Watcher与一个数据关联，负责监听该数据的变化，并更新相关的视图。
   
3.  依赖收集：模板编译过程中，Watcher会自动收集所依赖的数据（如data、computed、props等），建立起数据与Watcher之间的关联关系。这样，当数据发生改变时，就能找到需要更新的对应Watcher，并通知其进行更新。
   
4.  发布-订阅模式：当数据发生变化时，数据劫持会触发setter函数，并调用发布-订阅模式的调度中心。调度中心会根据依赖收集得到的相关Watcher列表，依次通知这些Watcher进行更新。
   
5.  视图更新：每个被通知的Watcher都会执行相应的更新操作，比如重新渲染视图或更新DOM元素。这样，数据的变化能够实时反映到视图中。

**observer用于给数据绑定`getter`、`setter`**

```js
function defineReactive(obj, key, val) {
	Object.defineProperty(obj, key, {
		enumerable: true,  // 可枚举
		configurable: true,  // 可配置
		get: function reactiveGetter() {
			return val;
		},
		set: function reactiveSetter(newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal;
			// 触发响应式更新操作
			// ...
			console.log('数据更新');
		}
	});
}
  
// 1. 递归遍历 data 对象的所有属性，对其进行数据劫持
function observe(obj) {
	// 递归终止条件
	if (!obj || typeof obj !== 'object') {
		return;
	}
	Object.keys(obj).forEach(key => {
		// 进行数据劫持
		defineReactive(obj, key, obj[key]);
		// 递归遍历
		observe(obj[key]);
	});
}
```


**Vue会将多个数据的变化收集起来，在下一个事件循环或异步任务中进行批量更新。这样可以减少不必要的重复渲染和DOM操作，提高性能**

## vue3

 实现原理 `defineProperty()：ref`  ， 和 `Proxy（）:reactive（）`

`ref`底层采用的`defineProperty`，`reactive`底层采用的H5浏览器window的新对象`Proxy`

