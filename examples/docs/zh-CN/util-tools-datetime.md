## Tools / Datetime

日期与时间相关工具，默认使用本地时区；简单格式化用内置 `fecha`，并与组件库现有 i18n 保持一致。

### 引入方式

```javascript
import yq from 'yq-ui-code/src/utils'
```

### formatDate

格式化日期时间，支持常见 `YYYY/MM/DD HH:mm:ss`、`YYYY-MM-DD` 等模板。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| date | Date\|number\|string | 是 | - | 日期对象/时间戳/可解析字符串 |
| format | string | 否 | 'YYYY-MM-DD HH:mm:ss' | 模板；内部自动转换为 `fecha` 格式 |

返回

- string：格式化结果（非法日期返回空串）

示例

```javascript
yq.formatDate(new Date(), 'YYYY-MM-DD')
yq.formatDate(1700000000000, 'YYYY/MM/DD HH:mm')
```

### parseDate

解析日期字符串为 `Date`。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| input | string | 是 | - | 待解析的日期字符串 |
| format | string | 否 | 'YYYY-MM-DD HH:mm:ss' | 与 `formatDate` 对应的模板 |

返回

- Date|null：解析成功返回 Date，否则返回 null

示例

```javascript
yq.parseDate('2025-10-20 12:30:00')
yq.parseDate('2025-10-20', 'YYYY-MM-DD')
```

### getDateDiff

计算两个时间的差值。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| start | Date\|number\|string | 是 | - | 起始时间 |
| end | Date\|number\|string | 是 | - | 结束时间 |
| unit | string | 否 | 'day' | 单位：ms/s/m/h/day/week（别名：ms,s,m,h,d,w） |

返回

- number：差值（按单位换算）

示例

```javascript
yq.getDateDiff('2025-01-01', '2025-01-31', 'day') // 30
```

### add

在指定时间基础上增加一定量。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| date | Date\|number\|string | 是 | - | 基准时间 |
| amount | number | 是 | - | 增加的数量（可为负） |
| unit | string | 是 | - | 单位：y/M/w/d/h/m/s/ms（year/month/week/day/hour/minute/second/millisecond） |

返回

- Date|null：增加后的时间（非法输入返回 null）

示例

```javascript
yq.add('2025-01-31', 1, 'M') // 处理月底溢出：2025-02-28/29
```

### subtract

同 `add`，用于减少指定量，相当于 `add(date, -amount, unit)`。

参数/返回：同上

示例

```javascript
yq.subtract('2025-01-31', 1, 'd')
```

### toTimestamp

将时间转为毫秒时间戳。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| date | Date\|number\|string | 是 | - | 时间输入 |

返回

- number：时间戳（非法返回 NaN）

### fromTimestamp

从毫秒时间戳生成 `Date`。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| ms | number | 是 | - | 毫秒时间戳 |

返回

- Date|null：非法输入返回 null

### isSameDay

判断两个时间是否同一天（本地时区）。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| a | Date\|number\|string | 是 | - | 时间 A |
| b | Date\|number\|string | 是 | - | 时间 B |

返回

- boolean

### isBetween

判断时间是否在区间内，可选按单位对齐比较，支持开闭区间。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| date | Date\|number\|string | 是 | - | 待判断时间 |
| start | Date\|number\|string | 是 | - | 起始时间 |
| end | Date\|number\|string | 是 | - | 结束时间 |
| unit | string | 否 | - | 对齐单位：year/month/day/hour/minute |
| inclusive | boolean | 否 | true | 是否包含边界 |

返回

- boolean

### fromNow

返回相对时间文案（中文）：如“刚刚/3 分钟前/2 天前/1 年后”。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| date | Date\|number\|string | 是 | - | 基准时间 |

返回

- string

### 注意事项

- 与组件库内部 `fecha`/i18n 对齐；如需时区/UTC 处理，可在未来升级为 dayjs 薄封装。
