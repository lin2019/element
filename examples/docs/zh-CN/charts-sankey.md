## Sankey 桑基图
用于展示流量在不同阶段或分类之间的流向和数量，常用于能源流向、资金流向、用户行为路径等分析。

### 基础用法

最简单的桑基图用法。

:::demo 使用`nodes`和`links`属性定义节点和连接关系。

```html
<template>
  <el-sankey-chart
    :nodes="sankeyNodes"
    :links="sankeyLinks"
    width="600px"
    height="400px">
  </el-sankey-chart>
</template>

<script>
export default {
  data() {
    return {
      sankeyNodes: [
        { name: '访问' },
        { name: '直接访问' },
        { name: '搜索引擎' },
        { name: '社交媒体' },
        { name: '邮件营销' },
        { name: '购买' },
        { name: '注册' },
        { name: '浏览' }
      ],
      sankeyLinks: [
        { source: '直接访问', target: '访问', value: 320 },
        { source: '搜索引擎', target: '访问', value: 240 },
        { source: '社交媒体', target: '访问', value: 180 },
        { source: '邮件营销', target: '访问', value: 120 },
        { source: '访问', target: '购买', value: 200 },
        { source: '访问', target: '注册', value: 300 },
        { source: '访问', target: '浏览', value: 360 }
      ]
    }
  }
}
</script>
```
:::

### 能源流向图

展示能源在不同环节的流向。

:::demo 使用桑基图展示能源流向数据。

```html
<template>
  <el-sankey-chart
    :nodes="energyNodes"
    :links="energyLinks"
    :node-width="20"
    :node-gap="8"
    width="800px"
    height="500px">
  </el-sankey-chart>
</template>

<script>
export default {
  data() {
    return {
      energyNodes: [
        { name: '煤炭' },
        { name: '石油' },
        { name: '天然气' },
        { name: '水力' },
        { name: '核能' },
        { name: '发电' },
        { name: '工业' },
        { name: '交通' },
        { name: '居民' },
        { name: '商业' }
      ],
      energyLinks: [
        { source: '煤炭', target: '发电', value: 400 },
        { source: '石油', target: '发电', value: 200 },
        { source: '天然气', target: '发电', value: 300 },
        { source: '水力', target: '发电', value: 150 },
        { source: '核能', target: '发电', value: 100 },
        { source: '发电', target: '工业', value: 450 },
        { source: '发电', target: '交通', value: 200 },
        { source: '发电', target: '居民', value: 300 },
        { source: '发电', target: '商业', value: 200 },
        { source: '石油', target: '交通', value: 300 },
        { source: '天然气', target: '居民', value: 150 }
      ]
    }
  }
}
</script>
```
:::

### 自定义颜色

为节点和连接设置自定义颜色。

:::demo 通过节点和连接的颜色属性自定义颜色。

```html
<template>
  <el-sankey-chart
    :nodes="colorNodes"
    :links="colorLinks"
    width="600px"
    height="400px">
  </el-sankey-chart>
</template>

<script>
export default {
  data() {
    return {
      colorNodes: [
        { name: '产品A', itemStyle: { color: '#5470c6' } },
        { name: '产品B', itemStyle: { color: '#91cc75' } },
        { name: '产品C', itemStyle: { color: '#fac858' } },
        { name: '渠道1', itemStyle: { color: '#ee6666' } },
        { name: '渠道2', itemStyle: { color: '#73c0de' } },
        { name: '销售额', itemStyle: { color: '#3ba272' } }
      ],
      colorLinks: [
        { source: '产品A', target: '渠道1', value: 120, lineStyle: { color: '#5470c6' } },
        { source: '产品A', target: '渠道2', value: 80, lineStyle: { color: '#5470c6' } },
        { source: '产品B', target: '渠道1', value: 100, lineStyle: { color: '#91cc75' } },
        { source: '产品B', target: '渠道2', value: 90, lineStyle: { color: '#91cc75' } },
        { source: '产品C', target: '渠道1', value: 60, lineStyle: { color: '#fac858' } },
        { source: '产品C', target: '渠道2', value: 70, lineStyle: { color: '#fac858' } },
        { source: '渠道1', target: '销售额', value: 280 },
        { source: '渠道2', target: '销售额', value: 240 }
      ]
    }
  }
}
</script>
```
:::

### 垂直布局

垂直方向的桑基图布局。

:::demo 设置`orient`属性为`vertical`。

```html
<template>
  <el-sankey-chart
    :nodes="verticalNodes"
    :links="verticalLinks"
    orient="vertical"
    width="500px"
    height="600px">
  </el-sankey-chart>
</template>

<script>
export default {
  data() {
    return {
      verticalNodes: [
        { name: '原材料' },
        { name: '供应商A' },
        { name: '供应商B' },
        { name: '生产' },
        { name: '产品X' },
        { name: '产品Y' },
        { name: '销售' }
      ],
      verticalLinks: [
        { source: '供应商A', target: '原材料', value: 200 },
        { source: '供应商B', target: '原材料', value: 150 },
        { source: '原材料', target: '生产', value: 350 },
        { source: '生产', target: '产品X', value: 200 },
        { source: '生产', target: '产品Y', value: 150 },
        { source: '产品X', target: '销售', value: 200 },
        { source: '产品Y', target: '销售', value: 150 }
      ]
    }
  }
}
</script>
```
:::

### 标签配置

自定义节点标签的显示。

:::demo 通过`label`属性配置标签样式。

```html
<template>
  <el-sankey-chart
    :nodes="labelNodes"
    :links="labelLinks"
    :label="labelConfig"
    width="600px"
    height="400px">
  </el-sankey-chart>
</template>

<script>
export default {
  data() {
    return {
      labelNodes: [
        { name: '移动端' },
        { name: 'PC端' },
        { name: '平板端' },
        { name: '首页' },
        { name: '产品页' },
        { name: '购物车' },
        { name: '结算' }
      ],
      labelLinks: [
        { source: '移动端', target: '首页', value: 300 },
        { source: 'PC端', target: '首页', value: 200 },
        { source: '平板端', target: '首页', value: 100 },
        { source: '首页', target: '产品页', value: 400 },
        { source: '首页', target: '购物车', value: 200 },
        { source: '产品页', target: '购物车', value: 250 },
        { source: '购物车', target: '结算', value: 300 }
      ],
      labelConfig: {
        show: true,
        position: 'right',
        fontSize: 12,
        color: '#333'
      }
    }
  }
}
</script>
```
:::

### 交互功能

支持节点和连接的交互操作。

:::demo 监听点击和悬停事件。

```html
<template>
  <div>
    <el-sankey-chart
      :nodes="interactiveNodes"
      :links="interactiveLinks"
      @node-click="handleNodeClick"
      @link-click="handleLinkClick"
      @node-hover="handleNodeHover"
      width="600px"
      height="400px">
    </el-sankey-chart>
    <div style="margin-top: 20px;">
      <p>节点点击: {{ nodeClickInfo }}</p>
      <p>连接点击: {{ linkClickInfo }}</p>
      <p>节点悬停: {{ nodeHoverInfo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeClickInfo: '暂无',
      linkClickInfo: '暂无',
      nodeHoverInfo: '暂无',
      interactiveNodes: [
        { name: '北京' },
        { name: '上海' },
        { name: '广州' },
        { name: '深圳' },
        { name: '杭州' },
        { name: '成都' }
      ],
      interactiveLinks: [
        { source: '北京', target: '上海', value: 100 },
        { source: '北京', target: '广州', value: 80 },
        { source: '上海', target: '深圳', value: 120 },
        { source: '广州', target: '深圳', value: 90 },
        { source: '深圳', target: '杭州', value: 70 },
        { source: '杭州', target: '成都', value: 60 }
      ]
    }
  },
  methods: {
    handleNodeClick(params) {
      this.nodeClickInfo = `节点: ${params.name}`
    },
    handleLinkClick(params) {
      this.linkClickInfo = `${params.source} -> ${params.target}: ${params.value}`
    },
    handleNodeHover(params) {
      this.nodeHoverInfo = `悬停节点: ${params.name}`
    }
  }
}
</script>
```
:::

### 动态数据

支持动态更新的桑基图。

:::demo 动态改变桑基图数据。

```html
<template>
  <div>
    <el-sankey-chart
      :nodes="dynamicNodes"
      :links="dynamicLinks"
      :animation="true"
      width="600px"
      height="400px">
    </el-sankey-chart>
    <div style="margin-top: 20px;">
      <el-button @click="updateData">更新数据</el-button>
      <el-button @click="addNode">添加节点</el-button>
      <el-button @click="removeNode">删除节点</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicNodes: [
        { name: '来源A' },
        { name: '来源B' },
        { name: '中转' },
        { name: '目标' }
      ],
      dynamicLinks: [
        { source: '来源A', target: '中转', value: 100 },
        { source: '来源B', target: '中转', value: 80 },
        { source: '中转', target: '目标', value: 180 }
      ]
    }
  },
  methods: {
    updateData() {
      this.dynamicLinks = this.dynamicLinks.map(link => ({
        ...link,
        value: Math.floor(Math.random() * 200) + 50
      }))
    },
    addNode() {
      const newNodeName = `节点${this.dynamicNodes.length + 1}`
      this.dynamicNodes.push({ name: newNodeName })
      this.dynamicLinks.push({
        source: '中转',
        target: newNodeName,
        value: Math.floor(Math.random() * 100) + 20
      })
    },
    removeNode() {
      if (this.dynamicNodes.length > 4) {
        const removedNode = this.dynamicNodes.pop()
        this.dynamicLinks = this.dynamicLinks.filter(
          link => link.source !== removedNode.name && link.target !== removedNode.name
        )
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
| nodes | 节点数据 | Array | — | [] |
| links | 连接数据 | Array | — | [] |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| orient | 布局方向 | String | horizontal/vertical | horizontal |
| node-width | 节点宽度 | Number | — | 20 |
| node-gap | 节点间距 | Number | — | 8 |
| iterations | 布局迭代次数 | Number | — | 32 |
| label | 标签配置 | Object | — | — |
| animation | 是否启用动画 | Boolean | — | true |
| animation-duration | 动画持续时间 | Number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| node-click | 点击节点时触发 | (params) |
| link-click | 点击连接时触发 | (params) |
| node-hover | 鼠标悬停节点时触发 | (params) |
| link-hover | 鼠标悬停连接时触发 | (params) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| setOption | 设置图表配置 | (option) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |