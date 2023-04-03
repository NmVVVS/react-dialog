
# React 瀑布流组件

1. 支持 2 种排列方向

- 支持纵向排列
- 支持横向排列（默认）

2. 支持按高度排序
3. 支持根据屏幕宽度自适应列数

**[组件文档地址](https://632339a3ed0b247d36b0fa3c-njrsmzdcdj.chromatic.com/?path=/story/%E4%BB%8B%E7%BB%8D--page)**
## 安装

```
npm i react-masonry-component2
```

## 纵向布局

direction='column'表示纵向布局。

```js
import { Masonry } from 'react-masonry-component2'

export const MyComponent = (args) => {
  return (
    <Masonry
      direction='column'
      columnsCountBreakPoints={{
        1400: 5,
        1000: 4,
        700: 3,
      }}
    >
      <div></div>
      <div></div>
      <div></div>
    </Masonry>
  )
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7336aaf68f594065a262ca832f5fdba3~tplv-k3u1fbpfcp-watermark.image?)

## 横向布局

direction='column'表示横向布局，默认横向布局。

```js
import { Masonry, MasonryItem } from 'react-masonry-component2'

export const MyComponent = (args) => {
  return (
    <Masonry
      columnsCountBreakPoints={{
        1400: 5,
        1000: 4,
        700: 3,
      }}
    >
        <div></div>
        <div></div>
        <div></div>
    </Masonry>
  )
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3e944abbc864873bdf76755b1306756~tplv-k3u1fbpfcp-watermark.image?)

## 横向布局+高度排序

sortWithHeight 表示按照高度排序，选每列高度最小的添加元素。

```tsx
import {Masonry, MasonryItem} from 'react-masonry-component2'

export const MyComponent = (args) => {
  return (
    <Masonry
      sortWithHeight
      columnsCountBreakPoints={{
        1400: 5,
        1000: 4,
        700: 3,
      }}
    >
      <MasonryItem height={200}>
        <div></div>
      </MasonryItem>
      <MasonryItem height={300}>
        <div></div>
      </MasonryItem>
      <MasonryItem height={400}>
        <div></div>
      </MasonryItem>
    </Masonry>
  )
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0995a2a67ac24001b57e434300a7ecd0~tplv-k3u1fbpfcp-watermark.image?)

## 横向布局+高度排序+绝对定位

useAbsolute 表示使用绝对定位实现瀑布流。

```tsx
import {Masonry, MasonryAbsoluteItem} from 'react-masonry-component2'

export const MyComponent = (args) => {
  return (
    <Masonry
      useAbsolute
      sortWithHeight
      columnsCountBreakPoints={{
        1400: 5,
        1000: 4,
        700: 3,
      }}
    >
      <MasonryAbsoluteItem width={100} height={200}>
        <div></div>
      </MasonryAbsoluteItem>
      <MasonryAbsoluteItem width={100} height={300}>
        <div></div>
      </MasonryAbsoluteItem>
      <MasonryAbsoluteItem width={100} height={400}>
        <div></div>
      </MasonryAbsoluteItem>
    </Masonry>
  )
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cca86944185842fba3f976332e481d13~tplv-k3u1fbpfcp-watermark.image?)

## 支持滚动自动加载更多的瀑布流

```tsx
import MasonryScroll from "react-masonry-component2";
export const MyComponent = (args) => {
  return (
    <MasonryScroll
      preload={false}
      fetchApi={() =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(MockData.list);
          }, 500);
        })
      }
    ></MasonryScroll>
  );
};
```

## 支持预加载的瀑布流

```tsx
import MasonryScroll from "react-masonry-component2";
export const MyComponent = (args) => {
  return (
    <MasonryScroll
      fetchApi={() =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(MockData.list);
          }, 500);
        })
      }
    ></MasonryScroll>
  );
};
```