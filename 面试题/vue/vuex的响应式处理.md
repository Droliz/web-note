vuex是vue的状态管理工具

vue中可以直接触发methods中的方法，vuex是不可以的。未来处理异步，当触发事件的时候，会通过dispatch来访问

actions中的方法，actions中的commit 会触发mutations中的方法从而修改state里的值，通过getter把数据更新到视图

Vue.use(vuex)，调用install方法， 通过applyMixin(vue) 在任意组件内执行this . $store就可以访间到store对象。

vuex的state是响应式的，借助的就是vue的data,把state存到vue实例组件的data中