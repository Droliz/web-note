// 手写 Promise
class myPromise {
    constructor(executor) {
        // 2. Promise 中有三种状态，分别为成功 fulfilled、失败 rejected、等待 pending
        this.status = 'pending';
        // 3. Promise 中需要有一个值，用来表示保存成功或者失败的值
        this.value = undefined;
        // 1. Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
        executor(this.#resolve.bind(this), this.#reject.bind(this));
    }
    
    // 3. resolve 和 reject 函数是用来更改状态的
    #resolve(data) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = data;
        }
    }

    #reject(reason) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.value = reason;
        }
    }

    // 4. then 方法中需要传递两个参数，一个是成功的回调，一个是失败的回调
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

    // 6. finally 方法中只需要传递一个回调
    finally(callback) {
        callback();
    }
}

// 测试
let p = new myPromise((resolve, reject) => {
    // resolve('成功');
    // reject('失败');
});

console.log(p);

p.then((value) => {
    console.log(value);
}).then((value) => {
    console.log(value);
}).catch((reason) => {
    console.log('ERROR');
}).finally(() => {
    console.log('结束');
});