<template>
  <div class="yq-chart" ref="chart"></div>
</template>

<script>
import chartLifecycle from '../../../mixins/chartLifecycle';
import { ThreeDBarSeriesBuilder } from '../core/SeriesBuilder';
import { DEFAULT_3D_COLORS } from '../config/defaults';

export default {
  name: 'ThreeDBar',
  mixins: [chartLifecycle],

  data() {
    return {
      colors3D: DEFAULT_3D_COLORS
    };
  },

  methods: {
    /**
     * 更新图表数据
     */
    updateChartData() {
      if (!this.config.data) return;

      // 设置 X 轴数据
      this.chartOptions.xAxis.data = this.config.data.categories;

      // 设置图例
      this.chartOptions.legend.show = this.config.data.series && this.config.data.series.length > 1;

      // 使用 SeriesBuilder 构建 series
      const seriesBuilder = new ThreeDBarSeriesBuilder(this.config, this.baseConfig, this.createGradientColor, this.colors3D);

      this.chartOptions.series = seriesBuilder.build();

      // 自定义 tooltip
      this.chartOptions.tooltip = {
        trigger: 'axis',
        showDelay: 10,
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(5, 85, 206, 0.05)'
          }
        },
        formatter: (params) => {
          return params[1].name + '<br/>' + '<div class="yq-tooltip-item"><div>' + params[0].marker + params[1].seriesName + '</div><div class="yq-tooltip-value">' + params[1].value + '</div></div>';
        }
      };

      // 渲染图表
      this.renderChart(this.chartOptions);
    }
  }
};
</script>
