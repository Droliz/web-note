## 原因

vuex的数据存在运行内存中，所以再刷新时，会丢失数据

## 解决方案

1、将数据存在浏览器缓存中
2、在页面刷新时再次请求数据
	监听浏览器的刷新事件，在刷新前把数据保存到sessionstorage里，刷新后请求数据，请求到了用vuex，如果没有那就用sessionstorage里的数据
