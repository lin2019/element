# Util 工具函数

提供常用的工具函数，包括 HTTP 请求、自定义指令、标签页操作和通用工具方法。

## 目录结构

```
src/utils/
├── index.js              # 统一导出入口
├── http.js               # HTTP请求工具
├── custom-directives.js  # 自定义指令
├── tab-manager.js        # 标签页管理
└── tools.js              # 通用工具函数
```

## 使用方式

### 完整引入

```javascript
import utils from 'element-ui/src/utils'

// 使用HTTP请求
utils.http.get('/api/data')

// 使用工具函数
utils.tools.formatDate(new Date())

// 使用弹窗操作
utils.popup.open({ path: '/home', name: '首页' })
```

### 按需引入

```javascript
import { http, tools, tabManager, directives } from 'element-ui/src/utils'

// HTTP请求
http.get('/api/data')

// 工具函数
tools.formatDate(new Date())

// 标签页操作
tabManager.openTab({ path: '/home', name: '首页' })

// 自定义指令
// 在Vue中注册
Vue.directive('permission', directives.permission)
```

## 功能模块

### 1. HTTP 请求 (http.js)

基于 axios 封装的 HTTP 请求工具，支持：

- 请求拦截
- 响应拦截
- 错误处理
- GET/POST/PUT/DELETE 等常用方法

### 2. 自定义指令 (custom-directives.js)

提供常用的 Vue 自定义指令：

- `v-permission` - 权限控制
- `v-debounce` - 防抖
- `v-throttle` - 节流
- `v-copy` - 复制到剪贴板
- `v-longpress` - 长按事件
- `v-draggable` - 拖拽

### 3. 标签页管理 (tab-manager.js)

标签页操作功能：

- `openTab()` - 打开新标签页
- `jumpTab()` - 跳转到指定标签页
- `closeTab()` - 关闭标签页
- `closeCurrentTab()` - 关闭当前标签页
- `closeOtherTabs()` - 关闭其他标签页
- `closeAllTabs()` - 关闭所有标签页
- `refreshTab()` - 刷新标签页
- `getAllTabs()` - 获取所有标签页
- `getCurrentTab()` - 获取当前标签页
- `updateTab()` - 更新标签页信息

### 4. 通用工具函数 (tools.js)

提供各类通用工具函数：

#### 日期相关

- `formatDate()` - 日期格式化
- `parseDate()` - 解析日期

#### 函数增强

- `debounce()` - 防抖函数
- `throttle()` - 节流函数

#### 数据处理

- `deepClone()` - 深拷贝
- `flattenTree()` - 树形数据扁平化
- `arrayToTree()` - 数组转树形结构

#### 格式化

- `formatNumber()` - 数字格式化
- `formatCurrency()` - 金额格式化
- `formatPhone()` - 手机号格式化
- `formatBytes()` - 字节大小格式化

#### 验证

- `validatePhone()` - 手机号验证
- `validateEmail()` - 邮箱验证
- `validateIdCard()` - 身份证验证

#### URL 处理

- `parseQueryString()` - URL 参数解析
- `stringifyQuery()` - 对象转 URL 参数

#### 文件处理

- `downloadFile()` - 下载文件
- `exportFile()` - 导出文件
- `getFileExtension()` - 获取文件扩展名

#### 其他

- `generateUUID()` - 生成 UUID
- `randomString()` - 生成随机字符串

## 待完善

目前所有功能模块都已搭建好框架，具体实现待补充。请根据实际需求逐步完善各个功能模块的实现代码。

## 开发计划

1. HTTP 请求模块

   - [ ] 配置 axios 实例
   - [ ] 实现请求拦截器
   - [ ] 实现响应拦截器
   - [ ] 实现错误处理
   - [ ] 实现各种请求方法

2. 自定义指令

   - [ ] 实现权限指令
   - [ ] 实现防抖指令
   - [ ] 实现节流指令
   - [ ] 实现复制指令
   - [ ] 实现长按指令
   - [ ] 实现拖拽指令

3. 标签页管理

   - [ ] 实现标签页打开
   - [ ] 实现标签页关闭
   - [ ] 实现标签页刷新
   - [ ] 实现标签页切换
   - [ ] 实现标签页更新

4. 通用工具函数
   - [ ] 实现日期处理函数
   - [ ] 实现数据处理函数
   - [ ] 实现格式化函数
   - [ ] 实现验证函数
   - [ ] 实现文件处理函数
