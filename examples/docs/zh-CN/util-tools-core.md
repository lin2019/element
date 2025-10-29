## Tools / Core

基础类型与对象操作相关的通用工具，保持不可变（不修改入参），SSR 友好。

### 引入方式

```javascript
import yq from 'yq-ui-code/src/utils'
// 或按需：import { tools } from 'yq-ui-code/src/utils'
```

### isEmpty

判空：`null/undefined`、空字符串（含纯空白）、空数组、空对象、空 `Map/Set` 均为 true。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| value | any | 否 | - | 要检测的值 |

返回

- boolean：是否为空

示例

```javascript
yq.isEmpty('  ') // true
yq.isEmpty({}) // true
yq.isEmpty([1]) // false
```

### cloneDeep

深拷贝常见对象结构，支持 `Date`、`RegExp`、数组与普通对象。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| obj | any | 否 | - | 需拷贝的对象/数组 |

返回

- any：深拷贝后的新对象

示例

```javascript
const a = { d: new Date(), r: /x/i, list: [1, { x: 2 }] }
const b = yq.cloneDeep(a)
```

### merge

深度合并，返回新对象，不改 `target`。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| target | object | 否 | {} | 目标对象（不会被修改） |
| ...sources | object[] | 否 | - | 若干要合并的源对象 |

返回

- object：合并后的新对象

示例

```javascript
const x = { a: { n: 1 }, arr: [1] }
const y = yq.merge(x, { a: { m: 2 }, arr: [2] })
```

### toNumber

将任意输入转换为数字；无法转换时返回 `fallback`（提供时）或 `NaN`。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| value | any | 否 | - | 待转换的值 |
| fallback | number | 否 | NaN | 转换失败时返回值 |

返回

- number：转换结果

示例

```javascript
yq.toNumber(' 3.14 ') // 3.14
yq.toNumber('abc', 0) // 0
```

### toBoolean

默认真值表：`['true','1','yes','y','on']`（大小写不敏感、会去空白）。支持自定义 `truthyList`。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| value | any | 否 | - | 待转换的值 |
| truthyList | string[] | 否 | 见上 | 自定义真值表（大小写不敏感） |

返回

- boolean：转换结果

示例

```javascript
yq.toBoolean('YES') // true
yq.toBoolean('off') // false
```

### get

安全读取嵌套路径，支持 `a.b[0].c`/`a["b"][0]` 等写法。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| object | any | 否 | - | 源对象 |
| path | string \| string[] | 是 | - | 访问路径 |
| defaultValue | any | 否 | undefined | 未命中返回值 |

返回

- any：读取结果（未命中返回 `defaultValue`）

示例

```javascript
const user = { profile: { tags: [{ name: 'vip' }] } }
yq.get(user, 'profile.tags[0].name', '-') // 'vip'
```

### set

设置嵌套路径并返回“新对象”，不修改原对象；必要时自动创建中间对象/数组。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| object | any | 否 | {} | 源对象（不会被修改） |
| path | string \| string[] | 是 | - | 设置路径 |
| value | any | 是 | - | 要设置的值 |

返回

- any：设置后的新对象

示例

```javascript
const user = { profile: { tags: [{ name: 'vip' }] } }
const user2 = yq.set(user, 'profile.tags[1].name', 'pro')
```

### uuid

生成唯一 ID（简化调用）：

- 无参：返回 RFC4122 v4 UUID（带连字符）。
- 传数字：返回指定长度的短 ID。
- 传前缀+长度：返回带前缀的短 ID。
- 传对象：可自定义字符集、大小写等。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| options | object | 否 | - | 可选项（也支持 `uuid(len)`、`uuid(prefix, len)` 语法） |
| options.length | number | 否 | - | 指定返回短 ID 的长度；不传则返回标准 UUID |
| options.alphabet | string | 否 | `A-Za-z0-9` | 短 ID 使用的字符集 |
| options.prefix | string | 否 | - | 给 ID 添加前缀，如 `ord_` |
| options.upperCase | boolean | 否 | false | 是否转为大写（短 ID/UUID 均可） |

返回

- string：生成的 ID

示例

```javascript
// 标准 UUID
yq.uuid() // '5d0c5e1f-...'

// 短 ID（长度 12）
yq.uuid({ length: 12 }) // 'aZ3k9Q...'
// 简化：直接传长度
yq.uuid(12)

// 自定义字符集、前缀、大写
yq.uuid({ length: 10, alphabet: 'abcdef012345', prefix: 'ord_', upperCase: true })
// 'ord_3A0F...'
// 前缀 + 长度重载
yq.uuid('ord_', 10)
// 统一大小写
yq.uuid({ length: 10, case: 'lower' })
```

### 约定与边界

- 所有函数不修改入参；异常情况优先返回兜底值（如 `defaultValue` / `fallback`）。
- `get/set` 的路径支持点/下标混合；路径不存在时自动安全处理。
