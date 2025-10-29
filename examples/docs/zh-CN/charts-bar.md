## Bar 柱状图

基于 ECharts 的柱状图组件，提供多种图表样式和丰富的配置选项。

### 基础用法

最简单的柱状图用法。

:::demo 使用 `config` 属性配置图表数据，`type` 指定图表类型。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          width: '100%',
          height: '400px',
          data: {
            categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            series: [{ name: '销售额', data: [120, 200, 150, 80, 70, 110, 130] }]
          },
          showTitle: true,
          title: '基础柱状图'
        }
      }
    }
  }
</script>
```

:::

### 多系列柱状图

展示多个数据系列的对比。

:::demo 通过 `data.series` 配置多个数据系列，使用 `legendNames` 设置图例名称。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
            series: [{ name: '销售额', data: [320, 280, 250, 310, 290, 350] }, { name: '成本', data: [200, 180, 170, 190, 180, 220] }]
          },
          legendNames: ['销售额', '成本'],
          colors: ['#5470C6', '#91CC75'],
          showValue: true
        }
      }
    }
  }
</script>
```

:::

### 堆叠柱状图

将多个数据系列堆叠显示，适合展示数据的组成部分。

:::demo 设置 `type="stack"` 启用堆叠模式。

```html
<template>
  <el-bar-chart :config="config" type="stack" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['周一', '周二', '周三', '周四', '周五'],
            series: [{ name: '直接访问', data: [320, 302, 301, 334, 390] }, { name: '邮件营销', data: [120, 132, 101, 134, 90] }, { name: '联盟广告', data: [220, 182, 191, 234, 290] }]
          },
          legendNames: ['直接访问', '邮件营销', '联盟广告'],
          colors: ['#5470C6', '#91CC75', '#FAC858'],
          showValue: true,
          showTitle: true,
          title: '堆叠柱状图'
        }
      }
    }
  }
</script>
```

:::

### 锥形柱状图

使用锥形符号的柱状图，视觉效果更加独特。

:::demo 设置 `type="taper"` 使用锥形柱状图。

```html
<template>
  <el-bar-chart :config="config" type="taper" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['产品A', '产品B', '产品C', '产品D', '产品E'],
            series: [{ name: '销量', data: [320, 280, 250, 190, 150] }]
          },
          barWidth: 25,
          showValue: true,
          showTitle: true,
          title: '锥形柱状图'
        }
      }
    }
  }
</script>
```

:::

### 双向柱状图

数据从中轴线向两侧延伸，适合对比展示。

:::demo 设置 `type="bidirectional"` 使用双向柱状图。

```html
<template>
  <el-bar-chart :config="config" type="bidirectional" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
            series: [{ name: '收入', data: [120, 200, 150, 180, 170, 210] }, { name: '支出', data: [-100, -180, -130, -150, -140, -190] }]
          },
          legendNames: ['收入', '支出'],
          colors: ['#5470C6', '#EE6666'],
          showTitle: true,
          title: '双向柱状图'
        }
      }
    }
  }
</script>
```

:::

### 折柱图

柱状图与折线图的组合，适合展示两种不同维度的数据。

:::demo 设置 `type="bar-line"` 使用折柱混合图。第一个系列为柱状图，第二个系列为折线图。

```html
<template>
  <el-bar-chart :config="config" type="bar-line" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
            series: [{ name: '销售额', data: [320, 280, 250, 310, 290, 350] }, { name: '增长率(%)', data: [50, 45, 40, 52, 48, 58] }]
          },
          legendNames: ['销售额', '增长率(%)'],
          colors: ['#5470C6', '#EE6666'],
          showValue: true,
          showTitle: true,
          title: '折柱混合图'
        }
      }
    }
  }
</script>
```

:::

### 立体柱状图

具有 3D 立体效果的柱状图，视觉冲击力强。

:::demo 设置 `type="3d"` 使用立体柱状图，可通过 `mlColor3d` 启用多色模式。

```html
<template>
  <div>
    <el-bar-chart :config="config1" type="3d" style="margin-bottom: 20px" />
    <el-bar-chart :config="config2" type="3d" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config1: {
          height: '350px',
          data: {
            categories: ['产品A', '产品B', '产品C', '产品D', '产品E'],
            series: [{ name: '销量', data: [320, 280, 250, 190, 150] }]
          },
          barWidth: 30,
          showTitle: true,
          title: '立体柱状图 - 单色模式'
        },
        config2: {
          height: '350px',
          data: {
            categories: ['产品A', '产品B', '产品C', '产品D', '产品E'],
            series: [{ name: '销量', data: [320, 280, 250, 190, 150] }]
          },
          barWidth: 30,
          mlColor3d: true, // 启用多色模式
          showTitle: true,
          title: '立体柱状图 - 多色模式'
        }
      }
    }
  }
</script>
```

:::

### 自定义颜色

自定义柱状图的颜色配置。

:::demo 通过 `colors` 属性自定义系列颜色。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['苹果', '香蕉', '橙子', '葡萄', '草莓'],
            series: [{ name: '销量', data: [45, 38, 30, 35, 42] }, { name: '库存', data: [25, 28, 20, 22, 30] }]
          },
          legendNames: ['销量', '库存'],
          colors: ['#FF6B6B', '#4ECDC4'],
          barWidth: 25,
          showValue: true,
          showTitle: true,
          title: '自定义颜色'
        }
      }
    }
  }
</script>
```

:::

### 显示数值

在柱子顶部显示具体数值。

:::demo 设置 `showValue: true` 在柱子顶部显示数值。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['周一', '周二', '周三', '周四', '周五'],
            series: [{ name: '访问量', data: [120, 200, 150, 80, 170] }]
          },
          showValue: true,
          barWidth: 30,
          showTitle: true,
          title: '显示数值'
        }
      }
    }
  }
</script>
```

:::

### 滚动模式

数据量较大时启用滚动功能。

:::demo 设置 `scroll: true` 启用滚动模式，使用 `scrollPageNum` 控制每页显示数量。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            series: [{ name: '销售额', data: [120, 200, 150, 180, 170, 210, 190, 220, 180, 160, 200, 230] }]
          },
          scroll: true,
          scrollPageNum: 6, // 每页显示6个
          showValue: true,
          showTitle: true,
          title: '滚动模式'
        }
      }
    }
  }
</script>
```

:::

### 数据边框

为柱子添加边框效果。

:::demo 设置 `showDataBorder: true` 和 `dataBorderColor` 添加边框。

```html
<template>
  <el-bar-chart :config="config" type="base" />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          height: '400px',
          data: {
            categories: ['周一', '周二', '周三', '周四', '周五'],
            series: [{ name: '销售额', data: [120, 200, 150, 180, 170] }]
          },
          showDataBorder: true,
          dataBorderColor: '#ffffff',
          barWidth: 30,
          showTitle: true,
          title: '数据边框'
        }
      }
    }
  }
</script>
```

:::

### Attributes

| 参数   | 说明         | 类型   | 可选值                                               | 默认值 |
| ------ | ------------ | ------ | ---------------------------------------------------- | ------ |
| type   | 图表类型     | string | base / taper / stack / bidirectional / bar-line / 3d | base   |
| config | 图表配置对象 | object | —                                                    | {}     |

### Config 配置项

| 参数            | 说明                   | 类型          | 默认值  |
| --------------- | ---------------------- | ------------- | ------- |
| data            | 数据配置（必填）       | object        | —       |
| data.categories | X 轴分类数据           | array         | —       |
| data.series     | 系列数据数组           | array         | —       |
| legendNames     | 图例名称数组           | array         | —       |
| colors          | 自定义颜色数组         | array         | —       |
| width           | 图表宽度               | string        | 100%    |
| height          | 图表高度               | string        | 400px   |
| barWidth        | 柱体宽度               | number/string | 20      |
| showValue       | 是否显示数值           | boolean       | false   |
| showTitle       | 是否显示标题           | boolean       | false   |
| title           | 图表标题               | string        | —       |
| scroll          | 是否启用滚动           | boolean       | false   |
| scrollPageNum   | 滚动每页显示数量       | number        | 6       |
| showDataBorder  | 是否显示数据边框       | boolean       | false   |
| dataBorderColor | 数据边框颜色           | string        | #ffffff |
| mlColor3d       | 立体图是否启用多色模式 | boolean       | false   |

### Series 数据格式

```javascript
{
  name: '系列名称',
  data: [100, 200, 150, 80, 70]  // 数值数组
}
```

### Methods

| 方法名           | 说明                   | 参数 | 返回值          |
| ---------------- | ---------------------- | ---- | --------------- |
| updateConfig     | 更新图表配置并重新渲染 | —    | —               |
| getChartInstance | 获取 ECharts 实例      | —    | EChartsInstance |

### 图表类型说明

| type 值       | 说明       | 适用场景                       |
| ------------- | ---------- | ------------------------------ |
| base          | 基础柱状图 | 适合展示单系列或多系列数据对比 |
| taper         | 锥形柱状图 | 适合需要特殊视觉效果的场景     |
| stack         | 堆叠柱状图 | 适合展示数据的组成部分         |
| bidirectional | 双向柱状图 | 适合展示正负向数据对比         |
| bar-line      | 折柱图     | 适合展示两种不同维度的数据关系 |
| 3d            | 立体柱状图 | 适合需要强视觉冲击力的场景     |

### 使用示例

```javascript
// 基础使用
<el-bar-chart :config="config" type="base" />

// 完整配置示例
export default {
  data() {
    return {
      config: {
        // 尺寸配置
        width: '100%',
        height: '500px',

        // 数据配置
        data: {
          categories: ['1月', '2月', '3月', '4月', '5月'],
          series: [
            { name: '销售额', data: [320, 280, 250, 310, 290] },
            { name: '成本', data: [200, 180, 170, 190, 180] }
          ]
        },

        // 图例配置
        legendNames: ['销售额', '成本'],

        // 样式配置
        colors: ['#5470C6', '#91CC75'],
        barWidth: 30,

        // 功能配置
        showValue: true,
        showTitle: true,
        title: '销售数据统计',
        scroll: true,
        scrollPageNum: 4
      }
    }
  }
}
```

### 注意事项

1. **数据格式**：确保 `data.categories` 和 `data.series[].data` 长度一致
2. **性能优化**：大数据量时建议启用 `scroll` 配置
3. **类型选择**：根据数据特点选择合适的图表类型
4. **折柱图**：第一个系列为柱状图，第二个系列为折线图
5. **立体图多色**：启用 `mlColor3d` 后，每个柱子会使用不同颜色
