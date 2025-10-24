## Bar 柱状图

用于展示不同类别数据的数值比较，通过柱子的高度来表示数据的大小。

### 基础用法

最简单的柱状图用法。

:::demo 使用`data`属性传入数据，`x-field`和`y-field`指定横纵坐标字段。

```html
<template>
  <el-bar-chart :data="chartData" x-field="category" y-field="value" height="400px"></el-bar-chart>
</template>

<script>
  export default {
    data() {
      return {
        chartData: [{ category: '一月', value: 120 }, { category: '二月', value: 200 }, { category: '三月', value: 150 }, { category: '四月', value: 80 }, { category: '五月', value: 70 }, { category: '六月', value: 110 }]
      }
    }
  }
</script>
```

:::

### 多系列柱状图

展示多个数据系列的对比。

:::demo 通过`series`属性配置多个数据系列。

```html
<template>
  <el-bar-chart :data="multiSeriesData" x-field="month" :series="seriesConfig" height="400px"></el-bar-chart>
</template>

<script>
  export default {
    data() {
      return {
        multiSeriesData: [{ month: '一月', sales: 120, profit: 80 }, { month: '二月', sales: 200, profit: 130 }, { month: '三月', sales: 150, profit: 90 }, { month: '四月', sales: 80, profit: 50 }, { month: '五月', sales: 70, profit: 40 }, { month: '六月', sales: 110, profit: 70 }],
        seriesConfig: [{ field: 'sales', name: '销售额', color: '#409EFF' }, { field: 'profit', name: '利润', color: '#67C23A' }]
      }
    }
  }
</script>
```

:::

### 堆叠柱状图

将多个数据系列堆叠显示。

:::demo 设置`stack`属性为`true`启用堆叠模式。

```html
<template>
  <el-bar-chart :data="stackData" x-field="quarter" :series="stackSeries" :stack="true" height="400px"></el-bar-chart>
</template>

<script>
  export default {
    data() {
      return {
        stackData: [{ quarter: 'Q1', product1: 20, product2: 30, product3: 25 }, { quarter: 'Q2', product1: 25, product2: 35, product3: 30 }, { quarter: 'Q3', product1: 30, product2: 25, product3: 35 }, { quarter: 'Q4', product1: 35, product2: 40, product3: 20 }],
        stackSeries: [{ field: 'product1', name: '产品A', color: '#409EFF' }, { field: 'product2', name: '产品B', color: '#67C23A' }, { field: 'product3', name: '产品C', color: '#E6A23C' }]
      }
    }
  }
</script>
```

:::

### 自定义样式

自定义柱状图的颜色和样式。

:::demo 通过`color`、`border-radius`等属性自定义样式。

```html
<template>
  <el-bar-chart :data="styleData" x-field="name" y-field="value" :color="['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']" :border-radius="4" height="400px"></el-bar-chart>
</template>

<script>
  export default {
    data() {
      return {
        styleData: [{ name: '苹果', value: 45 }, { name: '香蕉', value: 25 }, { name: '橙子', value: 30 }, { name: '葡萄', value: 35 }]
      }
    }
  }
</script>
```

:::

### Attributes

| 参数            | 说明         | 类型         | 可选值                | 默认值 |
| --------------- | ------------ | ------------ | --------------------- | ------ |
| data            | 图表数据     | Array        | —                     | []     |
| x-field         | X 轴字段名   | String       | —                     | —      |
| y-field         | Y 轴字段名   | String       | —                     | —      |
| series          | 系列配置     | Array        | —                     | —      |
| width           | 图表宽度     | String       | —                     | 100%   |
| height          | 图表高度     | String       | —                     | 400px  |
| color           | 颜色配置     | Array/String | —                     | —      |
| stack           | 是否堆叠     | Boolean      | —                     | false  |
| border-radius   | 柱子圆角     | Number       | —                     | 0      |
| show-legend     | 是否显示图例 | Boolean      | —                     | true   |
| legend-position | 图例位置     | String       | top/bottom/left/right | top    |

### Events

| 事件名称     | 说明           | 回调参数        |
| ------------ | -------------- | --------------- |
| click        | 点击柱子时触发 | (event, data)   |
| hover        | 鼠标悬停时触发 | (event, data)   |
| legend-click | 点击图例时触发 | (event, legend) |

### Methods

| 方法名     | 说明               | 参数                                |
| ---------- | ------------------ | ----------------------------------- |
| resize     | 重新渲染图表       | —                                   |
| clear      | 清空图表           | —                                   |
| getDataURL | 获取图表的 dataURL | (type, pixelRatio, backgroundColor) |
