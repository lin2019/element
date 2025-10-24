## Liquid 水波图
用于展示百分比数据，通过液体波动效果直观地显示进度或完成度。

### 基础用法

最简单的水波图用法。

:::demo 使用`value`属性设置百分比值。

```html
<template>
  <el-liquid-chart
    :value="liquidValue"
    width="300px"
    height="300px">
  </el-liquid-chart>
</template>

<script>
export default {
  data() {
    return {
      liquidValue: 0.65
    }
  }
}
</script>
```
:::

### 自定义形状

支持多种容器形状的水波图。

:::demo 通过`shape`属性设置不同形状。

```html
<template>
  <div style="display: flex; gap: 20px;">
    <el-liquid-chart
      :value="0.75"
      shape="circle"
      width="200px"
      height="200px">
    </el-liquid-chart>
    <el-liquid-chart
      :value="0.60"
      shape="rect"
      width="200px"
      height="200px">
    </el-liquid-chart>
    <el-liquid-chart
      :value="0.80"
      shape="diamond"
      width="200px"
      height="200px">
    </el-liquid-chart>
  </div>
</template>
```
:::

### 自定义颜色

自定义水波和容器的颜色。

:::demo 通过`color`和`outline-color`属性设置颜色。

```html
<template>
  <div style="display: flex; gap: 20px;">
    <el-liquid-chart
      :value="0.70"
      color="#409EFF"
      outline-color="#409EFF"
      width="200px"
      height="200px">
    </el-liquid-chart>
    <el-liquid-chart
      :value="0.85"
      color="#67C23A"
      outline-color="#67C23A"
      width="200px"
      height="200px">
    </el-liquid-chart>
    <el-liquid-chart
      :value="0.45"
      color="#E6A23C"
      outline-color="#E6A23C"
      width="200px"
      height="200px">
    </el-liquid-chart>
  </div>
</template>
```
:::

### 渐变色水波图

使用渐变色的水波效果。

:::demo 通过`gradient`属性设置渐变色。

```html
<template>
  <el-liquid-chart
    :value="gradientValue"
    :gradient="gradientConfig"
    width="300px"
    height="300px">
  </el-liquid-chart>
</template>

<script>
export default {
  data() {
    return {
      gradientValue: 0.68,
      gradientConfig: {
        type: 'linear',
        direction: 'vertical',
        colors: [
          { offset: 0, color: '#409EFF' },
          { offset: 1, color: '#67C23A' }
        ]
      }
    }
  }
}
</script>
```
:::

### 带文字标签

显示百分比文字的水波图。

:::demo 设置`show-label`属性显示文字标签。

```html
<template>
  <el-liquid-chart
    :value="labelValue"
    :show-label="true"
    :label-style="labelStyle"
    width="300px"
    height="300px">
  </el-liquid-chart>
</template>

<script>
export default {
  data() {
    return {
      labelValue: 0.72,
      labelStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#FFFFFF'
      }
    }
  }
}
</script>
```
:::

### 波浪动画配置

自定义波浪的动画效果。

:::demo 通过`wave-config`属性配置波浪动画。

```html
<template>
  <el-liquid-chart
    :value="waveValue"
    :wave-config="waveConfig"
    width="300px"
    height="300px">
  </el-liquid-chart>
</template>

<script>
export default {
  data() {
    return {
      waveValue: 0.55,
      waveConfig: {
        amplitude: 20,
        frequency: 2,
        speed: 0.02,
        phase: 0
      }
    }
  }
}
</script>
```
:::

### 多层波浪

显示多层波浪效果的水波图。

:::demo 通过`layers`属性配置多层波浪。

```html
<template>
  <el-liquid-chart
    :value="multiValue"
    :layers="layersConfig"
    width="300px"
    height="300px">
  </el-liquid-chart>
</template>

<script>
export default {
  data() {
    return {
      multiValue: 0.78,
      layersConfig: [
        {
          color: 'rgba(64, 158, 255, 0.8)',
          amplitude: 15,
          frequency: 2,
          speed: 0.02
        },
        {
          color: 'rgba(64, 158, 255, 0.4)',
          amplitude: 10,
          frequency: 3,
          speed: 0.015
        }
      ]
    }
  }
}
</script>
```
:::

### 动态更新

支持动态更新数值的水波图。

:::demo 动态改变水波图的数值。

```html
<template>
  <div>
    <el-liquid-chart
      :value="dynamicValue"
      :animation="true"
      :animation-duration="1500"
      width="300px"
      height="300px">
    </el-liquid-chart>
    <div style="margin-top: 20px;">
      <el-button @click="updateValue">随机更新</el-button>
      <el-button @click="increaseValue">增加</el-button>
      <el-button @click="decreaseValue">减少</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValue: 0.5
    }
  },
  methods: {
    updateValue() {
      this.dynamicValue = Math.random()
    },
    increaseValue() {
      this.dynamicValue = Math.min(1, this.dynamicValue + 0.1)
    },
    decreaseValue() {
      this.dynamicValue = Math.max(0, this.dynamicValue - 0.1)
    }
  }
}
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 百分比值 | Number | 0-1 | 0 |
| width | 图表宽度 | String | — | 300px |
| height | 图表高度 | String | — | 300px |
| shape | 容器形状 | String | circle/rect/diamond | circle |
| color | 水波颜色 | String | — | #409EFF |
| outline-color | 容器边框颜色 | String | — | #409EFF |
| gradient | 渐变配置 | Object | — | — |
| show-label | 是否显示文字标签 | Boolean | — | false |
| label-style | 文字标签样式 | Object | — | — |
| wave-config | 波浪配置 | Object | — | — |
| layers | 多层波浪配置 | Array | — | — |
| animation | 是否启用动画 | Boolean | — | true |
| animation-duration | 动画持续时间 | Number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| change | 数值变化时触发 | (value) |
| click | 点击图表时触发 | (event) |
| animation-end | 动画结束时触发 | — |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| setValue | 设置数值 | (value, animation) |
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| pauseAnimation | 暂停动画 | — |
| resumeAnimation | 恢复动画 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |