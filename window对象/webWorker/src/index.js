// main.js（主线程）

const myWorker = new Worker('/worker.js'); 
myWorker.addEventListener('message', e => {
    console.log("main接收到消息", e.data)
});

myWorker.postMessage('Greeting from index.js');
