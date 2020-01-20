# mt_h5_App
高仿美团h5 App

#### 目录结构
-- src <br/>
--- component <br/>
--- static <br/>
--- page <br/>
---- index 首页 <br/>
----- actions  //接口文件<br/>
----- reducers <br />
----- Home // 大组件 <br />
------ Header // 细分组件<br />
------- Header.jsx <br />
------- Header.scss <br />
----- index.html page的根html <br/>
----- index.js page的根js <br/>
----- store.js  <br/>
-- dev  // development时需要的静态数据<br/>
-- webpack.config.dev.js //多页面配置 <br/>

#### 移动端配置
- 适配 px转换为rem
```
// 使用的scss
@function px2rem($px) {
    $rem: 37.5px;
    @return ($px / $rem) + rem;
}

//在 webpack.config.XX.js中rules的sass loader中配置
```
或
安装 lib-flexible 和 px2rem 插件

- 适配html的font-size
在index.html 中引入/static/rem.js
订阅resize事件，根据document.documentElement.clientWidth / 10 来设置html的font-size(px)


#### 项目启动
1. 安装依赖
> yarn install

2. 启动
> yarn run dev

3. 打包
> yarn run build

#### 项目预览
<div width="1200">
<img src="./assets/imgs/homepage.jpg" width="300" hegiht="500" />
<img src="./assets/imgs/list.jpg" width="300" hegiht="500" />
<img src="./assets/imgs/detail.jpg" width="300" hegiht="500" />
<img src="./assets/imgs/sale.jpg" width="300" hegiht="500" />
<img src="./assets/imgs/pingjia.jpg" width="300" hegiht="500" />
<img src="./assets/imgs/my.jpg" width="300" hegiht="500" />
</div>
