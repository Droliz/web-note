## 前言

众所周知，js最初设计是运行在浏览器中的，为了防止多个线程同时操作DOM，带来渲染冲突问题，所以 `js` 执行器被设计成单线程。

但随着前端技术的发展， `js` 能力远不止如此，当我们遇到需要大量计算的场景时（比如图像处理、视频解码等）， `js` 线程往往会被长时间阻塞，甚至造成页面卡顿，影响用户体验。

为了解决单线程带来的这一弊端，`Web Worker` 应运而生。


## 1. webWorker

### 1.1 什么是 Web Worker

`Web Worker` 是 `HTML5` 标准的一部分，这一规范定义了一套 API，**允许我们在 js 主线程之外开辟新的 Worker 线程**，并将一段 js 脚本运行其中，它赋予了开发者利用 js 操作多线程的能力。

因为是独立的线程， `Worker` 线程与 js 主线程能够**同时运行，互不阻塞**。

**所以，在我们有大量运算任务时，可以把运算任务交给 `Worker` 线程去处理**，当 `Worker` 线程计算完成，再把结果返回给 js 主线程。

这样，js 主线程只用专注处理业务逻辑，不用耗费过多时间去处理大量复杂计算，从而减少了阻塞时间，也提高了运行效率，页面流畅度和用户体验自然而然也提高了。

### 1.2 Web Worker 能做什么

虽然 `Worker` 线程是在浏览器环境中被唤起，但是它与当前页面窗口运行在不同的全局上下文中，我们常用的顶层对象 **window，以及 parent 对象在 Worker 线程上下文中是不可用的**

另外，在 `Worker` 线程上下文中，**操作 DOM 的行为也是不可行的**，document 对象也不存在。但是， `location` 和 `navigator` 对象可以以可读方式访问。

除此之外，绝大多数 `Window` 对象上的方法和属性，都被共享到 `Worker` 上下文全局对象 [WorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope) 中。

同样，Worker 线程上下文也存在一个顶级对象 self。

详细信息请参考：[Functions and classes available to Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)


## 2. Web Worker 的使用

## 2.1 创建 Worker 线程

使用 `new` 关键字创建一个 `Worker` ，接收两个参数

```js
const worker = new Worker(path, options);
```

|参数|说明|
|:--|:--|
|`path`|有效的js脚本的地址，必须遵守**同源策略**。无效的js地址或者违反同源策略，会抛出 `SECURITY_ERR` 类型错误|
|`options.type`|可选，用以指定 `worker` 类型。该值可以是 `classic` 或 `module`。 如未指定，将使用默认值 `classic`|
|`options.name`|可选，用以指定 `worker` 的名称，该名称可以在 `onmessage` 事件处理函数中通过 `event.source.name` 属性获取。如未指定，将使用默认值 `Worker`|
|`options.credentials`|可选，用以指定 `worker` 凭证。该值可以是 `omit`, `same-origin`，或 `include`。如果未指定，或者 `type` 是 `classic`，将使用默认值 `omit` (不要求凭证)|

**注意：** `Worker` 线程的 `path` 参数必须遵守**同源策略**，否则会抛出 `SECURITY_ERR` 类型错误。为了安全，`worker 线程无法读取本地文件`，它所加载的脚本必须来自网络，且需要与主线程的脚本同源


### 2.2 js 主线程与 Worker 线程

先构建一个webpack工程（以便于搭建）

主线程与 `worker` 都通过 `postMessage` 方法来发送消息，以及监听 `message` 事件来接收消息。

```js
// main.js（主线程）

const myWorker = new Worker('/worker.js'); // 创建worker

myWorker.addEventListener('message', e => { // 接收消息
    console.log(e.data); // Greeting from Worker.js，worker线程发送的消息
});

// 这种写法也可以
// myWorker.onmessage = e => { // 接收消息
//    console.log(e.data);
// };

myWorker.postMessage('Greeting from Main.js'); // 向 worker 线程发送消息，对应 worker 线程中的 e.data
```

子线程

```js
// worker.js（worker线程）
self.addEventListener('message', e => { // 接收到消息
    console.log(e.data); // Greeting from Main.js，主线程发送的消息
    self.postMessage('Greeting from Worker.js'); // 向主线程发送消息
});
```

上述就完成了主线程与子线程的通信

子线程与主线程之间的通信，是值传递，而不是引用传递，即传递的是数据的副本，而不是数据本身。

**注意：** `Worker` 线程中的 `this` 关键字指向 `WorkerGlobalScope` 对象，而不是 `Worker` 线程本身。

### 2.3 监听错误信息

web worker 提供两个事件监听错误，`error` 和 `messageerror`。这两个事件的区别是:

|事件|说明|
|:--|:--|
|`error`|在 `worker` 内部发生错误时，会触发|
|`messageerror`|当 `message` 事件接收到无法被反序列化的参数时触发|

```js
// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建worker

myWorker.addEventListener('error', err => {
    console.log(err.message);
});
myWorker.addEventListener('messageerror', err => {
    console.log(err.message)
});
```

```js
// worker.js（worker）

self.addEventListener('error', err => {
    console.log(err.message);
});
self.addEventListener('messageerror', err => {
    console.log(err.message)
});
```

### 2.4 worker 线程的关闭

worker 线程的关闭在主线程和 worker 线程都能进行操作，但对 worker 线程的影响略有不同。

```js
// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建worker
myWorker.terminate(); // 关闭worker
复制代码
```

```js
// worker.js（worker线程）
self.close(); // 直接执行close方法就ok了
复制代码
```

无论是在主线程关闭 `worker`，还是在 worker 线程内部关闭 `worker`，`worker` 线程当前的 `Event Loop` 中的任务会继续执行。

至于 `worker` 线程下一个 `Event Loop` 中的任务，则会被直接忽略，不会继续执行。

区别是，在主线程手动关闭 `worker`，**主线程与 `worker` 线程之间的连接都会被立刻停止**，即使 worker 线程当前的 Event Loop 中仍有待执行的任务继续调用 `postMessage()` 方法，但主线程不会再接收到消息。

在 `worker` 线程内部关闭 `worker`，**不会直接断开与主线程的连接，而是等 worker 线程当前的 Event Loop 所有任务执行完，再关闭**。也就是说，在当前 `Event Loop` 中继续调用 `postMessage()` 方法，主线程还是能通过监听 `message` 事件收到消息的。

**在主线程关闭worker**

```js
// index.js
const myWorker = new Worker('/worker.js');
myWorker.addEventListener('message', e => {
	console.log(e.data)
	console.log("在main中关闭worker")
	// 接收到消息关闭worker
	myWorker.terminate();
});

myWorker.postMessage('Greeting from index.js');
```

```js
// worker.js（worker线程）
self.addEventListener('message', e => { // 接收到消息
	postMessage('Greeting from Worker');
	setTimeout(() => {
		console.log('setTimeout run');
		postMessage('Greeting from SetTimeout');
	});
	Promise.resolve().then(() => {
		console.log('Promise run');
		postMessage('Greeting from Promise');
	})
	for (let i = 0; i < 1001; i++) {
		if (i === 1000) {
			console.log('Loop run');
			postMessage('Greeting from Loop');
		}
	}
});
```

![[img/Pasted image 20230511143407.png]]

-   主线程只会接收到 `worker` 线程第一次通过 `postMessage()` 发送的消息，后面的消息不会接收到；
-   `worker` 线程当前 `Event Loop` 里的任务会继续执行，包括微任务；
-   `worker` 线程里 `setTimeout` 创建的下一个 `Event Loop` 任务队列没有执行。

**在worker中关闭**

```js
// main.js（主线程）
  
const myWorker = new Worker('/worker.js');
myWorker.addEventListener('message', e => {
	console.log("main接收到消息", e.data)
});
  
myWorker.postMessage('Greeting from index.js');
```

```js
// worker.js（worker线程）
self.addEventListener('message', e => { // 接收到消息
	postMessage('Greeting from Worker');
	console.log("关闭worker")
	self.close() // 关闭worker
	setTimeout(() => {
		console.log('setTimeout run');
		postMessage('Greeting from SetTimeout');
	});
	Promise.resolve().then(() => {
		console.log('Promise run');
		postMessage('Greeting from Promise');
	})
	for (let i = 0; i < 1001; i++) {
		if (i === 1000) {
			console.log('Loop run');
			postMessage('Greeting from Loop');
		}
	}
});
```


![[img/Pasted image 20230511143723.png]]

即便在 `worker` 中关闭了 `worker` 也依旧可以发送接收（不是立即关闭）

### 2.5 worker线程引用其他js文件

总有一些场景，需要放到 `worker` 进程去处理的任务很复杂，需要大量的处理逻辑。

`web worker` 为我们提供了解决方案，我们可以在 `worker` 线程中利用 `importScripts()` 方法加载我们需要的 `js` 文件，而且，通过此方法加载的 `js` 文件**不受同源策略约束**！

```js
// main.js
const myWorker = new Worker('/worker.js');
myWorker.addEventListener('message', e => {
	console.log("main接收到消息", e.data)
});
  
myWorker.postMessage('Greeting from index.js');
```

```js
// worker.js
importScripts('./test.js')
```

```js
// test.js
  
function add(a, b) {
	return a + b
}
  
console.log(add(2,3))
```

### 2.6 ESModule模式

还有一些场景，当你开启一个新项目，正高兴的用 `importScripts()` 导入js文件时发现， importScripts() 方法执行失败。

仔细一看，原来是新项目的 js 文件都用的是 `ESModule` 模式。难道要把引用到的文件都改一遍吗？

当然不用，还记得上文提到初始化 `worker` 时的第二个可选参数吗，我们可以直接使用 `module` 模式初始化 `worker` 线程！

```js
// main.js（主线程）
const worker = new Worker('/worker.js', {
    type: 'module'  // 指定 worker.js 的类型
});
```

```js
// utils.js
export default add = (a, b) => a + b;
```

```js
// worker.js（worker线程）
import add from './utils.js'; // 导入外部js

self.addEventListener('message', e => { 
    postMessage(e.data);
});

add(1, 2); // log 3

export default self; // 只需把顶级对象self暴露出去即可
```

### 2.7 主线程和 worker 线程可传递哪些类型数据

很多场景，在调用某些方法时，我们将一些自定义方法当作参数传入。但是，当你使用 `postMessage()` 方法时这么做，将会导致 `DATA_CLONE_ERR` 错误。

`postMessage()` 传递的数据可以是由[结构化克隆](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)算法处理的任何值或 `JavaScript` 对象，包括循环引用。

结构化克隆算法**不能处理**的数据：

-   `Error` 以及 `Function` 对象；
-   DOM 节点
-   对象的某些特定参数不会被保留
    -   `RegExp` 对象的 `lastIndex` 字段不会被保留
    -   属性描述符，setters 以及 getters（以及其他类似元数据的功能）同样不会被复制。例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write
    -   原形链上的属性也不会被追踪以及复制。

结构化克隆算法**支持**的数据类型：

|类型|说明|
|:--|:--|
|所有原始类型|除了 `symblos` 外|
|`Boolean` 对象||
|`String` 对象||
|`Date`||
|[RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) |`lastIndex` 字段不会被保留|
|`Blob`||
|`File`||
|[ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)||
|[ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)|这基本上意味着所有的 [类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays) ，如 `Int32Array` 等|
|`ImageData`||
|`Array`||
|`Object`|仅包括普通对象（如对象字面量）|
|`Map`||
|`Set`||


## 3. SharedWorker

**SharedWorker** 是一种特殊类型的 `Worker`，可以被多个浏览上下文访问，比如多个 `windows`，`iframes` 和 `workers`，但这些浏览上下文必须同源。它们实现于一个不同于普通 `worker` 的接口，具有不同的全局作用域：[`SharedWorkerGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope) ，但是继承自[`WorkerGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope#properties_inherited_from_workerglobalscope)

`SharedWorker` 线程的创建和使用跟 `worker` 类似，事件和方法也基本一样。 不同点在于，主线程与 `SharedWorker` 线程是通过[`MessagePort`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMessagePort "https://developer.mozilla.org/en-US/docs/Web/API/MessagePort")建立起链接，数据通讯方法都挂载在`SharedWorker.port`上。

**注意：** 如果采用 `addEventListener` 来接收 `message` 事件，那么在主线程初始化`SharedWorker()` 后，还要调用 `SharedWorker.port.start()` 方法来手动开启端口。

```js
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.start(); // 开启端口

myWorker.port.addEventListener('message', msg => {
	console.log(msg.data);
})
```

如果采用 `onmessage` 方法，则默认开启端口，不需要调用 `myWorker.port.start()`

```js
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.onmessage = msg => {
    console.log(msg.data);
};
```

由于 `SharedWorker` 是被多个页面共同使用，那么除了与各个页面之间的数据通讯是独立的，同一个`SharedWorker` 线程上下文中的其他资源都是共享的。**基于这一点，很容易实现不同页面之间的数据通讯。**

### 使用SharedWorker实现多页面数据共享

- 1.  `index` 页面的 `add` 按钮，每点击一次，向 `sharedWorker` 发送一次 `add` 数据，页面 `count` 增加 $1$

```html
// index.html

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>index page</title>
    </head>
    <body>
        <p>index page: </p>
        count: <span id="container">0</span>
        <button id="add">add</button>
        <br>
        // 利用iframe加载
        <iframe src="./iframe.html"></iframe>
    </body>
    <script type="text/javascript">
        if (!!window.SharedWorker) {
            const container = document.getElementById('container');
            const add = document.getElementById('add');
            
            const myWorker = new SharedWorker('./sharedWorker.js');
            
            myWorker.port.start();

            myWorker.port.addEventListener('message', msg => {
                container.innerText = msg.data;
            });

            add.addEventListener('click', () => {
                myWorker.port.postMessage('add');
            });
        }
    </script>
</html>
```

- 2.  iframe 页面的 `reduce` 按钮，每点击一次，向 `sharedWorker` 发送一次 `reduce` 数据，`页面count` 减少 $1$

```html
// iframe.html

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>iframe page</title>
    </head>
    <body>
        <p>iframe page: </p>
        count: <span id="container">0</span>
        <button id="reduce">reduce</button>
    </body>
    <script type="text/javascript">
        if (!!window.SharedWorker) {
            const container = document.getElementById('container');
            const reduce = document.getElementById('reduce');

            const myWorker = new SharedWorker('./sharedWorker.js');

            myWorker.port.start();
            
            myWorker.port.addEventListener('message', msg => {
                container.innerText = msg.data;
            })

            reduce.addEventListener('click', () => {
                myWorker.port.postMessage('reduce');
            });
        }
    </script>
</html>
```

- 3.  `sharedWorker` 在接收到数据后，根据数据类型处理 `num` 计数，然后返回给每个已连接的主线程。

```js
// sharedWorker.js

let num = 0;
const workerList = [];

self.addEventListener('connect', e => {
    const port = e.ports[0];
    port.addEventListener('message', e => {
        num += e.data === 'add' ? 1 : -1;
        workerList.forEach(port => { // 遍历所有已连接的part，发送消息
            port.postMessage(num);
        })
    });
    port.start();
    workerList.push(port); // 存储已连接的part
    port.postMessage(num); // 初始化
});
```


结果可以发现，`index` 页面和 `iframe` 页面的 `count` 始终保持一致，实现了多个页面数据同步。

### sharedWorker调试

在 `sharedWorker` 线程里使用 `console` 打印信息，不会出现在主线程的的控制台中。如果你想调试 `sharedWorker`，需要在 Chrome 浏览器输入 `chrome://inspect/` ，这里能看到所有正在运行的 `sharedWorker`，然后开启一个独立的 dev-tool 面板。

![[img/Pasted image 20230511200049.png]]

## 4. 兼容性

- 1. `worker` 兼容性

![[img/Pasted image 20230511201530.png]]




## ServiceWorker

除了 `worker` 和 `sharedWorker` 外，还有 `ServiceWorker`。它一般作为 `Web` 应用程序、浏览器和网络之间的代理服务，旨在创建有效的离线体验，拦截网络请求，并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。

[ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)
