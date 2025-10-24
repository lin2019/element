## Funnel 漏斗图
用于展示业务流程中各阶段的数据，常用于销售漏斗、转化率分析等场景。

### 基础用法

最简单的漏斗图用法。

:::demo 使用`data`属性传入数据，每个对象包含`name`和`value`字段。

```html
<template>
  <el-funnel-chart
    :data="funnelData"
    width="400px"
    height="400px">
  </el-funnel-chart>
</template>

<script>
export default {
  data() {
    return {
      funnelData: [
        { name: '访问', value: 100000 },
        { name: '咨询', value: 80000 },
        { name: '订单', value: 60000 },
        { name: '点击', value: 40000 },
        { name: '成交', value: 20000 }
      ]
    }
  }
}
</script>
```
:::

### 自定义颜色

为漏斗图设置自定义颜色。

:::demo 通过`colors`属性设置颜色数组。

```html
<template>
  <el-funnel-chart
    :data="colorData"
    :colors="customColors"
    width="400px"
    height="400px">
  </el-funnel-chart>
</template>

<script>
export default {
  data() {
    return {
      colorData: [
        { name: '展现', value: 100000 },
        { name: '点击', value: 80000 },
        { name: '访问', value: 60000 },
        { name: '咨询', value: 40000 },
        { name: '订单', value: 20000 }
      ],
      customColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
    }
  }
}
</script>
```
:::

### 标签显示

显示数值和百分比标签。

:::demo 设置`show-label`和`label-position`属性。

```html
<template>
  <el-funnel-chart
    :data="labelData"
    :show-label="true"
    label-position="inside"
    width="400px"
    height="400px">
  </el-funnel-chart>
</template>

<script>
export default {
  data() {
    return {
      labelData: [
        { name: '潜在客户', value: 10000 },
        { name: '意向客户', value: 8000 },
        { name: '方案客户', value: 6000 },
        { name: '谈判客户', value: 4000 },
        { name: '成交客户', value: 2000 }
      ]
    }
  }
}
</script>
```
:::

### 排序方式

设置漏斗图的排序方式。

:::demo 通过`sort`属性设置排序方式。

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-radio-group v-model="sortType" @change="handleSortChange">
        <el-radio label="descending">降序</el-radio>
        <el-radio label="ascending">升序</el-radio>
        <el-radio label="none">不排序</el-radio>
      </el-radio-group>
    </div>
    <el-funnel-chart
      :data="sortData"
      :sort="sortType"
      width="400px"
      height="400px">
    </el-funnel-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortType: 'descending',
      sortData: [
        { name: '搜索引擎', value: 335 },
        { name: '直接访问', value: 679 },
        { name: '邮件营销', value: 1548 },
        { name: '联盟广告', value: 251 },
        { name: '视频广告', value: 147 }
      ]
    }
  },
  methods: {
    handleSortChange(value) {
      console.log('排序方式改变:', value)
    }
  }
}
</script>
```
:::

### 间距设置

调整漏斗图各层之间的间距。

:::demo 通过`gap`属性设置间距。

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <span>间距: </span>
      <el-slider
        v-model="gapValue"
        :min="0"
        :max="20"
        style="width: 200px; display: inline-block;">
      </el-slider>
      <span style="margin-left: 10px;">{{ gapValue }}px</span>
    </div>
    <el-funnel-chart
      :data="gapData"
      :gap="gapValue"
      width="400px"
      height="400px">
    </el-funnel-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gapValue: 2,
      gapData: [
        { name: '浏览商品', value: 60000 },
        { name: '放入购物车', value: 40000 },
        { name: '生成订单', value: 20000 },
        { name: '支付订单', value: 10000 },
        { name: '完成购买', value: 5000 }
      ]
    }
  }
}
</script>
```
:::

### 最小尺寸设置

设置漏斗图最小层的尺寸。

:::demo 通过`min-size`属性设置最小尺寸。

```html
<template>
  <el-funnel-chart
    :data="minSizeData"
    :min-size="20"
    width="400px"
    height="400px">
  </el-funnel-chart>
</template>

<script>
export default {
  data() {
    return {
      minSizeData: [
        { name: '首页访问', value: 100000 },
        { name: '产品页面', value: 80000 },
        { name: '购物车', value: 60000 },
        { name: '结算页面', value: 40000 },
        { name: '支付成功', value: 100 }
      ]
    }
  }
}
</script>
```
:::

### 交互功能

支持点击和悬停交互。

:::demo 监听点击和悬停事件。

```html
<template>
  <div>
    <el-funnel-chart
      :data="interactiveData"
      @click="handleClick"
      @hover="handleHover"
      width="400px"
      height="400px">
    </el-funnel-chart>
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
      interactiveData: [
        { name: '市场推广', value: 100000 },
        { name: '获取线索', value: 80000 },
        { name: '线索转化', value: 60000 },
        { name: '客户跟进', value: 40000 },
        { name: '签约成交', value: 20000 }
      ]
    }
  },
  methods: {
    handleClick(params) {
      this.clickInfo = `${params.name}: ${params.value}`
    },
    handleHover(params) {
      this.hoverInfo = `${params.name}: ${params.value}`
    }
  }
}
</script>
```
:::

### 动态数据

支持动态更新数据的漏斗图。

:::demo 动态改变漏斗图数据。

```html
<template>
  <div>
    <el-funnel-chart
      :data="dynamicData"
      :animation="true"
      width="400px"
      height="400px">
    </el-funnel-chart>
    <div style="margin-top: 20px;">
      <el-button @click="updateData">更新数据</el-button>
      <el-button @click="addStage">添加阶段</el-button>
      <el-button @click="removeStage">删除阶段</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicData: [
        { name: '阶段1', value: 1000 },
        { name: '阶段2', value: 800 },
        { name: '阶段3', value: 600 },
        { name: '阶段4', value: 400 }
      ]
    }
  },
  methods: {
    updateData() {
      this.dynamicData = this.dynamicData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 1000) + 100
      }))
    },
    addStage() {
      const newStage = {
        name: `阶段${this.dynamicData.length + 1}`,
        value: Math.floor(Math.random() * 500) + 100
      }
      this.dynamicData.push(newStage)
    },
    removeStage() {
      if (this.dynamicData.length > 1) {
        this.dynamicData.pop()
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
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| colors | 自定义颜色 | Array | — | — |
| sort | 排序方式 | String | ascending/descending/none | descending |
| gap | 层级间距 | Number | — | 0 |
| min-size | 最小层尺寸百分比 | Number | — | 0 |
| show-label | 是否显示标签 | Boolean | — | false |
| label-position | 标签位置 | String | inside/outside | inside |
| animation | 是否启用动画 | Boolean | — | true |
| animation-duration | 动画持续时间 | Number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| click | 点击层级时触发 | (params) |
| hover | 鼠标悬停时触发 | (params) |
| legend-click | 点击图例时触发 | (params) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| setOption | 设置图表配置 | (option) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |