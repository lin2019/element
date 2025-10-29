## Tools / Format

数据格式化与文本处理工具函数。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### formatNumber

数字格式化（千分位分隔）。

**参数**

- `num` (number, 必填) - 数字
- `decimals` (number, 可选) - 小数位数，默认 2
- `decimalSeparator` (string, 可选) - 小数点符号，默认 `.`
- `thousandsSeparator` (string, 可选) - 千分位符号，默认 `,`

**返回**

- string - 格式化后的数字字符串

**示例**

```js
yq.formatNumber(1234567.89) // '1,234,567.89'
yq.formatNumber(1234567.89, 0) // '1,234,568'
yq.formatNumber(1234567.89, 2, ',', ' ') // '1 234 567,89' (欧洲格式)
```

---

### formatCurrency

金额格式化（带货币符号）。

**参数**

- `amount` (number, 必填) - 金额
- `options` (string | Object, 可选) - 货币符号或配置对象
  - `symbol` (string) - 货币符号，默认 `¥`
  - `decimals` (number) - 小数位数，默认 2
  - `symbolPosition` (string) - 符号位置，`'before'` | `'after'`，默认 `'before'`

**返回**

- string - 格式化后的金额字符串

**示例**

```js
yq.formatCurrency(1234.56) // '¥1,234.56'
yq.formatCurrency(1234.56, '$') // '$1,234.56'
yq.formatCurrency(1234.56, {
  symbol: '€',
  decimals: 2,
  symbolPosition: 'after'
}) // '1,234.56€'
```

---

### formatPhone

手机号格式化（3-4-4 格式）。

**参数**

- `phone` (string, 必填) - 手机号
- `separator` (string, 可选) - 分隔符，默认空格

**返回**

- string - 格式化后的手机号

**示例**

```js
yq.formatPhone('13800138000') // '138 0013 8000'
yq.formatPhone('13800138000', '-') // '138-0013-8000'
```

---

### formatBankCard

银行卡号格式化（4 位一组）。

**参数**

- `cardNo` (string, 必填) - 银行卡号
- `separator` (string, 可选) - 分隔符，默认空格

**返回**

- string - 格式化后的卡号

**示例**

```js
yq.formatBankCard('6222021234567890123') // '6222 0212 3456 7890 123'
yq.formatBankCard('6222021234567890123', '-') // '6222-0212-3456-7890-123'
```

---

### maskPhone

隐藏手机号中间四位（脱敏）。

**参数**

- `phone` (string, 必填) - 手机号
- `mask` (string, 可选) - 遮罩字符，默认 `*`

**返回**

- string - 脱敏后的手机号

**示例**

```js
yq.maskPhone('13800138000') // '138****8000'
yq.maskPhone('13800138000', 'X') // '138XXXX8000'
```

---

### maskIdCard

隐藏身份证号（脱敏）。

**参数**

- `idCard` (string, 必填) - 身份证号
- `startLen` (number, 可选) - 开头保留位数，默认 6
- `endLen` (number, 可选) - 结尾保留位数，默认 4

**返回**

- string - 脱敏后的身份证号

**示例**

```js
yq.maskIdCard('110101199001011234') // '110101********1234'
yq.maskIdCard('110101199001011234', 4, 2) // '1101**********34'
```

---

### formatPercent

百分比格式化。

**参数**

- `value` (number, 必填) - 数值（0-1 或 0-100）
- `decimals` (number, 可选) - 小数位数，默认 2
- `isDecimal` (boolean, 可选) - 输入是否为小数（0-1），默认 true

**返回**

- string - 百分比字符串

**示例**

```js
yq.formatPercent(0.1234) // '12.34%'
yq.formatPercent(0.1234, 0) // '12%'
yq.formatPercent(12.34, 2, false) // '12.34%' (输入已是百分比数值)
```

---

### truncate

文本截断（添加省略号）。

**参数**

- `text` (string, 必填) - 文本
- `maxLength` (number, 必填) - 最大长度
- `ellipsis` (string, 可选) - 省略号，默认 `...`

**返回**

- string - 截断后的文本

**示例**

```js
yq.truncate('这是一段很长的文本内容', 10) // '这是一段很长的...'
yq.truncate('Hello World', 8, '…') // 'Hello W…'
yq.truncate('Short', 10) // 'Short' (不截断)
```

---

### camelToSnake

驼峰命名转下划线命名。

**参数**

- `str` (string, 必填) - 驼峰字符串

**返回**

- string - 下划线字符串

**示例**

```js
yq.camelToSnake('userName') // 'user_name'
yq.camelToSnake('getUserInfo') // 'get_user_info'
yq.camelToSnake('HTTPRequest') // '_h_t_t_p_request'
```

---

### snakeToCamel

下划线命名转驼峰命名。

**参数**

- `str` (string, 必填) - 下划线字符串

**返回**

- string - 驼峰字符串

**示例**

```js
yq.snakeToCamel('user_name') // 'userName'
yq.snakeToCamel('get_user_info') // 'getUserInfo'
```

---

### capitalize

首字母大写。

**参数**

- `str` (string, 必填) - 字符串

**返回**

- string - 首字母大写的字符串

**示例**

```js
yq.capitalize('hello') // 'Hello'
yq.capitalize('hello world') // 'Hello world'
```

---

### capitalizeWords

每个单词首字母大写。

**参数**

- `str` (string, 必填) - 字符串

**返回**

- string - 转换后的字符串

**示例**

```js
yq.capitalizeWords('hello world') // 'Hello World'
yq.capitalizeWords('the quick brown fox') // 'The Quick Brown Fox'
```

---

### formatChineseAmount

金额转中文大写（用于财务票据）。

**参数**

- `amount` (number, 必填) - 金额

**返回**

- string - 中文大写金额

**示例**

```js
yq.formatChineseAmount(1234.56) // '壹仟贰佰叁拾肆元伍角陆分'
yq.formatChineseAmount(10000) // '壹万元整'
yq.formatChineseAmount(0) // '零元整'
yq.formatChineseAmount(-100.5) // '负壹佰元伍角'
```

---

### formatChineseNumber

数字转中文数字。

**参数**

- `num` (number, 必填) - 数字

**返回**

- string - 中文数字

**示例**

```js
yq.formatChineseNumber(1234) // '一千二百三十四'
yq.formatChineseNumber(10000) // '一万'
yq.formatChineseNumber(0) // '零'
```

---

### formatOrdinal

序数词格式化（英文序数词）。

**参数**

- `num` (number, 必填) - 数字

**返回**

- string - 序数词

**示例**

```js
yq.formatOrdinal(1) // '1st'
yq.formatOrdinal(2) // '2nd'
yq.formatOrdinal(3) // '3rd'
yq.formatOrdinal(4) // '4th'
yq.formatOrdinal(21) // '21st'
yq.formatOrdinal(22) // '22nd'
```

---

### 注意事项

- 所有格式化函数在输入为空或无效时都会返回空字符串或原值
- `formatNumber` 和 `formatCurrency` 使用 `toFixed` 进行四舍五入
- `maskPhone` 仅处理 11 位手机号，其他格式返回原值
- `camelToSnake` 转换时会在大写字母前添加下划线
- 中文金额转换支持负数，但仅精确到分（两位小数）
- `formatChineseAmount` 使用"壹贰叁"等大写数字，`formatChineseNumber` 使用"一二三"等小写数字
- `truncate` 的 `maxLength` 包含省略号的长度
- 银行卡号和手机号格式化会自动清除原有的空格和非数字字符
