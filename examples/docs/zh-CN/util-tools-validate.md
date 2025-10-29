## Tools / Validate

常用的数据验证与正则工具函数。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### validatePhone

验证中国大陆 11 位手机号码。

**参数**

- `phone` (string) - 手机号码

**返回**

- boolean - 是否为有效手机号

**示例**

```js
yq.validatePhone('13800138000') // true
yq.validatePhone('12345678901') // false
yq.validatePhone('138001380001') // false (超过11位)
```

---

### validateEmail

验证邮箱地址格式。

**参数**

- `email` (string) - 邮箱地址

**返回**

- boolean - 是否为有效邮箱

**示例**

```js
yq.validateEmail('user@example.com') // true
yq.validateEmail('user.name+tag@example.co.uk') // true
yq.validateEmail('invalid@') // false
yq.validateEmail('@invalid.com') // false
```

---

### validateIdCard

验证中国大陆身份证号码（支持 15 位和 18 位，包含校验码验证）。

**参数**

- `idCard` (string) - 身份证号码

**返回**

- boolean - 是否为有效身份证号

**示例**

```js
yq.validateIdCard('110101199001011234') // 根据校验码判断
yq.validateIdCard('110101900101123') // 15位身份证验证
yq.validateIdCard('123456') // false
```

---

### validateURL

验证 URL 地址（仅支持 http/https 协议）。

**参数**

- `url` (string) - URL 地址

**返回**

- boolean - 是否为有效 URL

**示例**

```js
yq.validateURL('https://www.example.com') // true
yq.validateURL('http://example.com/path?query=1') // true
yq.validateURL('ftp://example.com') // false (非http/https)
yq.validateURL('not a url') // false
```

---

### validateIPv4

验证 IPv4 地址格式。

**参数**

- `ip` (string) - IP 地址

**返回**

- boolean - 是否为有效 IPv4 地址

**示例**

```js
yq.validateIPv4('192.168.1.1') // true
yq.validateIPv4('255.255.255.255') // true
yq.validateIPv4('256.1.1.1') // false (超出范围)
yq.validateIPv4('192.168.1') // false (不完整)
```

---

### validateBankCard

验证银行卡号（使用 Luhn 算法校验）。

**参数**

- `cardNo` (string) - 银行卡号（支持空格）

**返回**

- boolean - 是否为有效银行卡号

**示例**

```js
yq.validateBankCard('6222021234567890123') // 根据Luhn算法判断
yq.validateBankCard('6222 0212 3456 7890 123') // 支持空格
yq.validateBankCard('123456') // false (位数不足)
```

---

### validateChineseName

验证中文姓名（2-20 个汉字）。

**参数**

- `name` (string) - 姓名

**返回**

- boolean - 是否为有效中文姓名

**示例**

```js
yq.validateChineseName('张三') // true
yq.validateChineseName('欧阳修') // true
yq.validateChineseName('张') // false (少于2个字)
yq.validateChineseName('Zhang San') // false (包含非汉字)
```

---

### validatePlateNumber

验证车牌号码（支持普通车牌和新能源车牌）。

**参数**

- `plate` (string) - 车牌号

**返回**

- boolean - 是否为有效车牌号

**示例**

```js
yq.validatePlateNumber('京A12345') // true (普通车牌)
yq.validatePlateNumber('京AD12345') // true (新能源车牌)
yq.validatePlateNumber('京A1234') // false (位数不对)
```

---

### validatePassport

验证中国护照号码。

**参数**

- `passport` (string) - 护照号

**返回**

- boolean - 是否为有效护照号

**示例**

```js
yq.validatePassport('E12345678') // true
yq.validatePassport('G12345678') // true
yq.validatePassport('P12345678') // true
yq.validatePassport('A12345678') // false
```

---

### validatePassword

验证密码强度（可自定义验证规则）。

**参数**

- `password` (string) - 密码
- `options` (Object, 可选) - 验证选项
  - `minLength` (number) - 最小长度，默认 8
  - `requireUpperCase` (boolean) - 是否需要大写字母，默认 false
  - `requireLowerCase` (boolean) - 是否需要小写字母，默认 false
  - `requireNumber` (boolean) - 是否需要数字，默认 false
  - `requireSpecial` (boolean) - 是否需要特殊字符，默认 false

**返回**

- boolean - 是否符合密码强度要求

**示例**

```js
yq.validatePassword('12345678') // true (仅长度验证)

yq.validatePassword('Abc123!@#', {
  minLength: 8,
  requireUpperCase: true,
  requireLowerCase: true,
  requireNumber: true,
  requireSpecial: true
}) // true

yq.validatePassword('password', {
  requireNumber: true
}) // false (缺少数字)
```

---

### validateUnifiedSocialCreditCode

验证统一社会信用代码（18 位，包含校验码验证）。

**参数**

- `code` (string) - 统一社会信用代码

**返回**

- boolean - 是否为有效信用代码

**示例**

```js
yq.validateUnifiedSocialCreditCode('91110000600037341L') // 根据校验码判断
yq.validateUnifiedSocialCreditCode('12345678901234567') // false
```

---

### validatePostcode

验证中国邮政编码（6 位数字）。

**参数**

- `postcode` (string) - 邮政编码

**返回**

- boolean - 是否为有效邮政编码

**示例**

```js
yq.validatePostcode('100000') // true
yq.validatePostcode('012345') // false (不能以0开头)
yq.validatePostcode('12345') // false (位数不足)
```

---

### validateQQ

验证 QQ 号码（5-11 位数字，不以 0 开头）。

**参数**

- `qq` (string) - QQ 号

**返回**

- boolean - 是否为有效 QQ 号

**示例**

```js
yq.validateQQ('10000') // true
yq.validateQQ('123456789') // true
yq.validateQQ('0123456') // false (以0开头)
yq.validateQQ('123') // false (位数不足)
```

---

### validateWeChat

验证微信号（6-20 位，字母开头，可包含字母、数字、下划线、减号）。

**参数**

- `wechat` (string) - 微信号

**返回**

- boolean - 是否为有效微信号

**示例**

```js
yq.validateWeChat('wechat_2024') // true
yq.validateWeChat('User-Name') // true
yq.validateWeChat('123abc') // false (以数字开头)
yq.validateWeChat('wx') // false (少于6位)
```

---

### 注意事项

- 所有验证函数都会自动去除首尾空格
- 正则验证主要针对格式，不代表数据真实存在（如手机号可能未启用）
- 身份证和统一社会信用代码包含校验码算法验证，准确度较高
- 银行卡号使用 Luhn 算法校验，可过滤大部分无效卡号
- 建议结合后端接口进行二次验证，前端验证仅用于提升用户体验
- 部分验证规则（如车牌号、护照号）可能随政策调整而变化
