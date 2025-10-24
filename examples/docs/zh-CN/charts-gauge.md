## Gauge 仪表图
用于展示单一数值在某个范围内的进度或状态，常用于显示完成度、性能指标等。

### 基础用法

最简单的仪表图用法。

:::demo 使用`value`属性设置当前值，`max`属性设置最大值。

```html
<template>
  <el-gauge-chart
    :value="gaugeValue"
    :max="100"
    title="完成度"
    unit="%"
    width="300px"
    height="300px">
  </el-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      gaugeValue: 75
    }
  }
}
</script>
```
:::

### 多指针仪表图

显示多个指标的仪表图。

:::demo 通过`series`属性配置多个指针。

```html
<template>
  <el-gauge-chart
    :series="multiGaugeSeries"
    width="400px"
    height="400px">
  </el-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      multiGaugeSeries: [
        {
          name: 'CPU使用率',
          value: 65,
          max: 100,
          color: '#409EFF'
        },
        {
          name: '内存使用率',
          value: 80,
          max: 100,
          color: '#E6A23C'
        },
        {
          name: '磁盘使用率',
          value: 45,
          max: 100,
          color: '#67C23A'
        }
      ]
    }
  }
}
</script>
```
:::

### 分段颜色仪表图

根据数值范围显示不同颜色。

:::demo 通过`color-ranges`属性设置分段颜色。

```html
<template>
  <el-gauge-chart
    :value="rangeValue"
    :max="100"
    :color-ranges="colorRanges"
    title="性能评分"
    unit="分"
    width="350px"
    height="350px">
  </el-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      rangeValue: 85,
      colorRanges: [
        { min: 0, max: 30, color: '#F56C6C' },
        { min: 30, max: 60, color: '#E6A23C' },
        { min: 60, max: 80, color: '#409EFF' },
        { min: 80, max: 100, color: '#67C23A' }
      ]
    }
  }
}
</script>
```
:::

### 自定义样式仪表图

自定义仪表图的外观样式。

:::demo 通过各种样式属性自定义外观。

```html
<template>
  <el-gauge-chart
    :value="customValue"
    :max="200"
    :start-angle="225"
    :end-angle="-45"
    :pointer-style="pointerStyle"
    :axis-style="axisStyle"
    title="速度"
    unit="km/h"
    width="400px"
    height="400px">
  </el-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      customValue: 120,
      pointerStyle: {
        color: '#E6A23C',
        width: 4
      },
      axisStyle: {
        lineColor: '#DCDFE6',
        lineWidth: 2,
        tickColor: '#909399',
        labelColor: '#606266'
      }
    }
  }
}
</script>
```
:::

### 带刻度的仪表图

显示详细刻度和标签的仪表图。

:::demo 设置`show-scale`和相关刻度属性。

```html
<template>
  <el-gauge-chart
    :value="scaleValue"
    :max="100"
    :show-scale="true"
    :scale-count="10"
    :sub-scale-count="5"
    title="温度"
    unit="°C"
    width="350px"
    height="350px">
  </el-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      scaleValue: 68
    }
  }
}
</script>
```
:::

### 动画仪表图

带有动画效果的仪表图。

:::demo 设置`animation`属性启用动画。

```html
<template>
  <div>
    <el-gauge-chart
      :value="animationValue"
      :max="100"
      :animation="true"
      :animation-duration="2000"
      title="进度"
      unit="%"
      width="300px"
      height="300px">
    </el-gauge-chart>
    <div style="margin-top: 20px;">
      <el-button @click="updateValue">更新数值</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animationValue: 30
    }
  },
  methods: {
    updateValue() {
      this.animationValue = Math.floor(Math.random() * 100)
    }
  }
}
</script>
```
:::

### 迷你仪表图

紧凑型的仪表图显示。

:::demo 设置`mini`属性启用迷你模式。

```html
<template>
  <div style="display: flex; gap: 20px;">
    <el-gauge-chart
      :value="75"
      :max="100"
      mini
      title="CPU"
      unit="%"
      width="150px"
      height="150px">
    </el-gauge-chart>
    <el-gauge-chart
      :value="60"
      :max="100"
      mini
      title="内存"
      unit="%"
      width="150px"
      height="150px">
    </el-gauge-chart>
    <el-gauge-chart
      :value="40"
      :max="100"
      mini
      title="磁盘"
      unit="%"
      width="150px"
      height="150px">
    </el-gauge-chart>
  </div>
</template>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 当前值 | Number | — | 0 |
| max | 最大值 | Number | — | 100 |
| min | 最小值 | Number | — | 0 |
| series | 多指针配置 | Array | — | — |
| title | 标题 | String | — | — |
| unit | 单位 | String | — | — |
| width | 图表宽度 | String | — | 300px |
| height | 图表高度 | String | — | 300px |
| start-angle | 起始角度 | Number | — | 225 |
| end-angle | 结束角度 | Number | — | -45 |
| color-ranges | 分段颜色配置 | Array | — | — |
| pointer-style | 指针样式 | Object | — | — |
| axis-style | 轴线样式 | Object | — | — |
| show-scale | 是否显示刻度 | Boolean | — | false |
| scale-count | 主刻度数量 | Number | — | 5 |
| sub-scale-count | 次刻度数量 | Number | — | 5 |
| animation | 是否启用动画 | Boolean | — | false |
| animation-duration | 动画持续时间 | Number | — | 1000 |
| mini | 是否为迷你模式 | Boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| change | 数值变化时触发 | (value) |
| click | 点击图表时触发 | (event) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| setValue | 设置数值 | (value, animation) |
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |