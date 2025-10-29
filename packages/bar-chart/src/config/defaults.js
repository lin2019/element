/**
 * 图表默认配置
 */

export const DEFAULT_COLORS = [
  'rgba(5, 85, 206, 1)',
  'rgba(34, 184, 207, 1)',
  'rgba(92, 124, 250, 1)',
  'rgba(81, 207, 102, 1)',
  'rgba(252, 196, 25, 1)',
  'rgba(255, 107, 107, 1)',
  'rgba(204, 93, 232, 1)',
  'rgba(51, 154, 240, 1)',
  'rgba(32, 201, 151, 1)',
  'rgba(148, 216, 45, 1)',
  'rgba(255, 146, 43, 1)',
  'rgba(240, 101, 149, 1)'
];

export const DEFAULT_3D_COLORS = [
  ['rgba(5, 85, 206, 1)', 'rgba(129, 169, 230, 1)', 'rgba(181, 205, 241, 1)'],
  ['rgba(92, 124, 250, 1)', 'rgba(167, 184, 248, 1)', 'rgba(207, 216, 254, 1)'],
  ['rgba(34, 184, 207, 1)', 'rgba(144, 219, 231, 1)', 'rgba(189, 234, 241, 1)'],
  ['rgba(81, 207, 102, 1)', 'rgba(167, 231, 178, 1)', 'rgba(203, 241, 210, 1)'],
  ['rgba(252, 196, 25, 1)', 'rgba(253, 225, 139, 1)', 'rgba(255, 238, 187, 1)'],
  ['rgba(255, 107, 107, 1)', 'rgba(255, 181, 181, 1)', 'rgba(255, 233, 233, 1)'],
  ['rgba(204, 93, 232, 1)', 'rgba(224, 158, 241, 1)', 'rgba(240, 207, 249, 1)'],
  ['rgba(51, 154, 240, 1)', 'rgba(147, 199, 243, 1)', 'rgba(194, 225, 251, 1)'],
  ['rgba(32, 201, 151, 1)', 'rgba(137, 222, 199, 1)', 'rgba(189, 239, 224, 1)'],
  ['rgba(148, 216, 45, 1)', 'rgba(195, 230, 145, 1)', 'rgba(223, 244, 192, 1)'],
  ['rgba(255, 146, 43, 1)', 'rgba(249, 195, 145, 1)', 'rgba(255, 223, 192, 1)'],
  ['rgba(240, 101, 149, 1)', 'rgba(248, 178, 202, 1)', 'rgba(251, 209, 224, 1)']
];

/**
 * 基础配置
 */
export const BASE_CONFIG = {
  // 尺寸
  width: '100%',
  height: '100%',

  // 颜色
  defaultColor: 'rgba(5, 85, 206, 1)',
  colors: DEFAULT_COLORS,
  colorOpacityConfig: {
    start: 0.5,
    end: 1
  },

  // 标题
  showTitle: false,
  title: '',

  // 数值显示
  showValue: false,

  // 数据
  dataCount: 1,

  // 柱状图
  barWidth: 16,

  // 图例
  legendNames: [],

  // 滚动
  scroll: false,
  scrollPageNum: 6,

  // 形状（锥形柱状图专用）
  symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

  // 边框
  showDataBorder: false,
  dataBorderColor: '#ffffff',

  // 立体柱状图（多色模式）
  mlColor3d: false
};

/**
 * 基础 ECharts 选项
 */
export const BASE_OPTIONS = {
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
    }
  },

  legend: {
    show: false,
    right: 0
  },

  grid: {
    bottom: '40px',
    right: '26px',
    left: '52px',
    top: '70px'
  },

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
  ],

  // 动画配置
  animation: true,
  animationDuration: (idx) => idx * 100,
  animationEasing: 'cubicOut',
  animationDelay: 0,
  animationDurationUpdate: (idx) => idx * 150
};

