webpack会把js Css image看作一个模块，用import/require引入
找到入口文件，通过入口文件找到关联的依赖文件，把他们打包到一起
把bundle文件，拆分成多个小的文件，异步按需加载所需要的文件
如果一个被多个文件引用，打包时只会生成一个文件
如果引用的文件没有调用，不会打包，如果引入的变量和方法没有调用也不会打包
对于多个入口文件，加入引入了相同的代码，可以用插件把他抽离到公共文件中

babel用于将高级语法转为低级语法（不支持时）