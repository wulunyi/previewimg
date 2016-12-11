# 图片预览组件

## 功能
提供类QQ和微信的图片预览功能，可对一组图片进行滑动并预览;
支持放大，缩小，移动，最大放大倍数为4；双击为2倍放大

## 依赖库
＋ hammerjs

## API

### show(srcs,[index]);
srcs: 单个图片地址或多个地址数组
index: 当前展示图片的下标，默认为零
注：不传参数表示显示上一次的数据

### hide
参数无控制组件的隐藏

## 安装使用
```shell
npm install previewimg -D
```

```javascript
var preViewImg = require('previewimg');
preViewImg.show('....jpg',0);
preViewImg.hide();
preViewImg.show();
```