<template>
  <div class="el-bar-chart" :style="{ width: width, height: height }">
    <div ref="chartContainer" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ElBarChart',

  props: {
    data: {
      type: Array,
      default: () => []
    },
    xField: {
      type: String,
      required: true
    },
    yField: {
      type: String,
      default: ''
    },
    series: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    color: {
      type: [Array, String],
      default: () => ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
    },
    stack: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    legendPosition: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      chart: null
    };
  },

  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  },

  watch: {
    data: {
      handler() {
        this.updateChart();
      },
      deep: true
    },
    series: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chartContainer);
      this.updateChart();
      // 绑定事件
      this.chart.on('click', (params) => {
        this.$emit('click', params, this.data[params.dataIndex]);
      });

      this.chart.on('mouseover', (params) => {
        this.$emit('hover', params, this.data[params.dataIndex]);
      });

      this.chart.on('legendselectchanged', (params) => {
        this.$emit('legend-click', params, params.name);
      });
    },

    updateChart() {
      if (!this.chart) return;

      const option = this.getChartOption();
      this.chart.setOption(option, true);
    },

    getChartOption() {
      const colors = Array.isArray(this.color) ? this.color : [this.color];

      // 构建图表配置
      const option = {
        color: colors,
        title: this.title
          ? {
            text: this.title,
            subtext: this.subtitle,
            left: 'center'
          }
          : undefined,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend:
          this.showLegend && this.series.length > 0
            ? {
              data: this.series.map((s) => s.name),
              [this.legendPosition]: this.legendPosition === 'top' || this.legendPosition === 'bottom' ? 10 : 20
            }
            : undefined,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.data.map((item) => item[this.xField]),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: this.getSeriesData()
      };

      return option;
    },

    getSeriesData() {
      if (this.series.length > 0) {
        // 多系列数据
        return this.series.map((seriesItem, index) => ({
          name: seriesItem.name,
          type: 'bar',
          stack: this.stack ? 'total' : undefined,
          data: this.data.map((item) => item[seriesItem.field]),
          itemStyle: {
            color: seriesItem.color || (Array.isArray(this.color) ? this.color[index % this.color.length] : this.color),
            borderRadius: this.borderRadius
          }
        }));
      } else {
        // 单系列数据
        return [
          {
            type: 'bar',
            data: this.data.map((item) => (this.yField ? item[this.yField] : Object.values(item).find((val) => typeof val === 'number'))),
            itemStyle: {
              color: (params) => {
                const colors = Array.isArray(this.color) ? this.color : [this.color];
                return colors[params.dataIndex % colors.length];
              },
              borderRadius: this.borderRadius
            }
          }
        ];
      }
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    // 公共方法
    resize() {
      this.handleResize();
    },

    clear() {
      if (this.chart) {
        this.chart.clear();
      }
    },

    getDataURL(type = 'png', pixelRatio = 1, backgroundColor = '#fff') {
      if (this.chart) {
        return this.chart.getDataURL({
          type,
          pixelRatio,
          backgroundColor
        });
      }
      return '';
    }
  }
};
</script>
