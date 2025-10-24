## Area 面积图
在折线图的基础上填充区域，用于强调数据的累积效果和趋势变化。

### 基础用法

最简单的面积图用法。

:::demo 使用`data`属性传入数据，`x-field`和`y-field`指定横纵坐标字段。

```html
<template>
  <el-area-chart
    :data="chartData"
    x-field="month"
    y-field="value"
    height="400px">
  </el-area-chart>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { month: '1月', value: 120 },
        { month: '2月', value: 132 },
        { month: '3月', value: 101 },
        { month: '4月', value: 134 },
        { month: '5月', value: 90 },
        { month: '6月', value: 230 },
        { month: '7月', value: 210 },
        { month: '8月', value: 320 },
        { month: '9月', value: 301 },
        { month: '10月', value: 90 },
        { month: '11月', value: 150 },
        { month: '12月', value: 120 }
      ]
    }
  }
}
</script>
```
:::

### 堆叠面积图

展示多个数据系列的累积效果。

:::demo 通过`series`属性配置多个数据系列，自动堆叠显示。

```html
<template>
  <el-area-chart
    :data="stackData"
    x-field="quarter"
    :series="seriesConfig"
    :stack="true"
    height="400px">
  </el-area-chart>
</template>

<script>
export default {
  data() {
    return {
      stackData: [
        { quarter: 'Q1', mobile: 120, desktop: 220, tablet: 150 },
        { quarter: 'Q2', mobile: 132, desktop: 182, tablet: 232 },
        { quarter: 'Q3', mobile: 101, desktop: 191, tablet: 201 },
        { quarter: 'Q4', mobile: 134, desktop: 234, tablet: 154 }
      ],
      seriesConfig: [
        { field: 'mobile', name: '移动端', color: '#409EFF' },
        { field: 'desktop', name: '桌面端', color: '#67C23A' },
        { field: 'tablet', name: '平板端', color: '#E6A23C' }
      ]
    }
  }
}
</script>
```
:::

### 百分比堆叠面积图

以百分比形式展示各部分占比。

:::demo 设置`percent`属性为`true`启用百分比模式。

```html
<template>
  <el-area-chart
    :data="percentData"
    x-field="year"
    :series="percentSeries"
    :stack="true"
    :percent="true"
    height="400px">
  </el-area-chart>
</template>

<script>
export default {
  data() {
    return {
      percentData: [
        { year: '2019', ios: 30, android: 60, others: 10 },
        { year: '2020', ios: 32, android: 58, others: 10 },
        { year: '2021', ios: 35, android: 55, others: 10 },
        { year: '2022', ios: 38, android: 52, others: 10 },
        { year: '2023', ios: 40, android: 50, others: 10 }
      ],
      percentSeries: [
        { field: 'ios', name: 'iOS', color: '#409EFF' },
        { field: 'android', name: 'Android', color: '#67C23A' },
        { field: 'others', name: '其他', color: '#E6A23C' }
      ]
    }
  }
}
</script>
```
:::

### 渐变面积图

使用渐变色填充面积。

:::demo 通过`gradient`属性配置渐变色。

```html
<template>
  <el-area-chart
    :data="gradientData"
    x-field="time"
    y-field="temperature"
    :gradient="gradientConfig"
    height="400px">
  </el-area-chart>
</template>

<script>
export default {
  data() {
    return {
      gradientData: [
        { time: '00:00', temperature: 18 },
        { time: '04:00', temperature: 15 },
        { time: '08:00', temperature: 22 },
        { time: '12:00', temperature: 28 },
        { time: '16:00', temperature: 32 },
        { time: '20:00', temperature: 25 },
        { time: '24:00', temperature: 20 }
      ],
      gradientConfig: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(64, 158, 255, 0.8)' },
          { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
        ]
      }
    }
  }
}
</script>
```
:::

### 范围面积图

展示数据的范围区间。

:::demo 使用`y-field-range`属性指定范围字段。

```html
<template>
  <el-area-chart
    :data="rangeData"
    x-field="date"
    :y-field-range="['min', 'max']"
    height="400px">
  </el-area-chart>
</template>

<script>
export default {
  data() {
    return {
      rangeData: [
        { date: '1月', min: 10, max: 25 },
        { date: '2月', min: 12, max: 28 },
        { date: '3月', min: 15, max: 32 },
        { date: '4月', min: 18, max: 35 },
        { date: '5月', min: 22, max: 38 },
        { date: '6月', min: 25, max: 40 }
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
| y-field-range | 范围字段名 | Array | — | — |
| series | 系列配置 | Array | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | Array/String | — | — |
| stack | 是否堆叠 | Boolean | — | false |
| percent | 是否百分比堆叠 | Boolean | — | false |
| smooth | 是否平滑曲线 | Boolean | — | false |
| gradient | 渐变配置 | Object | — | — |
| opacity | 填充透明度 | Number | 0-1 | 0.6 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击区域时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| legend-click | 点击图例时触发 | (event, legend) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |