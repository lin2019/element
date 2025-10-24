## Line 折线图
用于展示数据随时间或其他连续变量的变化趋势。

### 基础用法

最简单的折线图用法。

:::demo 使用`data`属性传入数据，`x-field`和`y-field`指定横纵坐标字段。

```html
<template>
  <el-line-chart
    :data="chartData"
    x-field="month"
    y-field="value"
    height="400px">
  </el-line-chart>
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

### 多条折线

展示多个数据系列的趋势对比。

:::demo 通过`series`属性配置多个数据系列。

```html
<template>
  <el-line-chart
    :data="multiLineData"
    x-field="date"
    :series="seriesConfig"
    height="400px">
  </el-line-chart>
</template>

<script>
export default {
  data() {
    return {
      multiLineData: [
        { date: '2023-01', sales: 820, profit: 320, cost: 500 },
        { date: '2023-02', sales: 932, profit: 432, cost: 500 },
        { date: '2023-03', sales: 901, profit: 401, cost: 500 },
        { date: '2023-04', sales: 934, profit: 434, cost: 500 },
        { date: '2023-05', sales: 1290, profit: 790, cost: 500 },
        { date: '2023-06', sales: 1330, profit: 830, cost: 500 }
      ],
      seriesConfig: [
        { field: 'sales', name: '销售额', color: '#409EFF' },
        { field: 'profit', name: '利润', color: '#67C23A' },
        { field: 'cost', name: '成本', color: '#E6A23C' }
      ]
    }
  }
}
</script>
```
:::

### 平滑曲线

使用平滑的曲线连接数据点。

:::demo 设置`smooth`属性为`true`启用平滑曲线。

```html
<template>
  <el-line-chart
    :data="smoothData"
    x-field="time"
    y-field="temperature"
    :smooth="true"
    height="400px">
  </el-line-chart>
</template>

<script>
export default {
  data() {
    return {
      smoothData: [
        { time: '00:00', temperature: 18 },
        { time: '04:00', temperature: 15 },
        { time: '08:00', temperature: 22 },
        { time: '12:00', temperature: 28 },
        { time: '16:00', temperature: 32 },
        { time: '20:00', temperature: 25 },
        { time: '24:00', temperature: 20 }
      ]
    }
  }
}
</script>
```
:::

### 阶梯线图

使用阶梯状的线条连接数据点。

:::demo 设置`step`属性启用阶梯线模式。

```html
<template>
  <el-line-chart
    :data="stepData"
    x-field="stage"
    y-field="count"
    step="start"
    height="400px">
  </el-line-chart>
</template>

<script>
export default {
  data() {
    return {
      stepData: [
        { stage: '注册', count: 1000 },
        { stage: '激活', count: 800 },
        { stage: '首次购买', count: 600 },
        { stage: '复购', count: 400 },
        { stage: '推荐', count: 200 }
      ]
    }
  }
}
</script>
```
:::

### 带标记点的折线图

在特定数据点添加标记。

:::demo 通过`mark-points`属性添加标记点。

```html
<template>
  <el-line-chart
    :data="markData"
    x-field="week"
    y-field="visitors"
    :mark-points="markPoints"
    height="400px">
  </el-line-chart>
</template>

<script>
export default {
  data() {
    return {
      markData: [
        { week: '周一', visitors: 120 },
        { week: '周二', visitors: 200 },
        { week: '周三', visitors: 150 },
        { week: '周四', visitors: 80 },
        { week: '周五', visitors: 70 },
        { week: '周六', visitors: 110 },
        { week: '周日', visitors: 130 }
      ],
      markPoints: [
        { type: 'max', name: '最大值' },
        { type: 'min', name: '最小值' },
        { coord: ['周二', 200], name: '高峰' }
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
| smooth | 是否平滑曲线 | Boolean | — | false |
| step | 阶梯线类型 | String | start/middle/end | — |
| show-symbol | 是否显示标记点 | Boolean | — | true |
| symbol-size | 标记点大小 | Number | — | 4 |
| line-width | 线条宽度 | Number | — | 2 |
| mark-points | 标记点配置 | Array | — | — |

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
| addMarkPoint | 添加标记点 | (point) |
| removeMarkPoint | 移除标记点 | (index) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |