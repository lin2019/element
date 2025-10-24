## Histogram 直方图
用于展示数据的分布情况，将连续数据分组并显示每组的频率。

### 基础用法

最简单的直方图用法。

:::demo 使用`data`属性传入原始数据，组件会自动计算分组和频率。

```html
<template>
  <el-histogram-chart
    :data="rawData"
    field="score"
    :bins="10"
    height="400px">
  </el-histogram-chart>
</template>

<script>
export default {
  data() {
    return {
      rawData: [
        { score: 65 }, { score: 72 }, { score: 78 }, { score: 85 }, { score: 92 },
        { score: 68 }, { score: 75 }, { score: 82 }, { score: 88 }, { score: 95 },
        { score: 70 }, { score: 77 }, { score: 84 }, { score: 90 }, { score: 96 },
        { score: 73 }, { score: 79 }, { score: 86 }, { score: 93 }, { score: 98 },
        { score: 66 }, { score: 74 }, { score: 80 }, { score: 87 }, { score: 94 }
      ]
    }
  }
}
</script>
```
:::

### 自定义分组数量

控制直方图的分组数量。

:::demo 通过`bins`属性设置分组数量。

```html
<template>
  <div>
    <el-radio-group v-model="binCount" @change="updateBins">
      <el-radio :label="5">5组</el-radio>
      <el-radio :label="10">10组</el-radio>
      <el-radio :label="15">15组</el-radio>
      <el-radio :label="20">20组</el-radio>
    </el-radio-group>
    
    <el-histogram-chart
      :data="ageData"
      field="age"
      :bins="binCount"
      height="400px"
      style="margin-top: 20px;">
    </el-histogram-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      binCount: 10,
      ageData: [
        { age: 18 }, { age: 22 }, { age: 25 }, { age: 28 }, { age: 32 },
        { age: 19 }, { age: 23 }, { age: 26 }, { age: 29 }, { age: 33 },
        { age: 20 }, { age: 24 }, { age: 27 }, { age: 30 }, { age: 34 },
        { age: 21 }, { age: 25 }, { age: 28 }, { age: 31 }, { age: 35 },
        { age: 22 }, { age: 26 }, { age: 29 }, { age: 32 }, { age: 36 },
        { age: 23 }, { age: 27 }, { age: 30 }, { age: 33 }, { age: 37 }
      ]
    }
  },
  methods: {
    updateBins(value) {
      this.binCount = value;
    }
  }
}
</script>
```
:::

### 自定义分组范围

手动指定分组的范围。

:::demo 通过`bin-ranges`属性自定义分组范围。

```html
<template>
  <el-histogram-chart
    :data="salaryData"
    field="salary"
    :bin-ranges="customRanges"
    height="400px">
  </el-histogram-chart>
</template>

<script>
export default {
  data() {
    return {
      salaryData: [
        { salary: 3000 }, { salary: 4500 }, { salary: 6000 }, { salary: 7500 },
        { salary: 9000 }, { salary: 3500 }, { salary: 5000 }, { salary: 6500 },
        { salary: 8000 }, { salary: 9500 }, { salary: 4000 }, { salary: 5500 },
        { salary: 7000 }, { salary: 8500 }, { salary: 10000 }, { salary: 4200 },
        { salary: 5800 }, { salary: 7200 }, { salary: 8800 }, { salary: 11000 }
      ],
      customRanges: [
        { min: 0, max: 5000, label: '0-5K' },
        { min: 5000, max: 8000, label: '5K-8K' },
        { min: 8000, max: 12000, label: '8K-12K' },
        { min: 12000, max: 20000, label: '12K+' }
      ]
    }
  }
}
</script>
```
:::

### 密度直方图

显示概率密度而非频率。

:::demo 设置`density`属性为`true`显示密度分布。

```html
<template>
  <el-histogram-chart
    :data="heightData"
    field="height"
    :bins="12"
    :density="true"
    height="400px">
  </el-histogram-chart>
</template>

<script>
export default {
  data() {
    return {
      heightData: [
        { height: 160 }, { height: 165 }, { height: 170 }, { height: 175 },
        { height: 162 }, { height: 167 }, { height: 172 }, { height: 177 },
        { height: 164 }, { height: 169 }, { height: 174 }, { height: 179 },
        { height: 161 }, { height: 166 }, { height: 171 }, { height: 176 },
        { height: 163 }, { height: 168 }, { height: 173 }, { height: 178 },
        { height: 165 }, { height: 170 }, { height: 175 }, { height: 180 }
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
| field | 数据字段名 | String | — | — |
| bins | 分组数量 | Number | — | 10 |
| bin-ranges | 自定义分组范围 | Array | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| color | 颜色配置 | String | — | #409EFF |
| density | 是否显示密度 | Boolean | — | false |
| show-normal-curve | 是否显示正态分布曲线 | Boolean | — | false |
| bin-width | 分组宽度 | Number | — | auto |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击柱子时触发 | (event, data) |
| hover | 鼠标悬停时触发 | (event, data) |
| bin-click | 点击分组时触发 | (event, binData) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| getStatistics | 获取统计信息 | — |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |