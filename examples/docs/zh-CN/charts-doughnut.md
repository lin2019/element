## Doughnut 环形图
环形图是饼图的变体，中心留空，可以在中心区域显示额外信息。

### 基础用法

最简单的环形图用法。

:::demo 使用`data`属性传入数据，`name-field`和`value-field`指定名称和数值字段。

```html
<template>
  <el-doughnut-chart
    :data="chartData"
    name-field="name"
    value-field="value"
    height="400px">
  </el-doughnut-chart>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { name: '已完成', value: 335 },
        { name: '进行中', value: 310 },
        { name: '待开始', value: 234 },
        { name: '已取消', value: 135 }
      ]
    }
  }
}
</script>
```
:::

### 带中心文本的环形图

在中心区域显示总计或其他信息。

:::demo 设置`center-text`属性在中心显示文本。

```html
<template>
  <el-doughnut-chart
    :data="centerTextData"
    name-field="category"
    value-field="amount"
    :center-text="centerText"
    height="400px">
  </el-doughnut-chart>
</template>

<script>
export default {
  data() {
    return {
      centerTextData: [
        { category: '在线销售', amount: 1200 },
        { category: '线下门店', amount: 800 },
        { category: '代理商', amount: 600 },
        { category: '其他渠道', amount: 400 }
      ]
    }
  },
  computed: {
    centerText() {
      const total = this.centerTextData.reduce((sum, item) => sum + item.amount, 0);
      return {
        title: '总销售额',
        value: `¥${total}万`,
        style: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333'
        }
      };
    }
  }
}
</script>
```
:::

### 多层环形图

显示多个层级的数据。

:::demo 通过`series`属性配置多层数据。

```html
<template>
  <el-doughnut-chart
    :series="multiLayerSeries"
    height="400px">
  </el-doughnut-chart>
</template>

<script>
export default {
  data() {
    return {
      multiLayerSeries: [
        {
          name: '外层',
          data: [
            { name: '移动端', value: 60 },
            { name: '桌面端', value: 40 }
          ],
          radius: ['40%', '70%']
        },
        {
          name: '内层',
          data: [
            { name: 'iOS', value: 35 },
            { name: 'Android', value: 25 },
            { name: 'Windows', value: 25 },
            { name: 'macOS', value: 15 }
          ],
          radius: ['0%', '35%']
        }
      ]
    }
  }
}
</script>
```
:::

### 自定义内外半径

调整环形图的内外半径比例。

:::demo 通过`inner-radius`和`outer-radius`属性控制半径。

```html
<template>
  <el-doughnut-chart
    :data="radiusData"
    name-field="type"
    value-field="count"
    inner-radius="60%"
    outer-radius="90%"
    height="400px">
  </el-doughnut-chart>
</template>

<script>
export default {
  data() {
    return {
      radiusData: [
        { type: '优秀', count: 25 },
        { type: '良好', count: 35 },
        { type: '一般', count: 30 },
        { type: '较差', count: 10 }
      ]
    }
  }
}
</script>
```
:::

### 带动画的环形图

添加加载动画效果。

:::demo 设置`animation`属性控制动画效果。

```html
<template>
  <div>
    <el-button @click="refreshData">刷新数据</el-button>
    <el-doughnut-chart
      :data="animationData"
      name-field="department"
      value-field="budget"
      :animation="animationConfig"
      height="400px"
      style="margin-top: 20px;">
    </el-doughnut-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animationData: [
        { department: '研发部', budget: 500 },
        { department: '销售部', budget: 300 },
        { department: '市场部', budget: 200 },
        { department: '运营部', budget: 150 }
      ],
      animationConfig: {
        duration: 1000,
        easing: 'cubicOut'
      }
    }
  },
  methods: {
    refreshData() {
      this.animationData = this.animationData.map(item => ({
        ...item,
        budget: Math.floor(Math.random() * 500) + 100
      }));
    }
  }
}
</script>
```
:::

### 交互式环形图

支持点击选中和高亮效果。

:::demo 设置`selectable`属性启用选中功能。

```html
<template>
  <el-doughnut-chart
    :data="interactiveData"
    name-field="browser"
    value-field="usage"
    :selectable="true"
    @pie-select="onSelect"
    height="400px">
  </el-doughnut-chart>
</template>

<script>
export default {
  data() {
    return {
      interactiveData: [
        { browser: 'Chrome', usage: 65 },
        { browser: 'Safari', usage: 18 },
        { browser: 'Firefox', usage: 8 },
        { browser: 'Edge', usage: 5 },
        { browser: '其他', usage: 4 }
      ]
    }
  },
  methods: {
    onSelect(event, data) {
      this.$message({
        message: `选中了 ${data.name}: ${data.value}%`,
        type: 'info'
      });
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
| name-field | 名称字段 | String | — | — |
| value-field | 数值字段 | String | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | Array | — | — |
| inner-radius | 内半径 | String/Number | — | 50% |
| outer-radius | 外半径 | String/Number | — | 75% |
| center | 环形图中心位置 | Array | — | ['50%', '50%'] |
| center-text | 中心文本配置 | Object | — | — |
| selectable | 是否可选中 | Boolean | — | false |
| animation | 动画配置 | Object | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击扇区时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| legend-click | 点击图例时触发 | (event, legend) |
| pie-select | 选中扇区时触发 | (event, data) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| selectPie | 选中指定扇区 | (index) |
| unselectPie | 取消选中扇区 | (index) |
| setCenterText | 设置中心文本 | (text) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |