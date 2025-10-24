/**
 * 弹窗操作工具
 * 提供弹窗的打开、关闭、跳转等操作方法
 */

/**
 * 弹窗管理类
 */
class PopupManager {
  constructor() {
    // 弹窗索引列表，用于记录打开的弹窗
    this.indexList = {};
  }

  /**
   * 获取顶层窗口对象
   * @returns {Window} 顶层窗口对象
   * @private
   */
  _getTopWindow() {
    try {
      return window.top || window;
    } catch (e) {
      return window;
    }
  }

  /**
   * 检查函数是否存在且可调用
   * @param {*} fn - 待检查的函数
   * @returns {boolean}
   * @private
   */
  _isFunction(fn) {
    return typeof fn === 'function';
  }

  /**
   * 打开新标签页
   * 支持两种调用方式：
   * 1. 对象参数：openTab({ id, url, title, data, callback })
   * 2. 分离参数：openTab(url, title, data)
   *
   * @param {object|string} option - 弹窗配置对象 或 页面URL
   * @param {string} option.id - 可选，标签页唯一标识
   * @param {string} option.url - 必需，页面URL
   * @param {string} option.title - 可选，标签页标题
   * @param {object} option.data - 可选，传递的参数对象
   * @param {function} option.callback - 可选，打开后的回调函数
   * @param {string} title - （分离参数模式）标签页标题
   * @param {object} data - （分离参数模式）传递的参数对象
   */
  openTab(option, title, data) {
    try {
      let params;

      // 判断调用方式
      if (typeof option === 'string') {
        // 方法二：分离参数模式 openTab(url, title, data)
        params = {
          url: option,
          title: title,
          data: data
        };
      } else if (typeof option === 'object' && option !== null) {
        // 方法一：对象参数模式 openTab({ id, url, title, data, callback })
        params = option;
      } else {
        console.error('openTab 参数格式错误');
        return;
      }

      const topWindow = this._getTopWindow();
      if (topWindow._createPage && this._isFunction(topWindow._createPage)) {
        topWindow._createPage(params);
      } else {
        console.warn('top._createPage 方法不存在');
      }
    } catch (e) {
      console.error('打开标签页失败:', e);
    }
  }

  /**
   * 跳转到指定标签页
   * @param {object} option - 弹窗配置
   * @param {string} option.id - 弹窗唯一标识
   */
  jumpTab(option) {
    try {
      const topWindow = this._getTopWindow();

      // 优先使用顶层窗口的跳转方法
      if (topWindow._jumpPage && this._isFunction(topWindow._jumpPage)) {
        topWindow._jumpPage(option);
        return;
      }
    } catch (err) {
      console.error('跳转标签页失败:', err);
    }
  }

  /**
   * 关闭标签页
   * 支持两种调用方式：
   * 1. 关闭指定标签页：closeTab({id: 'uniqueId'}) 或 closeTab('uniqueId')
   * 2. 关闭当前标签页：closeTab()
   *
   * @param {object|string} option - 可选，弹窗配置或弹窗 ID，不传则关闭当前标签页
   * @param {string} option.id - 标签页唯一标识
   */
  closeTab(option) {
    try {
      const topWindow = this._getTopWindow();
      if (topWindow._removePage && this._isFunction(topWindow._removePage)) {
        // 如果没有传参数，传 undefined 给 _removePage，让其关闭当前标签页
        topWindow._removePage(option);
      } else {
        console.warn('top._removePage 方法不存在');
      }
    } catch (e) {
      console.error('关闭标签页失败:', e);
    }
  }
}

export default new PopupManager();

