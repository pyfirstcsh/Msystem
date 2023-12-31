# 大作业考核   

## 如何使用？   

```
    前端执行npm run build   
    后端执行node koa_server.js   
    浏览器访问3001即可   
    User:LoveM   
    Pwd:loveryourself
    温馨提示：图片资源加载需要翻墙。
```

### 前端   
- 目录为`final/fe/` 
- `npm run build`构建项目(打包到server/static目录)
- `npm start`运行项目
- 默认监听3000端口

### 后端   
- 目录为`final/server`
- `node koa_server.js`启动项目
- 默认监听3001端口

### 登录信息   
- 默认用户名为`LoveM`
- 默认密码为`loveyourself`

## 作业完成记录   

### 前端完成记录  

#### 开发记录   
- 使用 cra + ts + antd 开发完成
- 将项目打包到 `server/static` 文件夹，便于前后端联系
- 能够分组件开发，有良好的代码风格和注释习惯。
- 能够通过eslint检验
- 具体实现不再赘述，详情见代码注释。

#### 遇到的问题   
- 对于antd组件传递数据掌握不熟练，导致需要很多全局变量来进行设置，大大增加了实现的复杂性。
- 对于分组件的全局状态管理不熟练，对于hookS组件渲染了解不透彻，导致前端数据传递进展困难，后通过从后端获取数据，越过这个问题，但依旧对全局状态了解不够。
- 对于DropDown组件传递数据不会使用，更替为` span`标签进行操作。

### 后端完成记录   

#### 开发记录   
- 使用`koa-session`,`koa-static`,`koa-router`,`koa-body`开发。
- 用户登录信息保存在session中，能够在请求前进行登录验证。
- 使用`faker`模块随机生成测试数据。
- 分模块完成，有良好的注释。
- 能够通过eslint检验
- 具体实现不再赘述，详情见代码注释。

#### 遇到的问题   
- 对于路由代理的了解不够透彻，导致开发前阶段对于请求的获取以及数据的传递进展很慢。
- require 导入包不够熟悉，导致自己分模块时出现问题。


## 作业不足记录  

- 界面不足见网页About中不足之处
- 对数据的处理不够细腻，没有能够性别按照筛选后的数据进行搜索，搜索只能按照姓名搜索。不能添加附加筛选条件。
- 性别筛选与名称查找很割裂，没有融合在一起。要实现需在后端进行数据查找时添加额外的查找条件。
- 对于越界查询的界面处理不够美观

## 课程收获与总结   

### 收获与总结   
- 这次课程对我来说是一次很不小的挑战，从只对html基础有一点了解开始，学习了这么多次课程。不断完善自己对web前端开发的认知，构建起较为完善的知识框架。知道了如何通过较为便捷的方式构建项目，知道了前后端的联系和路由转化的实现。这对于自己计算机网络的理解有很大的帮助。
- 但同时，自己对于知识的掌握只停留在表面。现阶段只能通过模仿，一点点实现功能。对于原理和板块之间的功能了解的还不够透彻，缺乏解决问题的能力。还需要扩充很多的知识，更加加深对技能的掌握。
- 感谢老师在课上的讲授与课下的答疑，使得自己能够对于不熟悉的知识有更全面的了解。

### 一些课程建议   
- 总的来说，这次课程是一次循序渐进的课程，课堂的知识很密集，对于基础较薄的学生来说消化起来很难，还需要在课下花费大量的时间。希望能够在课前能够发布一些下次课程的简要资料，能够让学生提前有个了解，这样在上课时消化起来也比较容易和透彻。





