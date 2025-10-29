/**
 * ECharts 图表公共混入
 * 提供图表初始化、响应式更新、resize监听、销毁等公共逻辑
 */
export default {
  inject: {
    // 从父组件注入渐变色生成方法
    setLineGradientColor: {
      default: null
    }
  },
  data() {
    return {
      chart: null,
      options: {},
      resizeObserver: null,
      _initialized: false, // 初始化标记，避免首次渲染重复执行
      _intersectionObserver: null, // 懒加载观察器
      _isVisible: false, // 是否在视口内
      _hasInitChart: false // 是否已初始化图表
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
      default: true // 默认开启懒加载
    }
  },
  watch: {
    // 监听 config 变化，自动更新图表
    config: {
      handler() {
        // 跳过首次渲染（mounted已经执行过初始化）
        if (!this._initialized) {
          return;
        }

        // 后续真实更新时才触发
        if (this.chart && this.fullMoreData) {
          this.$nextTick(() => {
            this.fullMoreData();
          });
        }
      },
      deep: true
    }
  },
  created() {
    // 合并配置
    this.options = { ...this.baseOptions };
    if (this.config.options) {
      this.options = { ...this.options, ...this.config.options };
    }
  },
  mounted() {
    if (this.lazyLoad) {
      // 启用懒加载，使用IntersectionObserver
      this.$nextTick(() => {
        this.initLazyLoad();
      });
    } else {
      // 不使用懒加载，直接初始化（保留原有逻辑）
      this.$nextTick(() => {
        // 添加短暂延迟，确保容器尺寸稳定（特别是aspect-ratio计算）
        setTimeout(() => {
          this.initChart();
          // 标记初始化完成，后续watch可以正常工作
          this._initialized = true;
        }, 50);
      });
    }
  },
  beforeDestroy() {
    // 清理IntersectionObserver
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }

    // 原有的销毁逻辑
    this.destroyChart();
  },
  methods: {
    /**
         * 初始化懒加载
         */
    initLazyLoad() {
      if (!this.$refs.chart) {
        console.error('Chart container ref not found for lazy load');
        return;
      }

      // 创建IntersectionObserver，监听图表容器是否进入视口
      this._intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this._hasInitChart) {
              // 图表进入视口且未初始化
              this._isVisible = true;
              this._hasInitChart = true;

              // 延迟初始化，确保容器稳定
              this.$nextTick(() => {
                setTimeout(() => {
                  this.initChart();
                  this._initialized = true;

                  // 初始化完成后停止观察
                  if (this._intersectionObserver) {
                    this._intersectionObserver.disconnect();
                  }
                }, 50);
              });
            }
          });
        },
        {
          root: null, // 相对于视口
          rootMargin: '100px', // 提前100px开始加载
          threshold: 0.1 // 10%可见即触发
        }
      );

      // 开始观察图表容器
      this._intersectionObserver.observe(this.$refs.chart);
    },

    /**
         * 初始化图表
         */
    initChart() {
      if (!this.$refs.chart) {
        console.error('Chart container ref not found');
        return;
      }

      // 初始化 ECharts 实例，使用更稳定的配置
      this.chart = this.$echarts.init(this.$refs.chart, null, {
        renderer: 'canvas',
        locale: 'ZH'
      });

      // 加载数据
      if (this.fullMoreData) {
        this.fullMoreData();
      }

      // 延迟启动resize监听，避免初始化阶段的抖动
      setTimeout(() => {
        this.observeResize();
      }, 300);
    },

    /**
         * 监听容器尺寸变化
         */
    observeResize() {
      if (typeof ResizeObserver === 'undefined') {
        // 降级方案：使用 window resize 事件
        this.handleResize = this.debounce(() => {
          this.chart && this.chart.resize();
        }, 200);
        window.addEventListener('resize', this.handleResize);
      } else {
        // 使用 ResizeObserver 监听容器变化
        this.resizeObserver = new ResizeObserver(this.debounce(() => {
          this.chart && this.chart.resize();
        }, 200));
        this.resizeObserver.observe(this.$refs.chart);
      }
    },

    /**
         * 销毁图表
         */
    destroyChart() {
      // 销毁 ECharts 实例
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      // 清理 resize 监听
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      if (this.handleResize) {
        window.removeEventListener('resize', this.handleResize);
        this.handleResize = null;
      }
    },

    /**
         * 防抖函数
         */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }
};

