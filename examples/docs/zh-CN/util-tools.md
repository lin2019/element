## Tool 函数

提供常用的工具函数，包括日期处理、数据格式化、验证等。

### 引入方式

```javascript
import { tools } from 'element-ui/src/utils';

// 使用工具函数
tools.formatDate(new Date(), 'YYYY-MM-DD');
tools.deepClone(obj);
```

### 日期处理

#### formatDate

格式化日期。

```javascript
// 基础用法
tools.formatDate(new Date(), 'YYYY-MM-DD');
// 输出: 2023-10-16

// 完整日期时间
tools.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
// 输出: 2023-10-16 14:30:25

// 自定义格式
tools.formatDate(new Date(), 'YYYY年MM月DD日');
// 输出: 2023年10月16日

// 时间戳
tools.formatDate(1697443200000, 'YYYY-MM-DD');
```

**格式化标记**

| 标记 | 说明 | 示例 |
|------|------|------|
| YYYY | 四位年份 | 2023 |
| MM | 月份（补零） | 01-12 |
| DD | 日期（补零） | 01-31 |
| HH | 小时（补零，24小时制） | 00-23 |
| mm | 分钟（补零） | 00-59 |
| ss | 秒（补零） | 00-59 |

#### parseDate

解析日期字符串。

```javascript
tools.parseDate('2023-10-16');
// 输出: Date对象

tools.parseDate('2023-10-16 14:30:25');
```

### 数据处理

#### deepClone

深拷贝对象或数组。

```javascript
const obj = {
  name: '张三',
  info: {
    age: 20,
    hobbies: ['读书', '运动']
  }
};

const cloned = tools.deepClone(obj);
cloned.info.age = 25;
console.log(obj.info.age); // 20，原对象不受影响
```

#### flattenTree

将树形结构扁平化为数组。

```javascript
const tree = [
  {
    id: 1,
    name: '节点1',
    children: [
      { id: 2, name: '节点1-1' },
      { id: 3, name: '节点1-2' }
    ]
  },
  {
    id: 4,
    name: '节点2'
  }
];

const flattened = tools.flattenTree(tree);
// [
//   { id: 1, name: '节点1' },
//   { id: 2, name: '节点1-1' },
//   { id: 3, name: '节点1-2' },
//   { id: 4, name: '节点2' }
// ]
```

#### arrayToTree

将扁平数组转换为树形结构。

```javascript
const list = [
  { id: 1, name: '节点1', pid: 0 },
  { id: 2, name: '节点1-1', pid: 1 },
  { id: 3, name: '节点1-2', pid: 1 },
  { id: 4, name: '节点2', pid: 0 }
];

const tree = tools.arrayToTree(list);
// [
//   {
//     id: 1,
//     name: '节点1',
//     children: [
//       { id: 2, name: '节点1-1' },
//       { id: 3, name: '节点1-2' }
//     ]
//   },
//   { id: 4, name: '节点2' }
// ]
```

### 函数增强

#### debounce

创建防抖函数。

```javascript
// 在methods中使用
export default {
  created() {
    this.handleSearch = tools.debounce(this.search, 300);
  },
  methods: {
    search(keyword) {
      console.log('搜索:', keyword);
    }
  }
};
```

#### throttle

创建节流函数。

```javascript
export default {
  created() {
    this.handleScroll = tools.throttle(this.onScroll, 200);
  },
  methods: {
    onScroll() {
      console.log('滚动事件');
    }
  }
};
```

### 格式化

#### formatNumber

格式化数字。

```javascript
tools.formatNumber(1234.5678, 2);
// 输出: 1,234.57

tools.formatNumber(1234567, 0);
// 输出: 1,234,567
```

#### formatCurrency

格式化金额。

```javascript
tools.formatCurrency(1234.56);
// 输出: ¥1,234.56

tools.formatCurrency(1234.56, '$');
// 输出: $1,234.56

tools.formatCurrency(1234.567, '¥', 2);
// 输出: ¥1,234.57
```

#### formatPhone

格式化手机号。

```javascript
tools.formatPhone('13800138000');
// 输出: 138 0013 8000

tools.formatPhone('13800138000', '-');
// 输出: 138-0013-8000
```

#### formatBytes

格式化字节大小。

```javascript
tools.formatBytes(1024);
// 输出: 1 KB

tools.formatBytes(1048576);
// 输出: 1 MB

tools.formatBytes(1073741824);
// 输出: 1 GB
```

### 验证

#### validatePhone

验证手机号。

```javascript
tools.validatePhone('13800138000');
// 输出: true

tools.validatePhone('12345678901');
// 输出: false
```

#### validateEmail

验证邮箱。

```javascript
tools.validateEmail('test@example.com');
// 输出: true

tools.validateEmail('invalid-email');
// 输出: false
```

#### validateIdCard

验证身份证号。

```javascript
tools.validateIdCard('110101199001011234');
// 输出: true

tools.validateIdCard('123456');
// 输出: false
```

### URL 处理

#### parseQueryString

解析 URL 参数。

```javascript
const url = 'https://example.com?name=张三&age=20&city=北京';
const params = tools.parseQueryString(url);
// 输出: { name: '张三', age: '20', city: '北京' }

// 也可以只传查询字符串
const params2 = tools.parseQueryString('?name=张三&age=20');
```

#### stringifyQuery

对象转 URL 参数字符串。

```javascript
const params = { name: '张三', age: 20, city: '北京' };
const query = tools.stringifyQuery(params);
// 输出: name=张三&age=20&city=北京
```

### 文件处理

#### downloadFile

下载文件。

```javascript
// 下载远程文件
tools.downloadFile('https://example.com/file.pdf', '文档.pdf');

// 下载 Blob 文件
const blob = new Blob(['文件内容'], { type: 'text/plain' });
tools.exportFile(blob, 'file.txt');
```

#### exportFile

导出文件。

```javascript
// 导出 JSON
const data = { name: '张三', age: 20 };
const json = JSON.stringify(data, null, 2);
const blob = new Blob([json], { type: 'application/json' });
tools.exportFile(blob, 'data.json');

// 导出 CSV
const csv = 'name,age\n张三,20\n李四,25';
const csvBlob = new Blob([csv], { type: 'text/csv' });
tools.exportFile(csvBlob, 'data.csv');
```

#### getFileExtension

获取文件扩展名。

```javascript
tools.getFileExtension('document.pdf');
// 输出: pdf

tools.getFileExtension('image.jpg');
// 输出: jpg

tools.getFileExtension('file.tar.gz');
// 输出: gz
```

### 其他工具

#### generateUUID

生成 UUID。

```javascript
tools.generateUUID();
// 输出: '550e8400-e29b-41d4-a716-446655440000'
```

#### randomString

生成随机字符串。

```javascript
tools.randomString(8);
// 输出: 'a7B9cD2e'

tools.randomString(16);
// 输出: 'k3mP9qR2sT5vW8xY'
```

### 实战示例

#### 示例 1：表格数据导出

```javascript
export default {
  methods: {
    exportTableData() {
      const data = this.tableData;
      // 转换为 CSV 格式
      const headers = ['姓名', '年龄', '邮箱'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => [row.name, row.age, row.email].join(','))
      ].join('\n');
      
      // 导出文件
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      tools.exportFile(blob, `用户数据_${tools.formatDate(new Date(), 'YYYYMMDD')}.csv`);
    }
  }
};
```

#### 示例 2：搜索防抖

```vue
<template>
  <el-input 
    v-model="keyword" 
    @input="handleSearch"
    placeholder="搜索用户">
  </el-input>
</template>

<script>
import { tools } from 'element-ui/src/utils';

export default {
  data() {
    return {
      keyword: ''
    };
  },
  created() {
    this.handleSearch = tools.debounce(this.search, 500);
  },
  methods: {
    search(keyword) {
      // 实际的搜索逻辑
      console.log('搜索:', keyword);
      this.fetchUsers(keyword);
    },
    fetchUsers(keyword) {
      // 调用接口
    }
  }
};
</script>
```

#### 示例 3：表单验证

```javascript
export default {
  data() {
    return {
      form: {
        phone: '',
        email: ''
      },
      rules: {
        phone: [
          { 
            validator: (rule, value, callback) => {
              if (!tools.validatePhone(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            }, 
            trigger: 'blur' 
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              if (!tools.validateEmail(value)) {
                callback(new Error('请输入正确的邮箱'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  }
};
```

### API 参考

#### 日期处理

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| formatDate | 格式化日期 | (date, format) | string |
| parseDate | 解析日期 | (dateStr) | Date |

#### 数据处理

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| deepClone | 深拷贝 | (obj) | any |
| flattenTree | 树形数据扁平化 | (tree, childrenKey) | Array |
| arrayToTree | 数组转树形 | (list, idKey, pidKey, childrenKey) | Array |

#### 函数增强

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| debounce | 防抖 | (fn, delay) | Function |
| throttle | 节流 | (fn, delay) | Function |

#### 格式化

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| formatNumber | 数字格式化 | (num, decimals) | string |
| formatCurrency | 金额格式化 | (amount, currency) | string |
| formatPhone | 手机号格式化 | (phone) | string |
| formatBytes | 字节格式化 | (bytes) | string |

#### 验证

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| validatePhone | 手机号验证 | (phone) | boolean |
| validateEmail | 邮箱验证 | (email) | boolean |
| validateIdCard | 身份证验证 | (idCard) | boolean |

#### URL处理

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| parseQueryString | 解析URL参数 | (url) | object |
| stringifyQuery | 对象转URL参数 | (obj) | string |

#### 文件处理

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| downloadFile | 下载文件 | (url, filename) | void |
| exportFile | 导出文件 | (blob, filename) | void |
| getFileExtension | 获取扩展名 | (filename) | string |

#### 其他

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| generateUUID | 生成UUID | - | string |
| randomString | 随机字符串 | (length) | string |

### 待完善

所有函数的具体实现代码待补充。

