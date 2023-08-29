写一个左中右布局占满屏幕，其中左、右俩块固定宽200，中间自适应宽，要求先加载中间块，请写出结构及样式。

## flex实现

```html
<!DOCTYPE html>
<html lang="en">
  
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    body {
      width: 100vw;
      height: 100vh;
    }
  
    .box {
      width: 100%;
      height: 100%;
      /* 弹性盒布局 */
      display: flex;
      flex-direction: row
    }
  
    .left, .mid, .right {
      height: 100%;
    }
  
    .left, .right {
      /* 固定宽度 */
      width: 200px;
      background-color: bisque;
    }
  
    .left {
      /* left往左排 */
      order: -1;
    }
  
    .mid {
      /* 宽度自适应 */
      flex-grow: 1;
      background-color: aquamarine;
    }
  </style>
</head>
  
<body>
  <div class="box">
    <!-- 优先加载中间的 -->
    <div class="mid">mid</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
</body>
  
</html>
```