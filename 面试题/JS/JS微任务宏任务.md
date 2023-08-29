JS是单线程的语言，避免同步带来的问题（一个线程创建DOM，一个线程删除DOM，无法判定删除还是创建）

消息队列：消息队列是一个先进先出的队列，它里面存放着各种消息。
事件循环：事件循环是指主线程重复从消息队列中取消息、执行的过程。

JS代码执行流程：$$同步任务执行完->事件循环->微任务->宏任务->判断是否微任务->循环微任务$$

请求、`Promise`、定时器、事件等都会添加到事件循环中

![[img/Pasted image 20230826013739.png]]

**要执行宏任务的前提是将微任务清空了**

**微任务**：`Promise` 的回调函数、`process.nextTick`、`Object.observe`（已废弃）、`MutationObserver`。  
**宏任务**：`setTimeout`、`setInterval`、`setImmediate`（Node.js 独有）、`requestAnimationFrame`、I/O 操作、UI 渲染。

**new promise中的代码不算是微任务，算是同步任务，只有promise的回调函数才算微任务**