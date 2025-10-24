## Heatmap 热力图
用于展示数据在二维平面上的分布密度，通过颜色深浅表示数值大小，常用于相关性分析、时间序列分析等。

### 基础用法

最简单的热力图用法。

:::demo 使用`data`属性传入二维数组数据，每个元素包含`[x, y, value]`。

```html
<template>
  <el-heatmap-chart
    :data="heatmapData"
    :x-axis="xAxisData"
    :y-axis="yAxisData"
    width="600px"
    height="400px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      yAxisData: ['上午', '下午', '晚上'],
      heatmapData: [
        [0, 0, 5], [0, 1, 1], [0, 2, 0],
        [1, 0, 1], [1, 1, 9], [1, 2, 4],
        [2, 0, 6], [2, 1, 7], [2, 2, 8],
        [3, 0, 9], [3, 1, 5], [3, 2, 3],
        [4, 0, 2], [4, 1, 2], [4, 2, 5],
        [5, 0, 4], [5, 1, 2], [5, 2, 4],
        [6, 0, 7], [6, 1, 3], [6, 2, 3]
      ]
    }
  }
}
</script>
```
:::

### 自定义颜色映射

设置热力图的颜色映射范围。

:::demo 通过`visual-map`属性配置颜色映射。

```html
<template>
  <el-heatmap-chart
    :data="colorData"
    :x-axis="months"
    :y-axis="cities"
    :visual-map="visualMapConfig"
    width="800px"
    height="500px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      cities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'],
      colorData: this.generateData(),
      visualMapConfig: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      }
    }
  },
  methods: {
    generateData() {
      const data = []
      for (let i = 0; i < this.months.length; i++) {
        for (let j = 0; j < this.cities.length; j++) {
          data.push([i, j, Math.floor(Math.random() * 100)])
        }
      }
      return data
    }
  }
}
</script>
```
:::

### 日历热力图

展示日历形式的热力图。

:::demo 使用日历坐标系展示数据。

```html
<template>
  <el-heatmap-chart
    :data="calendarData"
    type="calendar"
    :calendar-config="calendarConfig"
    width="900px"
    height="300px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      calendarData: this.generateCalendarData(),
      calendarConfig: {
        range: '2023',
        cellSize: ['auto', 20]
      }
    }
  },
  methods: {
    generateCalendarData() {
      const data = []
      const startDate = new Date('2023-01-01')
      const endDate = new Date('2023-12-31')
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        const value = Math.floor(Math.random() * 100)
        data.push([dateStr, value])
      }
      return data
    }
  }
}
</script>
```
:::

### 相关性矩阵

展示变量间的相关性热力图。

:::demo 使用热力图展示相关性矩阵。

```html
<template>
  <el-heatmap-chart
    :data="correlationData"
    :x-axis="variables"
    :y-axis="variables"
    :show-values="true"
    width="500px"
    height="500px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      variables: ['销售额', '广告费', '客户数', '转化率', '客单价'],
      correlationData: [
        [0, 0, 1.00], [0, 1, 0.85], [0, 2, 0.92], [0, 3, 0.76], [0, 4, 0.68],
        [1, 0, 0.85], [1, 1, 1.00], [1, 2, 0.73], [1, 3, 0.81], [1, 4, 0.59],
        [2, 0, 0.92], [2, 1, 0.73], [2, 2, 1.00], [2, 3, 0.67], [2, 4, 0.71],
        [3, 0, 0.76], [3, 1, 0.81], [3, 2, 0.67], [3, 3, 1.00], [3, 4, 0.54],
        [4, 0, 0.68], [4, 1, 0.59], [4, 2, 0.71], [4, 3, 0.54], [4, 4, 1.00]
      ]
    }
  }
}
</script>
```
:::

### 时间序列热力图

展示时间序列数据的热力图。

:::demo 使用时间轴展示数据变化。

```html
<template>
  <el-heatmap-chart
    :data="timeSeriesData"
    :x-axis="hours"
    :y-axis="days"
    :animation="true"
    width="800px"
    height="400px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      hours: Array.from({length: 24}, (_, i) => `${i}:00`),
      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      timeSeriesData: this.generateTimeSeriesData()
    }
  },
  methods: {
    generateTimeSeriesData() {
      const data = []
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          let value = 0
          // 模拟工作日和周末的不同模式
          if (day < 5) { // 工作日
            if (hour >= 9 && hour <= 18) {
              value = Math.floor(Math.random() * 50) + 30
            } else {
              value = Math.floor(Math.random() * 20)
            }
          } else { // 周末
            if (hour >= 10 && hour <= 22) {
              value = Math.floor(Math.random() * 40) + 20
            } else {
              value = Math.floor(Math.random() * 15)
            }
          }
          data.push([hour, day, value])
        }
      }
      return data
    }
  }
}
</script>
```
:::

### 自定义样式

自定义热力图的样式和外观。

:::demo 通过样式配置自定义外观。

```html
<template>
  <el-heatmap-chart
    :data="styleData"
    :x-axis="styleXAxis"
    :y-axis="styleYAxis"
    :item-style="itemStyle"
    :label-style="labelStyle"
    width="600px"
    height="400px">
  </el-heatmap-chart>
</template>

<script>
export default {
  data() {
    return {
      styleXAxis: ['产品A', '产品B', '产品C', '产品D', '产品E'],
      styleYAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
      styleData: [
        [0, 0, 45], [0, 1, 62], [0, 2, 38], [0, 3, 71],
        [1, 0, 53], [1, 1, 29], [1, 2, 84], [1, 3, 47],
        [2, 0, 76], [2, 1, 91], [2, 2, 33], [2, 3, 58],
        [3, 0, 42], [3, 1, 67], [3, 2, 95], [3, 3, 24],
        [4, 0, 89], [4, 1, 15], [4, 2, 72], [4, 3, 86]
      ],
      itemStyle: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff'
      },
      labelStyle: {
        show: true,
        color: '#fff',
        fontSize: 12
      }
    }
  }
}
</script>
```
:::

### 交互功能

支持点击和悬停交互的热力图。

:::demo 监听交互事件。

```html
<template>
  <div>
    <el-heatmap-chart
      :data="interactiveData"
      :x-axis="interactiveXAxis"
      :y-axis="interactiveYAxis"
      @click="handleClick"
      @hover="handleHover"
      width="600px"
      height="400px">
    </el-heatmap-chart>
    <div style="margin-top: 20px;">
      <p>点击事件: {{ clickInfo }}</p>
      <p>悬停事件: {{ hoverInfo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickInfo: '暂无',
      hoverInfo: '暂无',
      interactiveXAxis: ['部门A', '部门B', '部门C', '部门D'],
      interactiveYAxis: ['指标1', '指标2', '指标3', '指标4', '指标5'],
      interactiveData: this.generateInteractiveData()
    }
  },
  methods: {
    generateInteractiveData() {
      const data = []
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
          data.push([i, j, Math.floor(Math.random() * 100)])
        }
      }
      return data
    },
    handleClick(params) {
      const [x, y, value] = params.data
      this.clickInfo = `${this.interactiveXAxis[x]} - ${this.interactiveYAxis[y]}: ${value}`
    },
    handleHover(params) {
      const [x, y, value] = params.data
      this.hoverInfo = `${this.interactiveXAxis[x]} - ${this.interactiveYAxis[y]}: ${value}`
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
| x-axis | X轴数据 | Array | — | [] |
| y-axis | Y轴数据 | Array | — | [] |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| type | 热力图类型 | String | normal/calendar | normal |
| visual-map | 视觉映射配置 | Object | — | — |
| calendar-config | 日历配置 | Object | — | — |
| show-values | 是否显示数值 | Boolean | — | false |
| item-style | 项目样式 | Object | — | — |
| label-style | 标签样式 | Object | — | — |
| animation | 是否启用动画 | Boolean | — | true |
| animation-duration | 动画持续时间 | Number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击热力块时触发 | (params) |
| hover | 鼠标悬停时触发 | (params) |
| brush-selected | 框选时触发 | (params) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| setOption | 设置图表配置 | (option) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |