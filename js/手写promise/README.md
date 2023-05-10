# 手写Promise

## Promise的含义

`Promise` 是异步编程的一种解决方案，ES6将其写进了语言标准。所谓Promise就是一个容器，里面保存着未来才会结束的事件（通常是一个异步操作）的结果。

`Promise` 对象有以下两个特点：

对象的状态不受外界影响。 `Promise` 对象代表一个异步操作，有三种状态：**pending（进行中）、fulfilled/resolved（已成功）、rejected（已失败）**。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

一旦状态改变，就不会再改变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：**从pending变为fulfilled和从pending变为rejected**。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

Promise的优点：

可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

## 手写Promise的步骤

### 1、Promise是一个构造器，用来构造 Promise 实列


创建一个 Promise 实例对象

```js
const p = new Promise((reject, resolve) => {})
```

会传递一个回调函数，含有参数 `reject, resolve` 分别代表失败和成功的回调函数。这个函数会立即执行

每一个 Promise 实例都有一个状态 status，初始值为 `pending`，当调用 `resolve` 函数时，状态变为 `resolved`，调用 `reject` 函数时，状态变为 `rejected`。

都有一个 `value` 保存当前的值

```js
class myPromise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        // 将当前的 this 在 resolve、reject 函数中使用
        executor(this.#resolve.bind(this), this.#reject.bind(this));
    }
}
```

### 2、resolve函数

`resolve` 函数仅仅在当前值为 `pending` 时才能改变状态，否则不做任何操作

此实例对象的状态为 `fulfilled`，值为 `value`

```js
#resolve(data) {
    if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = data;
    }
}
```

### 3、reject函数

`reject` 函数仅仅在当前值为 `pending` 时才能改变状态，否则不做任何操作

此实例对象的状态为 `rejected`，值为 `value`

```js
#reject(reason) {
    if (this.status === 'pending') {
        this.status = 'rejected';
        this.value = reason;
    }
}
```

### 4、then、catch

对于任何一个 `Promise` 实列，都存在 `then`、`catch` 方法，这两个方法都会返回一个 `Promise` 实列

返回的新的 `Promise` 实列的状态和值由 `then`、`catch` 的回调函数的返回值决定

```js
// 4. then 方法中需要传递两个参数，一个是成功的回调，一个是失败的回调（失败回调可省略，在catch中）
then(successCallback, failCallback) {
    if (this.status === 'fulfilled') {
        successCallback(this.value);
        // 返回一个新的 Promise 对象
        return new myPromise((resolve, reject) => {
            resolve(this.value);
        });
    } else if (this.status === 'rejected' && failCallback) {
        failCallback(this.value);
        // 返回一个新的 Promise 对象
        return new myPromise((resolve, reject) => {
            reject(this.value);
        });
    } else if (this.status === 'pending') {
        return new myPromise((resolve, reject) => {});
    }
}

// 5. catch 方法中只需要传递一个失败的回调
catch(failCallback) {
    if (this.status === 'rejected') {
        failCallback(this.value);
        // 返回一个新的 Promise 对象
        return new myPromise((resolve, reject) => {
            reject(this.value);
        });
    } else if (this.status === 'pending') {
        return new myPromise((resolve, reject) => {});
    } else if (this.status === 'fulfilled') {
        return new myPromise((resolve, reject) => {});
    }
}
```

### 5、finally

`finally` 是 `promise` 的最终结果，无论成功还是失败都会执行`

```js
finally(callback) {
    callback();
}
```

