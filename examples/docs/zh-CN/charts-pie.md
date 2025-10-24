## Pie 饼图
用于展示数据的占比关系，适合显示各部分在整体中的比例。

### 基础用法

最简单的饼图用法。

:::demo 使用`data`属性传入数据，`name-field`和`value-field`指定名称和数值字段。

```html
<template>
  <el-pie-chart
    :data="chartData"
    name-field="name"
    value-field="value"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { name: '直接访问', value: 335 },
        { name: '邮件营销', value: 310 },
        { name: '联盟广告', value: 234 },
        { name: '视频广告', value: 135 },
        { name: '搜索引擎', value: 1548 }
      ]
    }
  }
}
</script>
```
:::

### 带标签的饼图

显示数据标签和百分比。

:::demo 设置`show-label`属性显示标签，`label-type`控制标签类型。

```html
<template>
  <el-pie-chart
    :data="labelData"
    name-field="category"
    value-field="amount"
    :show-label="true"
    label-type="percent"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      labelData: [
        { category: '移动端', amount: 1200 },
        { category: '桌面端', amount: 800 },
        { category: '平板端', amount: 400 },
        { category: '其他', amount: 200 }
      ]
    }
  }
}
</script>
```
:::

### 环形饼图

中心留空的环形饼图。

:::demo 设置`inner-radius`属性创建环形效果。

```html
<template>
  <el-pie-chart
    :data="donutData"
    name-field="type"
    value-field="count"
    :inner-radius="50"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      donutData: [
        { type: '新用户', count: 450 },
        { type: '老用户', count: 320 },
        { type: '活跃用户', count: 280 },
        { type: '沉默用户', count: 150 }
      ]
    }
  }
}
</script>
```
:::

### 玫瑰图

扇区半径根据数值大小变化。

:::demo 设置`rose-type`属性启用玫瑰图模式。

```html
<template>
  <el-pie-chart
    :data="roseData"
    name-field="product"
    value-field="sales"
    rose-type="radius"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      roseData: [
        { product: 'iPhone', sales: 40 },
        { product: 'Samsung', sales: 38 },
        { product: 'Huawei', sales: 32 },
        { product: 'Xiaomi', sales: 30 },
        { product: 'OPPO', sales: 28 },
        { product: 'Vivo', sales: 26 },
        { product: '其他', sales: 22 }
      ]
    }
  }
}
</script>
```
:::

### 自定义颜色

自定义饼图的颜色方案。

:::demo 通过`color`属性设置自定义颜色。

```html
<template>
  <el-pie-chart
    :data="colorData"
    name-field="region"
    value-field="population"
    :color="customColors"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      colorData: [
        { region: '华北', population: 120 },
        { region: '华东', population: 200 },
        { region: '华南', population: 150 },
        { region: '华中', population: 80 },
        { region: '西南', population: 70 },
        { region: '西北', population: 60 },
        { region: '东北', population: 50 }
      ],
      customColors: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEAA7', '#DDA0DD', '#98D8C8'
      ]
    }
  }
}
</script>
```
:::

### 突出显示

突出显示特定扇区。

:::demo 在数据中设置`selected`属性突出显示扇区。

```html
<template>
  <el-pie-chart
    :data="highlightData"
    name-field="browser"
    value-field="usage"
    height="400px">
  </el-pie-chart>
</template>

<script>
export default {
  data() {
    return {
      highlightData: [
        { browser: 'Chrome', usage: 65, selected: true },
        { browser: 'Safari', usage: 18 },
        { browser: 'Firefox', usage: 8 },
        { browser: 'Edge', usage: 5 },
        { browser: '其他', usage: 4 }
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
| name-field | 名称字段 | String | — | — |
| value-field | 数值字段 | String | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | Array | — | — |
| radius | 饼图半径 | String/Number | — | 75% |
| inner-radius | 内半径 | String/Number | — | 0 |
| center | 饼图中心位置 | Array | — | ['50%', '50%'] |
| rose-type | 玫瑰图类型 | String | radius/area | — |
| show-label | 是否显示标签 | Boolean | — | true |
| label-type | 标签类型 | String | name/value/percent | name |
| label-position | 标签位置 | String | outside/inside/center | outside |

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
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |