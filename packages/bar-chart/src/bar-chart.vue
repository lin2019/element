<template>
  <div class="base-bar-chart" :style="{ width: finalConfig.width, height: finalConfig.height }">
    <!-- 动态组件，根据 type 自动切换 -->
    <component :is="currentComponent" :config="config" :baseConfig="mergedBaseConfig" :baseOptions="chartOptions" ref="chartComponent" />
  </div>
</template>

<script>
import BaseBar from './variants/base.vue';
import TaperBar from './variants/taper.vue';
import StackBar from './variants/stack.vue';
import BidirectionalBar from './variants/bidirectional.vue';
import BarLine from './variants/bar-line.vue';
import ThreeDBar from './variants/3d-bar.vue';

import { colorToRgba } from '../../utils/chart_utils';
import { ConfigManager } from './core/ConfigManager';
import chartConfig from '../../mixins/chartConfig.js';
import echarts from '../../utils/echarts';

export default {
  name: 'ElBarChart',
  mixins: [chartConfig],

  components: {
    BaseBar,
    TaperBar,
    StackBar,
    BidirectionalBar,
    BarLine,
    ThreeDBar
  },

  props: {
    // 预设模板
    preset: {
      type: String,
      default: null
    }
  },

  provide() {
    return {
      // 提供渐变色生成方法给子组件
      setLineGradientColor: this.createBarGradientColor
    };
  },

  data() {
    return {
      configManager: null,
      hasError: false,
      errorMessage: ''
    };
  },

  computed: {
    /**
     * 合并后的基础配置
     */
    mergedBaseConfig() {
      return {
        ...this.baseConfig,
        mlColor3d: this.config.mlColor3d || false
      };
    },

    /**
     * 最终配置（包含尺寸）
     */
    finalConfig() {
      return {
        width: this.config.width || this.baseConfig.width,
        height: this.config.height || this.baseConfig.height
      };
    },

    /**
     * 图表选项（重命名自 options）
     */
    chartOptions() {
      const options = {
        ...this.chartAxisOptions,
        ...this.baseOptions,
        // 深拷贝 title 对象，避免多个组件实例共享
        title: {
          ...this.baseOptions.title
        },
        // 深拷贝 grid 对象
        grid: {
          ...this.baseOptions.grid
        },
        // 深拷贝 dataZoom 数组
        dataZoom: this.baseOptions.dataZoom ? this.baseOptions.dataZoom.map((item) => ({ ...item })) : []
      };

      // 配置标题
      this.setupTitle(options);

      // 配置滚动
      this.setupScroll(options);

      return options;
    },

    /**
     * 坐标轴选项（每次调用返回新对象，避免共享引用）
     */
    chartAxisOptions() {
      // 每次都返回全新的对象，避免组件实例间共享
      return {
        xAxis: {
          type: 'category',
          axisLabel: {
            formatter: (value) => {
              return value.length > 10 ? value.slice(0, 10) + '\n' + value.slice(10) : value;
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#868686',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        grid: {
          bottom: '40px',
          right: '26px',
          left: '52px',
          top: '70px'
        },
        yAxis: {
          type: 'value',
          name: 'Y轴单位',
          nameTextStyle: {
            color: '#868686',
            padding: [0, 0, 0, -50]
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e8e8e8',
              width: 1,
              type: 'dashed'
            }
          }
        },
        dataZoom: [
          {
            show: false,
            type: 'slider',
            backgroundColor: '#F2F4F7',
            fillerColor: '#E0E0E0',
            borderColor: 'transparent',
            borderCap: 'round',
            showDetail: false,
            startValue: 0,
            endValue: 6,
            height: 8,
            left: 'center',
            filterMode: 'filter',
            showDataShadow: false,
            handleStyle: {
              color: 'rgba(27,90,169,1)',
              borderWidth: 0,
              opacity: 0
            },
            zoomLock: true,
            handleSize: 0,
            bottom: '10px'
          },
          {
            type: 'inside',
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true
          }
        ]
      };
    },

    /**
     * 根据 type 动态选择组件
     */
    currentComponent() {
      const componentMap = {
        base: 'BaseBar',
        taper: 'TaperBar',
        stack: 'StackBar',
        bidirectional: 'BidirectionalBar',
        'bar-line': 'BarLine',
        '3d': 'ThreeDBar'
      };
      return componentMap[this.type] || 'BaseBar';
    }
  },

  created() {
    // 初始化配置管理器
    this.configManager = new ConfigManager(this.config, this.preset);

    // 验证配置
    const validation = this.configManager.validate();
    if (!validation.valid) {
      console.error('[BaseBarChart] Configuration validation failed:', validation.errors);
      this.hasError = true;
      this.errorMessage = validation.errors.join('; ');
    }
  },

  methods: {
    /**
     * 配置标题
     */
    setupTitle(options) {
      if (this.config.showTitle) {
        options.title.text = this.config.title;
        options.title.show = true;
      } else {
        options.grid.top = '40px';
        options.title.show = false;
        options.title.text = '';
      }
    },

    /**
     * 配置滚动
     */
    setupScroll(options) {
      if (this.config.scroll) {
        options.dataZoom[0].show = true;
        options.grid.height = '68%';
        options.dataZoom[0].endValue = this.config.scrollPageNum || this.baseConfig.scrollPageNum;
      } else {
        options.dataZoom[0].show = false;
      }
    },

    /**
     * 创建柱状图渐变色（重命名自 setLineGradientColor）
     */
    createBarGradientColor(index, param, maxNum) {
      if (!echarts) {
        console.error('[BarChart] ECharts is not available');
        return '#409EFF';
      }

      const color = (this.config.colors && this.config.colors[index]) || this.baseConfig.colors[index] || this.baseConfig.defaultColor;

      const opacityConfig = this.baseConfig.colorOpacityConfig;

      let colorStops = [
        {
          offset: 0,
          color: colorToRgba(color, opacityConfig.end || 1)
        },
        {
          offset: 1,
          color: colorToRgba(color, opacityConfig.start || 0.5)
        }
      ];

      // 如果显示数据边框
      const showDataBorder = this.config.showDataBorder || this.baseConfig.showDataBorder;
      if (showDataBorder) {
        const borderColor = this.config.dataBorderColor || this.baseConfig.dataBorderColor;
        colorStops = [
          {
            offset: 0,
            color: colorToRgba(borderColor, 1)
          },
          {
            offset: 0.01,
            color: colorToRgba(borderColor, 1)
          },
          {
            offset: 0.01,
            color: colorToRgba(color, opacityConfig.end || 1)
          },
          {
            offset: 1,
            color: colorToRgba(color, opacityConfig.start || 0.5)
          }
        ];
      }

      return new echarts.graphic.LinearGradient(0, 0, 0, 1, colorStops);
    },

    /**
     * 更新配置（对外暴露的方法）
     */
    updateConfig() {
      // 重新验证配置
      this.configManager = new ConfigManager(this.config, this.preset);
      const validation = this.configManager.validate();

      if (validation.valid && this.$refs.chartComponent) {
        this.$refs.chartComponent.updateChartData();
      } else {
        console.error('[BaseBarChart] Update failed:', validation.errors);
      }
    },

    /**
     * 获取图表实例（对外暴露的方法）
     */
    getChartInstance() {
      return this.$refs.chartComponent && this.$refs.chartComponent.chart;
    }
  }
};
</script>
