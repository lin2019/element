## Box 箱线图
用于展示数据的分布情况，显示数据的五数概括（最小值、第一四分位数、中位数、第三四分位数、最大值）。

### 基础用法

最简单的箱线图用法。

:::demo 使用`data`属性传入数据，每个数组代表一组数据的分布。

```html
<template>
  <el-box-chart
    :data="chartData"
    :categories="categories"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      categories: ['语文', '数学', '英语', '物理', '化学'],
      chartData: [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910],
        [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920],
        [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870]
      ]
    }
  }
}
</script>
```
:::

### 垂直箱线图

垂直方向显示的箱线图。

:::demo 设置`layout`属性为`vertical`。

```html
<template>
  <el-box-chart
    :data="verticalData"
    :categories="verticalCategories"
    layout="vertical"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      verticalCategories: ['产品A', '产品B', '产品C', '产品D'],
      verticalData: [
        [120, 132, 101, 134, 90, 230, 210, 120, 135, 142, 156, 178],
        [220, 182, 191, 234, 290, 330, 310, 220, 235, 242, 256, 278],
        [150, 232, 201, 154, 190, 330, 410, 150, 235, 242, 256, 278],
        [320, 332, 301, 334, 390, 330, 320, 320, 335, 342, 356, 378]
      ]
    }
  }
}
</script>
```
:::

### 带异常值的箱线图

显示数据中的异常值点。

:::demo 设置`show-outliers`属性显示异常值。

```html
<template>
  <el-box-chart
    :data="outlierData"
    :categories="outlierCategories"
    :show-outliers="true"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      outlierCategories: ['组别A', '组别B', '组别C'],
      outlierData: [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 1200, 1300],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 600, 550],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 1100, 1150]
      ]
    }
  }
}
</script>
```
:::

### 多系列箱线图

对比多个系列的数据分布。

:::demo 通过`series`属性配置多个数据系列。

```html
<template>
  <el-box-chart
    :series="multiSeries"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      multiSeries: [
        {
          name: '2022年',
          data: [
            [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980],
            [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790]
          ],
          categories: ['Q1', 'Q2']
        },
        {
          name: '2023年',
          data: [
            [920, 810, 970, 1140, 1000, 920, 1020, 1050, 1050, 950, 1070, 1050],
            [1030, 1010, 1030, 1010, 950, 870, 920, 950, 970, 910, 900, 860]
          ],
          categories: ['Q1', 'Q2']
        }
      ]
    }
  }
}
</script>
```
:::

### 自定义样式

自定义箱线图的颜色和样式。

:::demo 通过`box-style`属性自定义样式。

```html
<template>
  <el-box-chart
    :data="styleData"
    :categories="styleCategories"
    :box-style="boxStyle"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      styleCategories: ['部门A', '部门B', '部门C', '部门D'],
      styleData: [
        [120, 132, 101, 134, 90, 230, 210, 120, 135, 142, 156, 178],
        [220, 182, 191, 234, 290, 330, 310, 220, 235, 242, 256, 278],
        [150, 232, 201, 154, 190, 330, 410, 150, 235, 242, 256, 278],
        [320, 332, 301, 334, 390, 330, 320, 320, 335, 342, 356, 378]
      ],
      boxStyle: {
        borderColor: '#409EFF',
        borderWidth: 2,
        fillColor: 'rgba(64, 158, 255, 0.3)',
        medianColor: '#E6A23C',
        whiskerColor: '#67C23A'
      }
    }
  }
}
</script>
```
:::

### 带统计信息的箱线图

显示详细的统计信息。

:::demo 设置`show-statistics`属性显示统计信息。

```html
<template>
  <el-box-chart
    :data="statisticsData"
    :categories="statisticsCategories"
    :show-statistics="true"
    height="400px">
  </el-box-chart>
</template>

<script>
export default {
  data() {
    return {
      statisticsCategories: ['测试A', '测试B', '测试C'],
      statisticsData: [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910]
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
| series | 系列配置 | Array | — | — |
| categories | 分类标签 | Array | — | [] |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| layout | 布局方向 | String | horizontal/vertical | horizontal |
| show-outliers | 是否显示异常值 | Boolean | — | false |
| show-statistics | 是否显示统计信息 | Boolean | — | false |
| box-style | 箱体样式 | Object | — | — |
| box-width | 箱体宽度 | Number | — | 0.7 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击箱体时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| outlier-click | 点击异常值时触发 | (event, outlier) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| getStatistics | 获取统计信息 | (categoryIndex) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |