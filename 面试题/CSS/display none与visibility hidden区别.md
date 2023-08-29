都可以使元素不可见

- `display: none`：不会占位置
	- 在合并CSS树和DOM树时，不会将此DOM与样式合并，页面单独只存在DOM
- `visibility: hidden`：会占据页面位置

## display

![](https://pic2.zhimg.com/v2-9fe6a344cf4f1e5a5d2ec18382299b39_b.webp?consumer=ZHI_MENG)

在上例中，表单元素确实无法被点击，但由于label绑定了id为“hide”的元素，因此点击label标签依旧可以触发click事件，所以说无法被点击的说法是没问题的，但该元素的点击事件依旧被保留，并且可以通过其他手段触发。

**transition与display搭配使用时，会导致过渡消失，直接呈现或者消失元素，可能是transition过渡不支持display的改变，直接操作display会破坏transition的动画。**

除了动画效果外，display: none还会影响CSS的计数队列。举个例子，10个列表从1开始计数，当第二个列表的display置为none，就会导致计数器忽略当前元素，原来的第三个列表则计数为2。

## visibility

visibility属性只是控制元素的可见性，不会使元素从渲染树中消失或改变整体布局，元素实际上已经存在于整个渲染树中，因此它的显隐不会触发浏览器的重排，仅仅是重绘。而display会让元素从渲染树中消失，是真正的不存在，因此如果显示的时候，会触发浏览器的重排，重新绘制整个渲染树。**而重排是影响性能的主要问题，所以只要有可能，都要减少重排的出现**。

首先visibility和display最大的区别点在于，父元素设置了visibility: hidden后，子元素也隐藏的深层原因在于子元素会继承父元素的visibility: hidden，因此，当我们需要隐藏父元素而又要显示部分子元素的时候，只需要把子元素继承的visibility改成默认的 visible属性即可，这点在被设置了display: none的元素上，无法实现。

visibility的元素的子元素只是单纯的继承了父元素的visibility，因此在CSS计数方面不会有任何影响，这点跟display: none也有所不同。同时transition过渡是支持visibility属性的，因此在使用过渡动画的时候，想让元素实现淡入淡出效果来控制显隐的可以使用visibility:hidden。