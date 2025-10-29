/**
 * 图表配置混入
 * 提供基础配置和选项管理
 * 重构自 common.js，改进命名和结构
 */

import { BASE_CONFIG, BASE_OPTIONS } from '../bar-chart/src/config/defaults';
import { colorToRgba } from '../utils/chart_utils';

export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      // 基础配置（重命名自 bs_config）
      baseConfig: {
        ...BASE_CONFIG
      },

      // 基础选项（重命名自 bs_options）
      baseOptions: {
        ...BASE_OPTIONS,
        // 自定义 tooltip formatter
        tooltip: {
          ...BASE_OPTIONS.tooltip,
          formatter: (params) => {
            return this.formatTooltip(params);
          }
        }
      }
    };
  },

  computed: {
    /**
     * 图表类型
     */
    type() {
      return this.config.type || 'base';
    },

    /**
     * 合并后的图表选项
     */
    chartOptions() {
      return {
        ...this.chartAxisOptions,
        ...this.baseOptions
      };
    },

    /**
     * 坐标轴选项（子类可以覆盖）
     */
    chartAxisOptions() {
      return {};
    }
  },

  methods: {
    /**
     * 格式化 Tooltip
     */
    formatTooltip(params) {
      let dom = `<div class='yq-tooltip-item-title'>${params[0].name}</div>`;

      params.forEach((item, index) => {
        const color = this.baseConfig.colors[index] || this.baseConfig.defaultColor;
        const gradient = `linear-gradient(180deg, ${colorToRgba(color, 1)} 0%, ${colorToRgba(color, 0.5)} 100%)`;

        dom += '<div class=\'yq-tooltip-item\'>' +
          '<div class=\'yq-tooltip-labels\'>' +
          `<span class='yq-tooltip-marker' style='background:${gradient};'></span>` +
          `${item.seriesName}` +
          '</div>' +
          `<div class='yq-tooltip-value'>${item.value}</div>` +
          '</div>';
      });

      return dom;
    }
  }
};

