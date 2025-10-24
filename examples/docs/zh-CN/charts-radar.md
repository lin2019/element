## Radar 雷达图
用于展示多维数据，适合对比多个对象在多个指标上的表现。

### 基础用法

最简单的雷达图用法。

:::demo 使用`data`属性传入数据，`indicators`定义各个维度。

```html
<template>
  <el-radar-chart
    :data="chartData"
    :indicators="indicators"
    height="400px">
  </el-radar-chart>
</template>

<script>
export default {
  data() {
    return {
      indicators: [
        { name: '销售', max: 100 },
        { name: '管理', max: 100 },
        { name: '信息技术', max: 100 },
        { name: '客服', max: 100 },
        { name: '研发', max: 100 },
        { name: '市场', max: 100 }
      ],
      chartData: [
        {
          name: '预算分配',
          value: [43, 19, 60, 35, 90, 55]
        }
      ]
    }
  }
}
</script>
```
:::

### 多系列雷达图

对比多个对象的多维数据。

:::demo 在`data`数组中添加多个数据系列。

```html
<template>
  <el-radar-chart
    :data="multiData"
    :indicators="skillIndicators"
    height="400px">
  </el-radar-chart>
</template>

<script>
export default {
  data() {
    return {
      skillIndicators: [
        { name: 'JavaScript', max: 100 },
        { name: 'Vue.js', max: 100 },
        { name: 'React', max: 100 },
        { name: 'Node.js', max: 100 },
        { name: 'Python', max: 100 },
        { name: 'Java', max: 100 }
      ],
      multiData: [
        {
          name: '张三',
          value: [85, 90, 70, 60, 75, 80],
          itemStyle: { color: '#409EFF' }
        },
        {
          name: '李四',
          value: [75, 80, 85, 70, 85, 75],
          itemStyle: { color: '#67C23A' }
        },
        {
          name: '王五',
          value: [90, 75, 80, 85, 70, 85],
          itemStyle: { color: '#E6A23C' }
        }
      ]
    }
  }
}
</script>
```
:::

### 自定义形状

调整雷达图的形状和样式。

:::demo 通过`shape`属性设置雷达图形状，`split-number`设置分割段数。

```html
<template>
  <el-radar-chart
    :data="shapeData"
    :indicators="performanceIndicators"
    shape="circle"
    :split-number="4"
    height="400px">
  </el-radar-chart>
</template>

<script>
export default {
  data() {
    return {
      performanceIndicators: [
        { name: '工作质量', max: 10 },
        { name: '工作效率', max: 10 },
        { name: '团队协作', max: 10 },
        { name: '学习能力', max: 10 },
        { name: '创新思维', max: 10 }
      ],
      shapeData: [
        {
          name: '员工A',
          value: [8, 7, 9, 8, 6],
          areaStyle: { opacity: 0.3 }
        }
      ]
    }
  }
}
</script>
```
:::

### 带标签的雷达图

在数据点显示具体数值。

:::demo 设置`show-label`属性显示数值标签。

```html
<template>
  <el-radar-chart
    :data="labelData"
    :indicators="scoreIndicators"
    :show-label="true"
    height="400px">
  </el-radar-chart>
</template>

<script>
export default {
  data() {
    return {
      scoreIndicators: [
        { name: '语文', max: 150 },
        { name: '数学', max: 150 },
        { name: '英语', max: 150 },
        { name: '物理', max: 100 },
        { name: '化学', max: 100 },
        { name: '生物', max: 100 }
      ],
      labelData: [
        {
          name: '学生成绩',
          value: [120, 135, 110, 85, 90, 88],
          label: {
            show: true,
            formatter: '{c}'
          }
        }
      ]
    }
  }
}
</script>
```
:::

### 自定义指示器

自定义指示器的样式和位置。

:::demo 通过`indicator-style`属性自定义指示器样式。

```html
<template>
  <el-radar-chart
    :data="customData"
    :indicators="customIndicators"
    :indicator-style="indicatorStyle"
    height="400px">
  </el-radar-chart>
</template>

<script>
export default {
  data() {
    return {
      customIndicators: [
        { name: '品牌知名度', max: 100 },
        { name: '产品质量', max: 100 },
        { name: '服务水平', max: 100 },
        { name: '价格竞争力', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '市场份额', max: 100 }
      ],
      customData: [
        {
          name: '公司评估',
          value: [85, 90, 75, 80, 70, 85]
        }
      ],
      indicatorStyle: {
        nameGap: 15,
        nameTextStyle: {
          color: '#333',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      }
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
| indicators | 指示器配置 | Array | — | [] |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| shape | 雷达图形状 | String | polygon/circle | polygon |
| radius | 雷达图半径 | String/Number | — | 75% |
| split-number | 分割段数 | Number | — | 5 |
| show-label | 是否显示标签 | Boolean | — | false |
| indicator-style | 指示器样式 | Object | — | — |
| center | 雷达图中心位置 | Array | — | ['50%', '50%'] |

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
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |