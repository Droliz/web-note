在实际开发过程中，我们常常用到一些第三方的组件库,当需要修改这些组件的默认样式，又不想去除scoped污染全局时，就可以使用样式穿透

vue中针对不同的样式类型(css,less,scss)有不用的样式穿透方法。

-   css 使用 `>>>`

```css
.container >>> .el-table {
    ...
}
```

-   less 使用 `/deep/`

```css
.container /deep/ .el-table {
    ...
}
```

-   scss 使用 `::v-deep`

```css
.container ::v-deep .el-table {
    ...
}
```


**用了样式穿透后，在deep之后的选择器最后就不会再加上标识。**