/**
 * 图表生命周期混入
 * 提供图表初始化、响应式更新、resize监听、销毁等公共逻辑
 * 重构自 chartMixin.js，改进命名和性能
 */

import { debounce } from '../utils/helpers';
import echarts from '../utils/echarts';

export default {
  inject: {
    // 从父组件注入渐变色生成方法
    createGradientColor: {
      from: 'setLineGradientColor',
      default: null
    }
  },

  data() {
    return {
      chart: null,
      chartOptions: {},
      resizeObserver: null,
      isInitialized: false, // 重命名自 _initialized
      intersectionObserver: null, // 重命名自 _intersectionObserver
      isVisible: false, // 重命名自 _isVisible
      hasInitializedChart: false // 重命名自 _hasInitChart
    };
  },

  props: {
    // 总组件父级参数
    config: {
      type: Object,
      default: () => ({})
    },
    // 基础参数
    baseConfig: {
      type: Object,
      default: () => ({})
    },
    // 基础图表配置
    baseOptions: {
      type: Object,
      default: () => ({})
    },
    // 是否启用懒加载
    lazyLoad: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    // 监听 config 变化，自动更新图表
    'config.data': {
      handler() {
        if (!this.isInitialized) return;
        this.handleDataChange();
      },
      deep: true
    },

    'config.dataObj': {
      handler() {
        if (!this.isInitialized) return;
        this.handleDataChange();
      },
      deep: true
    },

    'config.type': {
      handler(newType, oldType) {
        if (oldType && newType !== oldType) {
          this.handleTypeChange();
        }
      }
    }
  },

  created() {
    // 合并配置
    this.chartOptions = { ...this.baseOptions };
    if (this.config.options) {
      this.chartOptions = { ...this.chartOptions, ...this.config.options };
    }

    // 创建防抖的 resize 处理器
    this.debouncedResize = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 200);
  },

  mounted() {
    if (this.lazyLoad) {
      // 启用懒加载
      this.$nextTick(() => {
        this.initLazyLoad();
      });
    } else {
      // 直接初始化
      this.$nextTick(() => {
        setTimeout(() => {
          this.initChart();
          this.isInitialized = true;
        }, 50);
      });
    }
  },

  beforeDestroy() {
    this.cleanup();
  },

  methods: {
    /**
     * 初始化懒加载
     */
    initLazyLoad() {
      if (!this.$refs.chart) {
        console.error('[ChartLifecycle] Chart container ref not found for lazy load');
        return;
      }

      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasInitializedChart) {
              this.isVisible = true;
              this.hasInitializedChart = true;

              this.$nextTick(() => {
                setTimeout(() => {
                  this.initChart();
                  this.isInitialized = true;

                  // 初始化完成后停止观察
                  if (this.intersectionObserver) {
                    this.intersectionObserver.disconnect();
                  }
                }, 50);
              });
            }
          });
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1
        }
      );

      this.intersectionObserver.observe(this.$refs.chart);
    },

    /**
     * 初始化图表
     */
    initChart() {
      if (!this.$refs.chart) {
        console.error('[ChartLifecycle] Chart container ref not found');
        return;
      }

      if (!echarts) {
        console.error('[ChartLifecycle] ECharts is not available. Please ensure ECharts is loaded.');
        return;
      }

      try {
        this.chart = echarts.init(this.$refs.chart, null, {
          renderer: 'canvas',
          locale: 'ZH'
        });

        // 加载数据
        if (this.updateChartData) {
          this.updateChartData();
        }

        // 延迟启动 resize 监听
        setTimeout(() => {
          this.observeResize();
        }, 300);
      } catch (error) {
        console.error('[ChartLifecycle] Failed to initialize chart:', error);
        this.handleError(error);
      }
    },

    /**
     * 监听容器尺寸变化
     */
    observeResize() {
      if (typeof ResizeObserver === 'undefined') {
        // 降级方案：使用 window resize 事件
        window.addEventListener('resize', this.debouncedResize);
      } else {
        // 使用 ResizeObserver
        this.resizeObserver = new ResizeObserver(this.debouncedResize);
        this.resizeObserver.observe(this.$refs.chart);
      }
    },

    /**
     * 处理数据变化
     */
    handleDataChange() {
      if (this.chart && this.updateChartData) {
        this.$nextTick(() => {
          this.updateChartData();
        });
      }
    },

    /**
     * 处理类型变化
     */
    handleTypeChange() {
      // 类型变化时重新初始化图表
      this.destroyChart();
      this.$nextTick(() => {
        this.initChart();
      });
    },

    /**
     * 处理错误
     */
    handleError(error) {
      this.$emit('chart-error', error);
      console.error('[ChartLifecycle] Chart error:', error);
    },

    /**
     * 销毁图表
     */
    destroyChart() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      if (this.debouncedResize) {
        window.removeEventListener('resize', this.debouncedResize);
      }
    },

    /**
     * 清理资源
     */
    cleanup() {
      // 清理 IntersectionObserver
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
      }

      // 销毁图表
      this.destroyChart();

      // 取消防抖
      if (this.debouncedResize && this.debouncedResize.cancel) {
        this.debouncedResize.cancel();
      }
    },

    /**
     * 渲染图表（重命名自 setOption）
     */
    renderChart(options, renderOptions = {}) {
      if (!this.chart) {
        console.warn('[ChartLifecycle] Chart not initialized');
        return;
      }

      const defaultOptions = {
        notMerge: false,
        lazyUpdate: false,
        silent: false,
        ...renderOptions
      };

      this.chart.setOption(options, defaultOptions);
    }
  }
};

