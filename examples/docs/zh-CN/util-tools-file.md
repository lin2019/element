## Tools / File

文件处理与数据导出工具函数。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### downloadFile

下载远程文件到本地。

**参数**

- `url` (string, 必填) - 文件 URL 地址
- `filename` (string, 可选) - 保存的文件名

**返回**

- void

**示例**

```js
// 下载文件
yq.downloadFile('https://example.com/file.pdf', 'document.pdf')

// 不指定文件名，使用服务器返回的文件名
yq.downloadFile('https://example.com/file.pdf')
```

---

### exportFile

导出文件（从 Blob 或字符串数据）。

**参数**

- `data` (Blob | string, 必填) - 文件数据
- `filename` (string, 必填) - 文件名
- `type` (string, 可选) - MIME 类型，默认 `text/plain;charset=utf-8`

**返回**

- void

**示例**

```js
// 导出文本文件
yq.exportFile('Hello World', 'hello.txt')

// 导出 Blob 数据
const blob = new Blob(['content'], { type: 'text/plain' })
yq.exportFile(blob, 'data.txt')

// 指定 MIME 类型
yq.exportFile('<h1>Title</h1>', 'page.html', 'text/html;charset=utf-8')
```

---

### getFileExtension

获取文件扩展名（小写，不含点）。

**参数**

- `filename` (string) - 文件名或路径

**返回**

- string - 文件扩展名

**示例**

```js
yq.getFileExtension('document.pdf') // 'pdf'
yq.getFileExtension('/path/to/image.PNG') // 'png'
yq.getFileExtension('file') // ''
yq.getFileExtension('archive.tar.gz') // 'gz'
```

---

### formatBytes

格式化字节大小为可读字符串。

**参数**

- `bytes` (number, 必填) - 字节数
- `decimals` (number, 可选) - 小数位数，默认 2

**返回**

- string - 格式化后的字符串

**示例**

```js
yq.formatBytes(1024) // '1.00 KB'
yq.formatBytes(1048576) // '1.00 MB'
yq.formatBytes(1234567890) // '1.15 GB'
yq.formatBytes(1024, 0) // '1 KB'
yq.formatBytes(0) // '0 B'
```

---

### fileToBase64

将文件转换为 Base64 字符串。

**参数**

- `file` (File | Blob, 必填) - 文件对象

**返回**

- Promise&lt;string&gt; - Base64 字符串（包含 data URL 前缀）

**示例**

```js
const file = document.querySelector('input[type=file]').files[0]

yq.fileToBase64(file)
  .then((base64) => {
    console.log(base64)
    // data:image/png;base64,iVBORw0KGgoAAAANS...
  })
  .catch((err) => {
    console.error('转换失败', err)
  })
```

---

### base64ToBlob

将 Base64 字符串转换为 Blob 对象。

**参数**

- `base64` (string, 必填) - Base64 字符串（支持 data URL 格式）
- `contentType` (string, 可选) - MIME 类型，默认从 data URL 中提取

**返回**

- Blob | null - Blob 对象，失败返回 null

**示例**

```js
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANS...'
const blob = yq.base64ToBlob(base64)

// 指定 MIME 类型
const blob2 = yq.base64ToBlob('iVBORw0KGgo...', 'image/png')

// 创建预览 URL
if (blob) {
  const url = URL.createObjectURL(blob)
  console.log(url)
}
```

---

### exportJSON

导出 JSON 文件。

**参数**

- `data` (any, 必填) - 要导出的数据对象
- `filename` (string, 可选) - 文件名，默认 `data.json`
- `space` (number, 可选) - JSON 格式化缩进空格数，默认 2

**返回**

- void

**示例**

```js
const data = {
  name: '张三',
  age: 30,
  skills: ['JavaScript', 'Vue', 'React']
}

yq.exportJSON(data, 'user.json')

// 压缩格式（无缩进）
yq.exportJSON(data, 'user.json', 0)
```

---

### exportCSV

导出 CSV 文件（自动添加 BOM，支持 Excel 打开中文）。

**参数**

- `data` (Array&lt;Array | Object&gt;, 必填) - 数据数组（支持对象数组或二维数组）
- `filename` (string, 可选) - 文件名，默认 `data.csv`
- `headers` (Array&lt;string&gt;, 可选) - 表头数组

**返回**

- void

**示例**

```js
// 导出对象数组
const users = [{ name: '张三', age: 30, city: '北京' }, { name: '李四', age: 25, city: '上海' }]
yq.exportCSV(users, 'users.csv')

// 自定义表头
yq.exportCSV(users, 'users.csv', ['姓名', '年龄', '城市'])

// 导出二维数组
const data = [['姓名', '年龄', '城市'], ['张三', 30, '北京'], ['李四', 25, '上海']]
yq.exportCSV(data, 'data.csv')
```

---

### readFileAsText

读取文件内容为文本字符串。

**参数**

- `file` (File | Blob, 必填) - 文件对象
- `encoding` (string, 可选) - 编码格式，默认 `UTF-8`

**返回**

- Promise&lt;string&gt; - 文件内容

**示例**

```js
const file = document.querySelector('input[type=file]').files[0]

yq.readFileAsText(file)
  .then((content) => {
    console.log('文件内容:', content)
  })
  .catch((err) => {
    console.error('读取失败', err)
  })

// 指定编码
yq.readFileAsText(file, 'GBK')
```

---

### getFileMimeType

根据文件名获取 MIME 类型。

**参数**

- `filename` (string) - 文件名

**返回**

- string - MIME 类型字符串

**示例**

```js
yq.getFileMimeType('document.pdf') // 'application/pdf'
yq.getFileMimeType('image.png') // 'image/png'
yq.getFileMimeType('video.mp4') // 'video/mp4'
yq.getFileMimeType('data.json') // 'application/json'
yq.getFileMimeType('unknown.xyz') // 'application/octet-stream'
```

---

### 注意事项

- 所有文件操作函数在非浏览器环境下会安全降级
- `downloadFile` 和 `exportFile` 依赖 `<a>` 标签的 `download` 属性，部分旧浏览器可能不支持
- `exportFile` 对 IE 浏览器使用 `navigator.msSaveBlob` 兼容方案
- `exportCSV` 自动添加 BOM (Byte Order Mark) 以确保 Excel 正确识别 UTF-8 编码
- CSV 导出时会自动转义双引号（`"` 转为 `""`）
- Base64 转换在处理大文件时可能消耗较多内存，建议分块处理
- `getFileMimeType` 仅根据扩展名判断，不验证文件实际内容
- 文件下载可能受浏览器安全策略限制（如跨域、Content-Disposition 响应头等）
