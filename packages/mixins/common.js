// import { computed } from 'vue';
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
      bs_config: {
        width: '100%',
        height: '100%',
        defaultColor: 'rgba(5, 85, 206, 1)',
        colors: ['rgba(5, 85, 206, 1)', 'rgba(34, 184, 207, 1)', 'rgba(92, 124, 250, 1)', 'rgba(81, 207, 102, 1)', 'rgba(252, 196, 25, 1)', 'rgba(255, 107, 107, 1)',
          'rgba(204, 93, 232, 1)', 'rgba(51, 154, 240, 1)', 'rgba(32, 201, 151, 1)', 'rgba(148, 216, 45, 1)', 'rgba(255, 146, 43, 1)', 'rgba(240, 101, 149, 1)'
        ], // 颜色配置
        colorOpacityConfig: {
          start: 0.5,
          end: 1
        }, // 颜色透明度配置
        showTitle: false, // 是否展示图表标题
        title: '',
        showValue: false, // 是否展示数值
        dataCount: 1,
        barWidth: 16, // 柱状图(只有柱状图会读取这个参数)宽度
        dataObj: {},
        legendNames: [], // 图例名称(多数据类型需要传递图例名称)
        scroll: false, // 是否滚动
        scrollPageNum: 6, // 滚动轴数量
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        showDataBorder: false, // 是否显示数据后边框
        DataBorderColor: '#ffffff'
      },
      bs_options: {
        title: {
          show: false,
          text: '',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333333'
          }
        },
        tooltip: {
          trigger: 'axis',
          showDelay: 10,
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(5, 85, 206, 0.05)'
            }
          },
          formatter: (params) => {
            var dom = '<div class="yq-tooltip-item-title">' + params[0].name + '</div>';
            params.forEach((item, index) => {
              dom += '<div class="yq-tooltip-item">' + '<div class="yq-tooltip-labels">' +
                `<span class="yq-tooltip-marker" style="background:linear-gradient(180deg, ${colorToRgba(this.baseConfig.colors[index], 1)} 0%, ${colorToRgba(this.baseConfig.colors[index], 0.5)} 100%);"></span>` +
                item.seriesName + '</div><div class="yq-tooltip-value">' + item.value +
                '</div></div>';
            });
            return dom;
          }
        },
        legend: {
          show: false,
          right: 0
        },
        // 优化动画配置，懒加载时使用较短动画
        animation: true,
        animationDuration: (idx) => {
          return idx * 100;
        },
        animationEasing: 'cubicOut',
        animationDelay: 0,
        animationDurationUpdate: (idx) => {
          return idx * 150;
        } // 更新时使用稍长动画
      }
    };
  },
  computed: {
    type() {
      return this.config.type || 'base';
    },
    options() {
      return {
        ...this.chart_options,
        ...this.bs_options
      };
    }
  }
};
