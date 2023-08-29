## Cookie和Session有什么区别

当服务器第一次接收到客户端请求时，会开辟一块独立的 `session` 空间，建立一个 `session` 对象，同时生成`session id`，会保存在`cookie`中。后面的每次请求头都会带上 `session id`


## 如果没有cookie，session还能进行身份验证吗

不能

