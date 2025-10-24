## HorizontalBar 条形图
水平方向的柱状图，适用于类别名称较长或需要强调数值排序的场景。

### 基础用法

最简单的条形图用法。

:::demo 使用`data`属性传入数据，`x-field`和`y-field`指定横纵坐标字段。

```html
<template>
  <el-horizontal-bar-chart
    :data="chartData"
    x-field="value"
    y-field="category"
    height="400px">
  </el-horizontal-bar-chart>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { category: '移动端开发', value: 320 },
        { category: '前端开发', value: 280 },
        { category: '后端开发', value: 250 },
        { category: '数据分析', value: 200 },
        { category: '产品设计', value: 180 },
        { category: '运营推广', value: 150 }
      ]
    }
  }
}
</script>
```
:::

### 多系列条形图

展示多个数据系列的对比。

:::demo 通过`series`属性配置多个数据系列。

```html
<template>
  <el-horizontal-bar-chart
    :data="multiSeriesData"
    y-field="department"
    :series="seriesConfig"
    height="400px">
  </el-horizontal-bar-chart>
</template>

<script>
export default {
  data() {
    return {
      multiSeriesData: [
        { department: '技术部', current: 45, target: 50 },
        { department: '销售部', current: 38, target: 45 },
        { department: '市场部', current: 32, target: 40 },
        { department: '运营部', current: 28, target: 35 },
        { department: '人事部', current: 25, target: 30 }
      ],
      seriesConfig: [
        { field: 'current', name: '当前人数', color: '#409EFF' },
        { field: 'target', name: '目标人数', color: '#67C23A' }
      ]
    }
  }
}
</script>
```
:::

### 排序条形图

按数值大小自动排序显示。

:::demo 设置`sort`属性控制排序方式。

```html
<template>
  <el-horizontal-bar-chart
    :data="sortData"
    x-field="score"
    y-field="student"
    sort="desc"
    height="400px">
  </el-horizontal-bar-chart>
</template>

<script>
export default {
  data() {
    return {
      sortData: [
        { student: '张三', score: 85 },
        { student: '李四', score: 92 },
        { student: '王五', score: 78 },
        { student: '赵六', score: 96 },
        { student: '钱七', score: 88 },
        { student: '孙八', score: 82 }
      ]
    }
  }
}
</script>
```
:::

### 带标签的条形图

在条形末端显示数值标签。

:::demo 设置`show-label`属性显示数值标签。

```html
<template>
  <el-horizontal-bar-chart
    :data="labelData"
    x-field="amount"
    y-field="product"
    :show-label="true"
    label-position="end"
    height="400px">
  </el-horizontal-bar-chart>
</template>

<script>
export default {
  data() {
    return {
      labelData: [
        { product: 'iPhone', amount: 1200 },
        { product: 'Samsung Galaxy', amount: 980 },
        { product: 'Huawei P50', amount: 850 },
        { product: 'Xiaomi 12', amount: 720 },
        { product: 'OPPO Find X', amount: 650 }
      ]
    }
  }
}
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 图表数据 | Array | — | [] |
| x-field | X轴字段名 | String | — | — |
| y-field | Y轴字段名 | String | — | — |
| series | 系列配置 | Array | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | Array/String | — | — |
| sort | 排序方式 | String | asc/desc | — |
| show-label | 是否显示标签 | Boolean | — | false |
| label-position | 标签位置 | String | start/middle/end | end |
| bar-width | 条形宽度 | Number/String | — | auto |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击条形时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| legend-click | 点击图例时触发 | (event, legend) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |