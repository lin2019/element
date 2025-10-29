<template>
  <div class="yq-chart" ref="chart"></div>
</template>

<script>
import chartLifecycle from '../../../mixins/chartLifecycle';
import { TaperBarSeriesBuilder } from '../core/SeriesBuilder';

export default {
  name: 'TaperBar',
  mixins: [chartLifecycle],

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
      const seriesBuilder = new TaperBarSeriesBuilder(this.config, this.baseConfig, this.createGradientColor);

      this.chartOptions.series = seriesBuilder.build();

      // 渲染图表
      this.renderChart(this.chartOptions);
    }
  }
};
</script>
