## 事件修饰符

`.stop`：阻止事件冒泡
`.prevent`：阻止默认事件
`.capture`：内部元素触发的事件，先在此处理
`.self `：只有在`event.target`是自身才出发
`.once`：只触发一次
`.passive`：立即触发默认行为
`.native`：将当前元素作为原生元素看待

## 按键修饰符

`.keyup`：键盘抬起
`keydown`：键盘按下

## 系统修饰符

`.ctrl`
`.alt`
`.meta`

## 鼠标修饰符

`.left`
`.right`
`.middle`

## 表单修饰符

`.trim`：删除前后空格
`.lazy`：等输入完或失去焦点再显示
`.number`：输入数据转为数字