# Image preview

## Description
Provide preview function for image like QQ and WeChat, a group of pictures can be sliding and preview;
Support zoom in, zoom out, move, the maximum magnification of 4; double-click to 2 times zoom

## Dependencies
＋ hammerjs

## API

### show(srcs,[index]);
srcs: A single picture address or multiple address arrays
index: The current display of the picture of the subscript, default zero

### hide
Hide the panel

## 安装使用
```shell
npm install previewimg --save-dev
```

```javascript
var preViewImg = require('previewimg');
preViewImg.show(['....jpg','...jpg'],0);
preViewImg.hide();
```