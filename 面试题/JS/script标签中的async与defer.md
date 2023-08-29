## 单独script标签

浏览器会立刻加载 `script` 中的脚本

![[img/Pasted image 20230826005425.png]]

## async（h5属性）

加载和渲染后面元素的过程将和scipt的加载并行进行（异步），执行会阻塞主线程

先加载完的JS先执行，有依赖关系的JS不可以使用`async`

![[img/Pasted image 20230826005500.png]]

## defer

加载和渲染后面元素的过程将和scipt的加载并行进行（异步），`scipt` 的执行要等所有元素解析完后才执行

![[img/Pasted image 20230826005515.png]]

## 场景

async在对于DOM的操作上没有顺序，可能会导致无法获取DOM元素

**都可以实现JS的延迟加载**

