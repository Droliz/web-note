1. hash的路由地址上有$#$号，`history` 模式没有
2. 在做回车刷新的时候，`hash` 模式 会加载对应页面，`history` 会报错404
3. `hash` 模式支持低版本浏览器，`history` 不支持， 因为是**H5新增的API**
4. `hash` 不会重新加载页面，单页面应用必备
5. `history` 有历史记录，H5新增了 `pushState` 和 `replaceState()` 去修改历史记录
6. `history` 需要后台配置

