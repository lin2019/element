/**
 * 图表渲染引擎
 * 负责图表的渲染、更新和销毁
 */

/* eslint-env es6 */

export class ChartRenderer {
  constructor(echarts, container, options = {}) {
    this.echarts = echarts;
    this.container = container;
    this.chart = null;
    this.options = options;
    this.eventHandlers = new Map();
  }

  /**
   * 初始化图表
   */
  init() {
    if (!this.container) {
      console.error('[ChartRenderer] Container element not found');
      return false;
    }

    try {
      this.chart = this.echarts.init(this.container, null, {
        renderer: 'canvas',
        locale: 'ZH',
        ...this.options
      });
      return true;
    } catch (error) {
      console.error('[ChartRenderer] Failed to initialize chart:', error);
      return false;
    }
  }

  /**
   * 渲染图表
   */
  render(options, renderOptions = {}) {
    if (!this.chart) {
      console.error('[ChartRenderer] Chart not initialized');
      return false;
    }

    try {
      const defaultRenderOptions = {
        notMerge: false,
        lazyUpdate: false,
        silent: false,
        ...renderOptions
      };

      this.chart.setOption(options, defaultRenderOptions);
      return true;
    } catch (error) {
      console.error('[ChartRenderer] Failed to render chart:', error);
      return false;
    }
  }

  /**
   * 更新图表
   */
  update(options) {
    return this.render(options, { notMerge: false });
  }

  /**
   * 完全重新渲染（不合并）
   */
  rerender(options) {
    return this.render(options, { notMerge: true });
  }

  /**
   * 调整图表大小
   */
  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  /**
   * 显示加载状态
   */
  showLoading(text = 'Loading...', options = {}) {
    if (this.chart) {
      this.chart.showLoading('default', {
        text,
        color: '#0555CE',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0,
        ...options
      });
    }
  }

  /**
   * 隐藏加载状态
   */
  hideLoading() {
    if (this.chart) {
      this.chart.hideLoading();
    }
  }

  /**
   * 清空图表
   */
  clear() {
    if (this.chart) {
      this.chart.clear();
    }
  }

  /**
   * 绑定事件
   */
  on(eventName, handler, context) {
    if (!this.chart) {
      console.warn('[ChartRenderer] Chart not initialized, event not bound');
      return;
    }

    const wrappedHandler = context ? handler.bind(context) : handler;
    this.chart.on(eventName, wrappedHandler);

    // 保存事件处理器以便后续移除
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }
    this.eventHandlers.get(eventName).push({ original: handler, wrapped: wrappedHandler });
  }

  /**
   * 移除事件
   */
  off(eventName, handler) {
    if (!this.chart) {
      return;
    }

    if (handler) {
      // 移除特定处理器
      const handlers = this.eventHandlers.get(eventName);
      if (handlers) {
        const item = handlers.find(h => h.original === handler);
        if (item) {
          this.chart.off(eventName, item.wrapped);
          const index = handlers.indexOf(item);
          handlers.splice(index, 1);
        }
      }
    } else {
      // 移除所有该事件的处理器
      this.chart.off(eventName);
      this.eventHandlers.delete(eventName);
    }
  }

  /**
   * 获取 ECharts 实例
   */
  getInstance() {
    return this.chart;
  }

  /**
   * 销毁图表
   */
  destroy() {
    if (this.chart) {
      // 清理所有事件
      this.eventHandlers.clear();

      // 销毁实例
      this.chart.dispose();
      this.chart = null;
    }
  }

  /**
   * 获取图表配置
   */
  getOption() {
    return this.chart ? this.chart.getOption() : null;
  }

  /**
   * 图表是否已初始化
   */
  isInitialized() {
    return this.chart !== null;
  }
}

