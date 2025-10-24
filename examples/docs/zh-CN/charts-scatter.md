## Scatter 散点图
用于展示两个变量之间的相关性，通过点的分布来观察数据的聚集和趋势。

### 基础用法

最简单的散点图用法。

:::demo 使用`data`属性传入数据，`x-field`和`y-field`指定横纵坐标字段。

```html
<template>
  <el-scatter-chart
    :data="chartData"
    x-field="height"
    y-field="weight"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { height: 161.2, weight: 51.6 },
        { height: 167.5, weight: 59.0 },
        { height: 159.5, weight: 49.2 },
        { height: 157.0, weight: 63.0 },
        { height: 155.8, weight: 53.6 },
        { height: 170.0, weight: 59.0 },
        { height: 159.1, weight: 47.6 },
        { height: 166.0, weight: 69.8 },
        { height: 176.2, weight: 66.8 },
        { height: 160.2, weight: 75.2 }
      ]
    }
  }
}
</script>
```
:::

### 多系列散点图

展示多个数据系列的分布对比。

:::demo 通过`series`属性配置多个数据系列。

```html
<template>
  <el-scatter-chart
    :data="multiSeriesData"
    x-field="income"
    y-field="education"
    series-field="gender"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      multiSeriesData: [
        { income: 30000, education: 12, gender: '男性' },
        { income: 45000, education: 16, gender: '男性' },
        { income: 35000, education: 14, gender: '女性' },
        { income: 50000, education: 18, gender: '女性' },
        { income: 40000, education: 15, gender: '男性' },
        { income: 55000, education: 20, gender: '女性' },
        { income: 25000, education: 10, gender: '男性' },
        { income: 60000, education: 22, gender: '女性' },
        { income: 38000, education: 13, gender: '男性' },
        { income: 48000, education: 17, gender: '女性' }
      ]
    }
  }
}
</script>
```
:::

### 气泡图

通过点的大小表示第三个维度的数据。

:::demo 设置`size-field`属性指定大小字段。

```html
<template>
  <el-scatter-chart
    :data="bubbleData"
    x-field="gdp"
    y-field="life"
    size-field="population"
    name-field="country"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      bubbleData: [
        { country: '中国', gdp: 12000, life: 76, population: 1400 },
        { country: '美国', gdp: 55000, life: 78, population: 330 },
        { country: '日本', gdp: 40000, life: 84, population: 125 },
        { country: '德国', gdp: 45000, life: 81, population: 83 },
        { country: '印度', gdp: 2000, life: 69, population: 1380 },
        { country: '巴西', gdp: 8000, life: 75, population: 213 },
        { country: '俄罗斯', gdp: 11000, life: 72, population: 146 }
      ]
    }
  }
}
</script>
```
:::

### 带回归线的散点图

添加趋势线显示数据的相关性。

:::demo 设置`show-regression`属性显示回归线。

```html
<template>
  <el-scatter-chart
    :data="regressionData"
    x-field="study_time"
    y-field="score"
    :show-regression="true"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      regressionData: [
        { study_time: 1, score: 45 },
        { study_time: 2, score: 55 },
        { study_time: 3, score: 65 },
        { study_time: 4, score: 70 },
        { study_time: 5, score: 75 },
        { study_time: 6, score: 80 },
        { study_time: 7, score: 85 },
        { study_time: 8, score: 88 },
        { study_time: 9, score: 92 },
        { study_time: 10, score: 95 }
      ]
    }
  }
}
</script>
```
:::

### 自定义点样式

自定义散点的形状、大小和颜色。

:::demo 通过`symbol`、`symbol-size`等属性自定义点样式。

```html
<template>
  <el-scatter-chart
    :data="styleData"
    x-field="x"
    y-field="y"
    :symbol="symbolConfig"
    :symbol-size="sizeConfig"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      styleData: [
        { x: 10, y: 20, type: 'A' },
        { x: 15, y: 25, type: 'B' },
        { x: 20, y: 30, type: 'A' },
        { x: 25, y: 35, type: 'C' },
        { x: 30, y: 40, type: 'B' },
        { x: 35, y: 45, type: 'A' },
        { x: 40, y: 50, type: 'C' }
      ],
      symbolConfig: {
        'A': 'circle',
        'B': 'rect',
        'C': 'triangle'
      },
      sizeConfig: [8, 12, 16]
    }
  }
}
</script>
```
:::

### 带标签的散点图

在数据点显示标签信息。

:::demo 设置`show-label`属性显示标签。

```html
<template>
  <el-scatter-chart
    :data="labelData"
    x-field="sales"
    y-field="profit"
    name-field="product"
    :show-label="true"
    height="400px">
  </el-scatter-chart>
</template>

<script>
export default {
  data() {
    return {
      labelData: [
        { product: 'iPhone', sales: 1000, profit: 300 },
        { product: 'iPad', sales: 800, profit: 200 },
        { product: 'MacBook', sales: 600, profit: 250 },
        { product: 'AirPods', sales: 1200, profit: 400 },
        { product: 'Apple Watch', sales: 900, profit: 280 }
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
| size-field | 大小字段名 | String | — | — |
| series-field | 系列字段名 | String | — | — |
| name-field | 名称字段名 | String | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | Array/String | — | — |
| symbol | 点形状 | String/Object | circle/rect/triangle/diamond | circle |
| symbol-size | 点大小 | Number/Array | — | 6 |
| show-label | 是否显示标签 | Boolean | — | false |
| show-regression | 是否显示回归线 | Boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击数据点时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| legend-click | 点击图例时触发 | (event, legend) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| addRegressionLine | 添加回归线 | — |
| removeRegressionLine | 移除回归线 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |