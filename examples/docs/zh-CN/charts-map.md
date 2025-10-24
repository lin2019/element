## Map 地图
用于展示地理数据，支持散点图、热力图、区域着色等多种地图可视化方式。

### 基础用法

最简单的地图用法。

:::demo 使用`map-data`属性传入地图数据。

```html
<template>
  <el-map-chart
    :map-data="mapData"
    map-type="china"
    width="800px"
    height="600px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      mapData: [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 123 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 67 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 }
      ]
    }
  }
}
</script>
```
:::

### 散点地图

在地图上显示散点数据。

:::demo 设置`type`属性为`scatter`。

```html
<template>
  <el-map-chart
    :scatter-data="scatterData"
    type="scatter"
    map-type="china"
    width="800px"
    height="600px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      scatterData: [
        { name: '北京', value: [116.46, 39.92, 177] },
        { name: '上海', value: [121.48, 31.22, 24] },
        { name: '深圳', value: [114.07, 22.62, 299] },
        { name: '广州', value: [113.23, 23.16, 260] },
        { name: '杭州', value: [120.19, 30.26, 114] },
        { name: '成都', value: [104.06, 30.67, 125] },
        { name: '西安', value: [108.95, 34.27, 80] },
        { name: '武汉', value: [114.31, 30.52, 116] },
        { name: '郑州', value: [113.65, 34.76, 137] },
        { name: '南京', value: [118.78, 32.04, 92] }
      ]
    }
  }
}
</script>
```
:::

### 热力地图

在地图上显示热力分布。

:::demo 设置`type`属性为`heatmap`。

```html
<template>
  <el-map-chart
    :heatmap-data="heatmapData"
    type="heatmap"
    map-type="china"
    :heatmap-config="heatmapConfig"
    width="800px"
    height="600px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      heatmapData: [
        [116.46, 39.92, 177],
        [121.48, 31.22, 24],
        [114.07, 22.62, 299],
        [113.23, 23.16, 260],
        [120.19, 30.26, 114],
        [104.06, 30.67, 125],
        [108.95, 34.27, 80],
        [114.31, 30.52, 116],
        [113.65, 34.76, 137],
        [118.78, 32.04, 92],
        [117.00, 36.65, 119],
        [120.38, 36.06, 119],
        [109.51, 18.25, 14],
        [103.73, 36.03, 10]
      ],
      heatmapConfig: {
        radius: 20,
        blur: 15,
        gradient: {
          0.4: 'blue',
          0.6: 'cyan',
          0.7: 'lime',
          0.8: 'yellow',
          1.0: 'red'
        }
      }
    }
  }
}
</script>
```
:::

### 自定义地图

使用自定义地图数据。

:::demo 通过`custom-map`属性加载自定义地图。

```html
<template>
  <el-map-chart
    :map-data="customMapData"
    :custom-map="customMapJson"
    map-type="custom"
    width="600px"
    height="500px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      customMapData: [
        { name: '朝阳区', value: 55 },
        { name: '海淀区', value: 25 },
        { name: '丰台区', value: 15 },
        { name: '西城区', value: 35 },
        { name: '东城区', value: 40 },
        { name: '石景山区', value: 10 }
      ],
      customMapJson: null // 这里应该是实际的GeoJSON数据
    }
  },
  mounted() {
    // 模拟加载自定义地图数据
    this.loadCustomMap()
  },
  methods: {
    loadCustomMap() {
      // 实际项目中应该从服务器加载GeoJSON数据
      console.log('加载自定义地图数据')
    }
  }
}
</script>
```
:::

### 多层地图

支持多个图层的地图。

:::demo 通过`layers`属性配置多个图层。

```html
<template>
  <el-map-chart
    :layers="mapLayers"
    map-type="china"
    width="800px"
    height="600px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      mapLayers: [
        {
          type: 'map',
          data: [
            { name: '北京', value: 177 },
            { name: '上海', value: 24 },
            { name: '广东', value: 123 },
            { name: '江苏', value: 92 }
          ]
        },
        {
          type: 'scatter',
          data: [
            { name: '北京', value: [116.46, 39.92, 177] },
            { name: '上海', value: [121.48, 31.22, 24] },
            { name: '深圳', value: [114.07, 22.62, 299] },
            { name: '南京', value: [118.78, 32.04, 92] }
          ],
          symbolSize: 10
        }
      ]
    }
  }
}
</script>
```
:::

### 地图导航

支持缩放和平移的地图导航。

:::demo 设置`roam`属性启用地图导航。

```html
<template>
  <el-map-chart
    :map-data="navMapData"
    map-type="china"
    :roam="true"
    :zoom="1.2"
    :center="[104, 37.5]"
    width="800px"
    height="600px">
  </el-map-chart>
</template>

<script>
export default {
  data() {
    return {
      navMapData: [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '上海', value: 24 },
        { name: '重庆', value: 91 },
        { name: '河北', value: 102 },
        { name: '河南', value: 137 },
        { name: '云南', value: 83 },
        { name: '辽宁', value: 67 },
        { name: '黑龙江', value: 123 },
        { name: '湖南', value: 114 },
        { name: '安徽', value: 109 },
        { name: '山东', value: 119 },
        { name: '新疆', value: 67 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '江西', value: 91 },
        { name: '湖北', value: 116 },
        { name: '广西', value: 59 },
        { name: '甘肃', value: 56 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '陕西', value: 80 },
        { name: '吉林', value: 82 },
        { name: '福建', value: 116 },
        { name: '贵州', value: 62 },
        { name: '广东', value: 123 },
        { name: '青海', value: 10 },
        { name: '西藏', value: 9 },
        { name: '四川', value: 125 },
        { name: '宁夏', value: 18 },
        { name: '海南', value: 14 }
      ]
    }
  }
}
</script>
```
:::

### 交互功能

支持地图区域的交互操作。

:::demo 监听地图交互事件。

```html
<template>
  <div>
    <el-map-chart
      :map-data="interactiveMapData"
      map-type="china"
      @region-click="handleRegionClick"
      @region-hover="handleRegionHover"
      width="800px"
      height="600px">
    </el-map-chart>
    <div style="margin-top: 20px;">
      <p>点击区域: {{ clickedRegion }}</p>
      <p>悬停区域: {{ hoveredRegion }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickedRegion: '暂无',
      hoveredRegion: '暂无',
      interactiveMapData: [
        { name: '北京', value: 177 },
        { name: '上海', value: 24 },
        { name: '广东', value: 123 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '四川', value: 125 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 }
      ]
    }
  },
  methods: {
    handleRegionClick(params) {
      this.clickedRegion = `${params.name}: ${params.value}`
    },
    handleRegionHover(params) {
      this.hoveredRegion = `${params.name}: ${params.value}`
    }
  }
}
</script>
```
:::

### 动态数据

支持动态更新的地图数据。

:::demo 动态改变地图数据。

```html
<template>
  <div>
    <el-map-chart
      :map-data="dynamicMapData"
      map-type="china"
      :animation="true"
      width="800px"
      height="600px">
    </el-map-chart>
    <div style="margin-top: 20px;">
      <el-button @click="updateData">更新数据</el-button>
      <el-button @click="randomizeData">随机数据</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicMapData: [
        { name: '北京', value: 177 },
        { name: '上海', value: 24 },
        { name: '广东', value: 123 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '四川', value: 125 }
      ]
    }
  },
  methods: {
    updateData() {
      this.dynamicMapData = this.dynamicMapData.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 50) - 25
      }))
    },
    randomizeData() {
      this.dynamicMapData = this.dynamicMapData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 200) + 10
      }))
    }
  }
}
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| map-data | 地图数据 | Array | — | [] |
| scatter-data | 散点数据 | Array | — | [] |
| heatmap-data | 热力数据 | Array | — | [] |
| layers | 图层配置 | Array | — | [] |
| type | 地图类型 | String | map/scatter/heatmap | map |
| map-type | 地图名称 | String | china/world/custom | china |
| custom-map | 自定义地图数据 | Object | — | — |
| width | 图表宽度 | String | — | 100% |
| height | 图表高度 | String | — | 400px |
| roam | 是否开启鼠标缩放和平移 | Boolean/String | true/false/scale/move | false |
| zoom | 当前视角的缩放比例 | Number | — | 1 |
| center | 当前视角的中心点 | Array | — | — |
| heatmap-config | 热力图配置 | Object | — | — |
| animation | 是否启用动画 | Boolean | — | true |
| animation-duration | 动画持续时间 | Number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| region-click | 点击地图区域时触发 | (params) |
| region-hover | 鼠标悬停地图区域时触发 | (params) |
| geo-select | 地图区域选中时触发 | (params) |
| geo-unselect | 地图区域取消选中时触发 | (params) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新渲染图表 | — |
| clear | 清空图表 | — |
| setOption | 设置图表配置 | (option) |
| getDataURL | 获取图表的dataURL | (type, pixelRatio, backgroundColor) |
| convertToPixel | 转换坐标系统 | (finder, value) |
| convertFromPixel | 转换坐标系统 | (finder, value) |